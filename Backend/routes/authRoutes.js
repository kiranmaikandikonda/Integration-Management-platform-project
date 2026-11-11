import express from "express";

import {
    register,
    sendLoginOTP,
    verifyOTP,
    getProfile,
    updateLanguage
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/send-login-otp", sendLoginOTP);
router.post("/verify-otp", verifyOTP);

router.get("/profile", protect, getProfile);
router.put("/language", protect, updateLanguage);

export default router;