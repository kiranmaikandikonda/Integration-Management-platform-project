
import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        sessionId: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true
        },

        message: {
            type: String,
            required: true
        },

        language: {
            type: String,
            enum: ["en", "te", "kn", "hi"],
            default: "en"
        }
    },
    {
        timestamps: true
    }
);

const ChatHistory = mongoose.model(
    "ChatHistory",
    chatHistorySchema
);

export default ChatHistory;
