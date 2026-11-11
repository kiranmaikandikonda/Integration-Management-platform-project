import {
    getDestinations,
    getDestinationByName
} from "../services/travelService.js";

export const getTravelDestinations = (req, res) => {
    const destinations = getDestinations(req.query.state);

    res.json({
        success: true,
        count: destinations.length,
        data: destinations
    });
};

export const getTravelByName = (req, res) => {
    const destination = getDestinationByName(req.params.name);

    if (!destination) {
        return res.status(404).json({
            success: false,
            message: "Destination not found"
        });
    }

    res.json({
        success: true,
        data: destination
    });
};