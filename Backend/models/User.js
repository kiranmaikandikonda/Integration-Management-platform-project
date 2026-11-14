import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phoneNumber: {
            type: String,
            default: "",
            trim: true
        },

        profilePicture: {
            type: String,
            default: ""
        },

        dateOfBirth: {
            type: Date,
            default: null
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other", ""],
            default: ""
        },

        preferredLanguage: {
            type: String,
            enum: ["English", "Telugu", "Hindi", "Kannada", "Tamil", "Malayalam", "Bengali", "Marathi", "Gujarati", "Punjabi"],
            default: "English"
        },

        emailVerified: {
            type: Boolean,
            default: false
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;
