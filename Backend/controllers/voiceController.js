import { processVoiceQuery } from "../services/voiceService.js";

export const voiceAssistant = async (req, res, next) => {
    try {
        const { message, text, language } = req.body;
        const voiceText = message || text;

        if (!voiceText) {
            return res.status(400).json({
                success: false,
                message: "Voice text is required"
            });
        }

        const reply = await processVoiceQuery(
            voiceText,
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