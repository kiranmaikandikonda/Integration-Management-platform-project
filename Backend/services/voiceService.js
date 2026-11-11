import { askAI } from "./aiService.js";

export const processVoiceQuery = async (
    message,
    language = "en"
) => {
    try {
        if (!message || !message.trim()) {
            throw new Error("Voice message cannot be empty");
        }

        const answer = await askAI(message, language);

        return {
            question: message,
            answer: answer,
            language: language
        };

    } catch (error) {
        throw new Error(error.message || "Voice assistant failed");
    }
};
