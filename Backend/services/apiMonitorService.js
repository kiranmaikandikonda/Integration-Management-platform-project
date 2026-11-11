import RequestLog from "../models/RequestLog.js";

export const logApiRequest = async (data) => {
    try {
        const log = await RequestLog.create({
            userId: data.userId || null,
            method: data.method,
            endpoint: data.endpoint,
            statusCode: data.statusCode,
            responseTime: data.responseTime || 0,
            ipAddress: data.ipAddress || "",
            errorMessage: data.errorMessage || ""
        });

        return log;

    } catch (error) {
        console.error("API monitoring error:", error.message);
        return null;
    }
};

export const getApiLogs = async () => {
    try {
        return await RequestLog.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 })
            .limit(100);

    } catch (error) {
        throw new Error("Unable to retrieve API logs");
    }
};
