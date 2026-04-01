import mongoose from "mongoose";
import { apiError } from "../config/apiError.config.js";
import { apiResponse } from "../config/apiResponse.config.js";
import { Lead } from "../models/lead.model.js";

export const viewAllLeads = async (req, res) => {
    try {

        const { sortValue, filterTemperature, filterLeadSource } = req.query;

        let sort = { createdAt: 1 };

        if (sortValue === "dateNewest") {
            sort = { createdAt: -1 };
        } else if (sortValue === "dateOldest") {
            sort = { createdAt: 1 };
        } else if (sortValue === "companyNameAsc") {
            sort = { companyName: 1 };
        } else if (sortValue === "companyNameDesc") {
            sort = { companyName: -1 };
        }

        let filter = {};
        if (filterTemperature) filter.temperature = filterTemperature;
        if (filterLeadSource) filter.leadSource = filterLeadSource;

        const allLeads = await Lead.find(filter).sort(sort);

        return res.status(200).json(apiResponse({ status: 200, message: 'All leads are fetched', data: allLeads }))

    } catch (error) {
        console.log(`Error in fetching all leads - ${error.message}`);
        return res.status(500).json(apiError({ status: 500, message: 'Something went wrong' }))
    }
}

export const leadsStats = async (req, res) => {
    try {

        const leadStats = await Lead.aggregate([
            {
                $group: {
                    _id: "$temperature",
                    count: { $sum: 1 }
                }
            }
        ]);

        const totalLeads = await Lead.countDocuments();

        const stats = {
            totalLeads,
            hotLeads: leadStats.find(s => s._id === 'hot')?.count || 0,
            warmLeads: leadStats.find(s => s._id === 'warm')?.count || 0,
            coldLeads: leadStats.find(s => s._id === 'cold')?.count || 0,
        }

        return res.status(200).json(apiResponse({ status: 200, message: 'Fetched lead stats', data: stats }));

    } catch (error) {
        console.log(`Error in fetching lead stats - ${error.message}`);
        return res.status(500).json(apiError({ status: 500, message: 'Something went wrong' }))
    }
}

export const singleLead = async (req, res) => {
    try {

        const { leadId } = req.params;

        if (!leadId || !mongoose.Types.ObjectId.isValid(leadId))
            return res.status(400).json(apiError({ status: 400, message: 'Invalid lead id' }));

        const lead = await Lead.findById(leadId);

        if (!lead)
            return res.status(404).json(apiError({ status: 404, message: 'Lead not found' }));

        return res.status(200).json(apiResponse({ status: 200, message: 'Lead is fetched', data: lead }))

    } catch (error) {
        console.log(`Error in fetch lead - ${error.message}`);
        return res.status(500).json(apiError({ status: 500, message: 'Something went wrong' }))
    }
}

export const addLead = async (req, res) => {
    try {

        const { companyName, contactPerson, phone, email, leadSource, temperature, notes } = req.body;

        if (!companyName || !contactPerson || !email || !leadSource || !temperature)
            return res.status(400).json(apiError({ status: 400, message: 'All fields are required' }));

        // Validation
        const nameRegex = /^[a-zA-Z ]{2,100}$/;
        const phoneRegex = /^\+[1-9]\d{0,2}\d{7,12}$/;
        const emailRegex = /^[a-zA-Z0-9-_%+]+@[a-zA-Z0-9.+]+\.[a-zA-Z]{2,}$/;
        const leadSourceValuesAllowed = ['website', 'referral', 'conference', 'linkedin', 'cold outreach', 'other'];
        const temperatureValuesAllowed = ['hot', 'warm', 'cold'];
        const notesRegex = /^[a-zA-Z0-9-,.+:''""/ ]{2,}$/;

        if (!nameRegex.test(companyName))
            return res.status(400).json(apiError({ status: 400, message: 'Invalid company name' }));

        if (!nameRegex.test(contactPerson))
            return res.status(400).json(apiError({ status: 400, message: 'Invalid contact person name' }));

        if (phone && !phoneRegex.test(phone))
            return res.status(400).json(apiError({ status: 400, message: 'Invalid phone number' }));

        if (!emailRegex.test(email))
            return res.status(400).json(apiError({ status: 400, message: 'Invalid email' }));

        if (!leadSourceValuesAllowed.includes(leadSource))
            return res.status(400).json(apiError({ status: 400, message: 'Invalid leader source value' }));

        if (!temperatureValuesAllowed.includes(temperature))
            return res.status(400).json(apiError({ status: 400, message: 'Invalid temperature value' }));

        if (notes && !notesRegex.test(notes))
            return res.status(400).json(apiError({ status: 400, message: 'Invalid notes format' }));

        const newLead = new Lead({
            companyName,
            contactPerson,
            phone,
            email,
            leadSource,
            temperature,
            notes
        })

        await newLead.save();

        return res.status(201).json(apiResponse({ status: 201, message: 'New lead added', data: newLead }))

    } catch (error) {
        console.log(`Error in adding new lead - ${error.message}`);
        return res.status(500).json(apiError({ status: 500, message: 'Something went wrong' }))
    }
}

export const updateLead = async (req, res) => {
    try {

        const { leadId } = req.params;
        const { companyName, contactPerson, phone, email, leadSource, temperature, notes } = req.body;

        if (!leadId || !mongoose.Types.ObjectId.isValid(leadId))
            return res.status(400).json(apiError({ status: 400, message: 'Invalid lead id' }));

        const lead = await Lead.findById(leadId);

        if (!lead)
            return res.status(404).json(apiError({ status: 404, message: 'Lead not found' }));

        let updatedDate = {};

        const nameRegex = /^[a-zA-Z ]{2,100}$/;
        const phoneRegex = /^\+[1-9]\d{0,2}\d{7,12}$/;
        const emailRegex = /^[a-zA-Z0-9-_%+]+@[a-zA-Z0-9.+]+\.[a-zA-Z]{2,}$/;
        const leadSourceValuesAllowed = ['website', 'referral', 'conference', 'linkedin', 'cold outreach', 'other'];
        const temperatureValuesAllowed = ['hot', 'warm', 'cold'];
        const notesRegex = /^[a-zA-Z0-9-,.+:''""/ ]{2,}$/;

        if (companyName) {
            if (!nameRegex.test(companyName))
                return res.status(400).json(apiError({ status: 400, message: 'Invalid company name' }));

            updatedDate.companyName = companyName;
        }

        if (contactPerson) {
            if (contactPerson && !nameRegex.test(contactPerson))
                return res.status(400).json(apiError({ status: 400, message: 'Invalid contact person name' }));

            updatedDate.contactPerson = contactPerson;
        }

        if (phone) {
            if (!phoneRegex.test(phone))
                return res.status(400).json(apiError({ status: 400, message: 'Invalid phone number' }));

            updatedDate.phone = phone;
        }

        if (email) {
            if (!emailRegex.test(email))
                return res.status(400).json(apiError({ status: 400, message: 'Invalid email' }));

            updatedDate.email = email;
        }

        if (leadSource) {
            if (!leadSourceValuesAllowed.includes(leadSource))
                return res.status(400).json(apiError({ status: 400, message: 'Invalid leader source value' }));

            updatedDate.leadSource = leadSource;
        }

        if (temperature) {
            if (!temperatureValuesAllowed.includes(temperature))
                return res.status(400).json(apiError({ status: 400, message: 'Invalid temperature value' }));

            updatedDate.temperature = temperature;
        }

        if (notes) {
            if (!notesRegex.test(notes))
                return res.status(400).json(apiError({ status: 400, message: 'Invalid notes format' }));

            updatedDate.notes = notes;
        }

        const updatedLead = await Lead.findByIdAndUpdate(leadId, updatedDate, { new: true })

        return res.status(200).json(apiResponse({ status: 200, message: 'Lead updated', data: updatedLead }))

    } catch (error) {
        console.log(`Error in updating the lead - ${error.message}`);
        return res.status(500).json(apiError({ status: 500, message: 'Something went wrong' }))
    }
}

export const deleteLead = async (req, res) => {
    try {

        const { leadId } = req.params;

        if (!leadId || !mongoose.Types.ObjectId.isValid(leadId))
            return res.status(400).json(apiError({ status: 400, message: 'Invalid lead id' }));

        const lead = await Lead.findById(leadId);

        if (!lead)
            return res.status(400).json(apiError({ status: 400, message: 'Invalid lead id' }));

        const deletedLead = await Lead.findByIdAndDelete(leadId);

        return res.status(200).json(apiResponse({ status: 200, message: 'Lead deleted', data: deletedLead }))

    } catch (error) {
        console.log(`Error in deleting the lead - ${error.message}`);
        return res.status(500).json(apiError({ status: 500, message: 'Something went wrong' }))
    }
}

