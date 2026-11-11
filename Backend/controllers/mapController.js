import { searchPlaces } from "../services/placesService.js";

export const getMapPlaces = async (req, res, next) => {
    try {
        const { place } = req.query;

        if (!place) {
            return res.status(400).json({
                success: false,
                message: "Please provide a place name"
            });
        }

        const places = await searchPlaces(place);

        res.json({
            success: true,
            data: places
        });
    } catch (error) {
        next(error);
    }
};