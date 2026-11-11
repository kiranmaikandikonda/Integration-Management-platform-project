import mongoose from "mongoose";

const apiProviderSchema = new mongoose.Schema(
    {
        providerName: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            enum: ["weather", "travel", "food", "transport", "maps", "ai", "translation"],
            required: true
        },

        baseUrl: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        isActive: {
            type: Boolean,
            default: true
        },

        authType: {
            type: String,
            enum: ["none", "api_key", "oauth"],
            default: "none"
        }
    },
    {
        timestamps: true
    }
);

const APIProvider = mongoose.model(
    "APIProvider",
    apiProviderSchema
);

export default APIProvider;
