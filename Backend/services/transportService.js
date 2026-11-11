const transportOptions = [
    {
        type: "Train",
        provider: "IRCTC",
        description: "Indian railway ticket information and booking",
        url: "https://www.irctc.co.in/"
    },
    {
        type: "Bus",
        provider: "RedBus",
        description: "Bus search and ticket booking",
        url: "https://www.redbus.in/"
    },
    {
        type: "Flight",
        provider: "Google Flights",
        description: "Flight search and price comparison",
        url: "https://www.google.com/travel/flights"
    },
    {
        type: "Metro",
        provider: "Hyderabad Metro",
        description: "Hyderabad Metro information",
        url: "https://ltmetro.com/"
    }
];

export const getTransportOptions = () => {
    return transportOptions;
};
