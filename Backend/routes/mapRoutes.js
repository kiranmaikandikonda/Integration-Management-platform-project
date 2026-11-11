import express from "express";
import { getMapPlaces } from "../controllers/mapController.js";

const router = express.Router();

router.get("/search", getMapPlaces);

export default router;