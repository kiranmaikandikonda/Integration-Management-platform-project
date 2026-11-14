import User from "../models/User.js";
import OTP from "../models/OTP.js";
import { generateOTP, hashOTP } from "../utils/generateOTP.js";
import sendOTPEmail from "../services/emailService.js";
import jwt from "jsonwebtoken";

// Supported languages
const validLanguages = [
    "English",
    "Telugu",
    "Hindi",
    "Kannada",
    "Tamil",
    "Malayalam",
    "Bengali",
    "Marathi",
    "Gujarati",
    "Punjabi"
];

// Generate JWT token
const createToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// Create and send OTP
const createAndSendOTP = async (email, purpose) => {
    const otp = generateOTP();

    await OTP.deleteMany({ identifier: email, purpose });

    await OTP.create({
        identifier: email,
        otpHash: hashOTP(otp),
        purpose,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    try {
        await sendOTPEmail(email, otp);
    } catch (error) {
        await OTP.deleteMany({ identifier: email, purpose });
        throw error;
    }
};

// REGISTER
export const register = async (req, res, next) => {
    try {
        const { name, email, preferredLanguage = "en" } = req.body;

        if (!name?.trim() || !email?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });
        }

        if (!validLanguages.includes(preferredLanguage)) {
            return res.status(400).json({
                success: false,
                message: "Invalid language"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser?.emailVerified) {
            return res.status(409).json({
                success: false,
                message: "Email already registered. Please login."
            });
        }

        if (existingUser) {
            existingUser.name = name.trim();
            existingUser.preferredLanguage = preferredLanguage;
            await existingUser.save();
        } else {
            await User.create({
                name: name.trim(),
                email: normalizedEmail,
                preferredLanguage
            });
        }

        await createAndSendOTP(normalizedEmail, "register");

        res.status(201).json({
            success: true,
            message: "Registration started. Check your email for OTP."
        });

    } catch (error) {
        next(error);
    }
};

// SEND LOGIN OTP
export const sendLoginOTP = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail,
            emailVerified: true
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Account not found. Please register first."
            });
        }

        await createAndSendOTP(normalizedEmail, "login");

        res.json({
            success: true,
            message: "Login OTP sent successfully."
        });

    } catch (error) {
        next(error);
    }
};

// VERIFY OTP
export const verifyOTP = async (req, res, next) => {
    try {
        const { email, otp, purpose } = req.body;

        if (!email || !otp || !purpose) {
            return res.status(400).json({
                success: false,
                message: "Email, OTP and purpose are required"
            });
        }

        if (!["register", "login"].includes(purpose)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP purpose"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const otpRecord = await OTP.findOne({
            identifier: normalizedEmail,
            purpose
        });

        if (!otpRecord || otpRecord.expiresAt <= new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired or not found. Request a new OTP."
            });
        }

        if (otpRecord.attempts >= 5) {
            await OTP.deleteOne({ _id: otpRecord._id });

            return res.status(429).json({
                success: false,
                message: "Too many incorrect attempts. Request a new OTP."
            });
        }

        if (hashOTP(otp) !== otpRecord.otpHash) {
            otpRecord.attempts += 1;
            await otpRecord.save();

            return res.status(400).json({
                success: false,
                message: "Incorrect OTP"
            });
        }

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (purpose === "register") {
            user.emailVerified = true;
            await user.save();
        }

        await OTP.deleteOne({ _id: otpRecord._id });

        const token = createToken(user);

        res.json({
            success: true,
            message: "Verification successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profilePicture: user.profilePicture,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                preferredLanguage: user.preferredLanguage,
                emailVerified: user.emailVerified,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
};

// GET PROFILE
export const getProfile = async (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
};

// UPDATE COMPLETE PROFILE
export const updateProfile = async (req, res, next) => {
    try {
        const { name, phoneNumber, dateOfBirth, gender } = req.body;

        const user = req.user;

        if (name !== undefined) {
            if (!name.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Full name is required"
                });
            }

            user.name = name.trim();
        }

        if (phoneNumber !== undefined) {
            const cleanedPhone = phoneNumber.trim();

            if (
                cleanedPhone &&
                !/^\+?[0-9\s-]{7,20}$/.test(cleanedPhone)
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter a valid phone number"
                });
            }

            user.phoneNumber = cleanedPhone;
        }

        if (gender !== undefined) {
            const validGenders = ["", "Male", "Female", "Other"];

            if (!validGenders.includes(gender)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid gender"
                });
            }

            user.gender = gender;
        }

        if (dateOfBirth !== undefined) {
            if (dateOfBirth === "") {
                user.dateOfBirth = null;
            } else {
                const parsedDate = new Date(dateOfBirth);

                if (Number.isNaN(parsedDate.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid date of birth"
                    });
                }

                if (parsedDate > new Date()) {
                    return res.status(400).json({
                        success: false,
                        message: "Date of birth cannot be in the future"
                    });
                }

                user.dateOfBirth = parsedDate;
            }
        }

        // Profile picture upload
        if (req.file) {
            user.profilePicture = `/uploads/profile/${req.file.filename}`;
        }

        await user.save();

        res.json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profilePicture: user.profilePicture,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                preferredLanguage: user.preferredLanguage,
                emailVerified: user.emailVerified,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
};

// UPDATE PREFERRED LANGUAGE
export const updateLanguage = async (req, res, next) => {
    try {
        const { preferredLanguage } = req.body;

        if (!validLanguages.includes(preferredLanguage)) {
            return res.status(400).json({
                success: false,
                message: "Unsupported language"
            });
        }

        req.user.preferredLanguage = preferredLanguage;

        await req.user.save();

        res.json({
            success: true,
            message: "Language updated successfully",
            preferredLanguage
        });

    } catch (error) {
        next(error);
    }
};
