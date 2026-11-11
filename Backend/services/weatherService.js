import axios from "axios";
import { getCache, setCache } from "../utils/cacheHelper.js";

export const getWeather = async (city) => {
    try {
        const cacheKey = `weather:${city.toLowerCase()}`;

        const cachedData = await getCache(cacheKey);

        if (cachedData) {
            return cachedData;
        }

        // Find city coordinates
        const locationResponse = await axios.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            {
                params: {
                    name: city,
                    count: 1,
                    language: "en",
                    format: "json"
                }
            }
        );

        const location = locationResponse.data.results?.[0];

        if (!location) {
            throw new Error("City not found");
        }

        // Get current weather
        const weatherResponse = await axios.get(
            "https://api.open-meteo.com/v1/forecast",
            {
                params: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    current: [
                        "temperature_2m",
                        "relative_humidity_2m",
                        "apparent_temperature",
                        "weather_code",
                        "wind_speed_10m"
                    ].join(",")
                }
            }
        );

        const result = {
            city: location.name,
            country: location.country,
            temperature: weatherResponse.data.current.temperature_2m,
            humidity: weatherResponse.data.current.relative_humidity_2m,
            feelsLike: weatherResponse.data.current.apparent_temperature,
            weatherCode: weatherResponse.data.current.weather_code,
            windSpeed: weatherResponse.data.current.wind_speed_10m
        };

        await setCache(cacheKey, result, 600);

        return result;

    } catch (error) {
        throw new Error(error.message || "Unable to get weather");
    }
};
