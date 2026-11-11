import mongoose from "mongoose";

const requestLogSchema = new mongoose.Schema({
    provider: String,
    endpoint: String,
    method: String,
    statusCode: Number,
    responseTime: Number,
    success: Boolean,
    errorMessage: String,
    requestedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("RequestLog", requestLogSchema);