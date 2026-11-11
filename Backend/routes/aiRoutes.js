import express from "express";
import { chatWithAI } from "../controllers/aiController.js";
import { voiceAssistant } from "../controllers/voiceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/chat", protect, chatWithAI);
router.post("/voice", protect, voiceAssistant);

export default router;