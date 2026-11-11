import OpenAI from "openai";
import translateText from "../services/translationService.js";

export const translateMenuText = async (req, res, next) => {
    try {
        const { text, targetLanguage } = req.body;

        if (!text || !targetLanguage) {
            return res.status(400).json({
                success: false,
                message: "Text and target language are required"
            });
        }

        const translation = await translateText(text, targetLanguage);

        res.json({
            success: true,
            originalText: text,
            translatedText: translation,
            targetLanguage
        });
    } catch (error) {
        next(error);
    }
};

// Translate directly from an uploaded menu image.
export const translateMenuImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a menu image"
            });
        }

        const { targetLanguage } = req.body;

        const languages = {
            en: "English",
            te: "Telugu",
            kn: "Kannada",
            hi: "Hindi"
        };

        if (!languages[targetLanguage]) {
            return res.status(400).json({
                success: false,
                message: "Unsupported target language"
            });
        }

        if (!process.env.OPENAI_API_KEY) {
            throw new Error("AI API key is not configured");
        }

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const base64Image = req.file.buffer.toString("base64");

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Read all visible text from this food menu and translate it into ${languages[targetLanguage]}. Preserve dish names, prices and menu structure. Clearly mark any unreadable text.`
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:${req.file.mimetype};base64,${base64Image}`
                            }
                        }
                    ]
                }
            ]
        });

        res.json({
            success: true,
            translatedText: response.choices[0].message.content,
            targetLanguage
        });
    } catch (error) {
        next(error);
    }
};