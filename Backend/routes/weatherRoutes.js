import express from "express";
import { weatherController } from "../controllers/weatherController.js";

const router = express.Router();

router.get("/:city", weatherController);

export default router;