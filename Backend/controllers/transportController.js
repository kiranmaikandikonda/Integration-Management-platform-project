import { getTransportOptions } from "../services/transportService.js";

export const getTransport = (req, res) => {
    res.json({
        success: true,
        message: "Transport information",
        data: getTransportOptions()
    });
};