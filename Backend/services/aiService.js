import OpenAI from "openai";

const languageNames = {
    en: "English",
    te: "Telugu",
    kn: "Kannada",
    hi: "Hindi"
};

export const askAI = async (message, language = "en") => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OpenAI API key is missing");
        }

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const languageName = languageNames[language] || "English";

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful India travel assistant.
                    Answer travel, food, weather and transport questions.
                    Reply in ${languageName}.`
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });

        return response.choices[0].message.content;

    } catch (error) {
        throw new Error(error.message || "AI service failed");
    }
};