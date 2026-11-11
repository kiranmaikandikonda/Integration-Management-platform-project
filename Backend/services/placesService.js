import axios from "axios";

export const searchPlaces = async (place) => {
    try {
        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: `${place}, India`,
                    format: "json",
                    limit: 10,
                    addressdetails: 1
                },
                headers: {
                    "User-Agent": "IntegrationManagementPlatform/1.0"
                }
            }
        );

        return response.data.map(item => ({
            name: item.name || item.display_name,
            address: item.display_name,
            latitude: item.lat,
            longitude: item.lon,
            category: item.type
        }));

    } catch (error) {
        throw new Error("Unable to search places");
    }
};
