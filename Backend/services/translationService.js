import OpenAI from "openai";

const languages = {
    en: "English",
    te: "Telugu",
    kn: "Kannada",
    hi: "Hindi"
};

const translateText = async (text, targetLanguage) => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OpenAI API key is missing");
        }

        const language = languages[targetLanguage];

        if (!language) {
            throw new Error("Unsupported target language");
        }

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `Translate the given food menu into ${language}.
                    Preserve food names where appropriate.
                    Keep prices and numbers unchanged.
                    Return only the translated text.`
                },
                {
                    role: "user",
                    content: text
                }
            ]
        });

        return response.choices[0].message.content;

    } catch (error) {
        throw new Error(error.message || "Translation failed");
    }
};

export default translateText;
