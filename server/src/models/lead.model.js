import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(

    {
        companyName: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true,
            lowercase: true
        },

        contactPerson: {
            type: String,
            required: [true, 'Contact person name is required'],
            trim: true,
            lowercase: true
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            default: ""
        },

        leadSource: {
            type: String,
            enum: ['website', 'referral', 'conference', 'linkedin', 'cold outreach', 'other'],
            default: 'other',
            trim: true,
            lowercase: true,
            required: [true, 'Lead Source is required'],
        },

        temperature: {
            type: String,
            enum: {
                values: ["hot", "warm", "cold"],
                message: "{VALUE} is wrong."
            },
            required: [true, 'Temperature is required'],
        },

        notes: {
            type: String,
            default: ""
        },
    },

    { timestamps: true }
)

export const Lead = mongoose.model("Lead", leadSchema);