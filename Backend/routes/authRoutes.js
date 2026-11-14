import express from "express";

import {
    register,
    sendLoginOTP,
    verifyOTP,
    getProfile,
    updateProfile,
    updateLanguage
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/send-login-otp", sendLoginOTP);
router.post("/verify-otp", verifyOTP);

router.get("/profile", protect, getProfile);

router.put(
    "/profile",
    protect,
    upload.single("profilePicture"),
    updateProfile
);

router.put("/language", protect, updateLanguage);

export default router;
