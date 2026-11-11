const destinations = [
    {
        city: "Hyderabad",
        state: "Telangana",
        places: [
            "Charminar",
            "Golconda Fort",
            "Hussain Sagar"
        ]
    },
    {
        city: "Agra",
        state: "Uttar Pradesh",
        places: [
            "Taj Mahal",
            "Agra Fort"
        ]
    },
    {
        city: "Jaipur",
        state: "Rajasthan",
        places: [
            "Hawa Mahal",
            "Amber Fort",
            "City Palace"
        ]
    },
    {
        city: "Visakhapatnam",
        state: "Andhra Pradesh",
        places: [
            "RK Beach",
            "Kailasagiri",
            "Submarine Museum"
        ]
    },
    {
        city: "Mysuru",
        state: "Karnataka",
        places: [
            "Mysore Palace",
            "Chamundi Hills"
        ]
    },
    {
        city: "Kochi",
        state: "Kerala",
        places: [
            "Fort Kochi",
            "Marine Drive"
        ]
    }
];

export const getDestinations = (state) => {
    if (!state) {
        return destinations;
    }

    return destinations.filter(
        item => item.state.toLowerCase() === state.toLowerCase()
    );
};

export const getDestinationByName = (name) => {
    return destinations.find(
        item => item.city.toLowerCase() === name.toLowerCase()
    );
};
