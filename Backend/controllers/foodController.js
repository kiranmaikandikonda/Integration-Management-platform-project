import {
    getFoodByCity,
    getAllFood
} from "../services/foodService.js";

export const getFood = (req, res) => {
    const { city } = req.params;

    const food = getFoodByCity(city);

    if (!food) {
        return res.status(404).json({
            success: false,
            message: "Food information not found for this city"
        });
    }

    res.json({
        success: true,
        data: food
    });
};

export const getAllFoodPlaces = (req, res) => {
    res.json({
        success: true,
        data: getAllFood()
    });
};