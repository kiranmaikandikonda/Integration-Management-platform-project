import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        searchText: {
            type: String,
            required: true,
            trim: true
        },

        searchType: {
            type: String,
            enum: [
                "weather",
                "travel",
                "food",
                "transport",
                "map",
                "ai",
                "translation"
            ],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const SearchHistory = mongoose.model(
    "SearchHistory",
    searchHistorySchema
);

export default SearchHistory;
