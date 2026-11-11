import express from "express";

import {translateMenuText, translateMenuImage} 
from "../controllers/translationController.js";

import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/text", protect, translateMenuText);

router.post(
    "/image",
    protect,
    upload.single("menuImage"),
    translateMenuImage
);

export default router;