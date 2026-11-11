import { askAI } from "../services/aiService.js";

export const chatWithAI = async (req, res, next) => {
    try {
        const { message, language } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        const reply = await askAI(
            message,
            language || req.user?.preferredLanguage || "en"
        );

        res.json({
            success: true,
            reply
        });
    } catch (error) {
        next(error);
    }
};