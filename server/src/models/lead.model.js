import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
    {
        // FIX - Issue10
        companyName: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true,
        },

        contactPerson: {
            type: String,
            required: [true, 'Contact person name is required'],
            trim: true,
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
);

// FIX - Issue25
leadSchema.index({ temperature: 1 });
leadSchema.index({ leadSource: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ companyName: 1, contactPerson: 1 });

export const Lead = mongoose.model("Lead", leadSchema);