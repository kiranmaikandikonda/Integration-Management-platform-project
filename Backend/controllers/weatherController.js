import { getWeather } from "../services/weatherService.js";
import SearchHistory from "../models/SearchHistory.js";

export const weatherController = async (req, res, next) => {
    try {
        const { city } = req.params;

        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required"
            });
        }

        const weather = await getWeather(city);

        if (req.user) {
            await SearchHistory.create({
                userId: req.user._id,
                searchText: city,
                searchType: "weather"
            });
        }

        res.json({
            success: true,
            data: weather
        });
    } catch (error) {
        next(error);
    }
};