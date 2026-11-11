const foodData = [
    {
        city: "Hyderabad",
        foods: [
            "Hyderabadi Biryani",
            "Haleem",
            "Double Ka Meetha"
        ],
        restaurants: [
            "Sample Biryani Restaurant",
            "Sample Cafe"
        ]
    },
    {
        city: "Vijayawada",
        foods: [
            "Punugulu",
            "Andhra Meals",
            "Gongura Pachadi"
        ],
        restaurants: [
            "Sample Andhra Restaurant"
        ]
    },
    {
        city: "Bengaluru",
        foods: [
            "Bisi Bele Bath",
            "Mysore Pak",
            "Ragi Mudde"
        ],
        restaurants: [
            "Sample South Indian Restaurant"
        ]
    },
    {
        city: "Chennai",
        foods: [
            "Idli",
            "Dosa",
            "Pongal"
        ],
        restaurants: [
            "Sample Tiffin Restaurant"
        ]
    }
];

export const getFoodByCity = (city) => {
    return foodData.find(
        item => item.city.toLowerCase() === city.toLowerCase()
    );
};

export const getAllFood = () => {
    return foodData;
};
