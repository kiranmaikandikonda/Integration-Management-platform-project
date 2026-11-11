import express from "express";
import { getTransport } from "../controllers/transportController.js";

const router = express.Router();

router.get("/", getTransport);

export default router;