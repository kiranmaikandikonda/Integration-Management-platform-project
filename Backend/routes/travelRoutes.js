import express from "express";

import {getTravelDestinations, getTravelByName} 
from "../controllers/travelController.js";

const router = express.Router();

router.get("/", getTravelDestinations);
router.get("/:name", getTravelByName);

export default router;