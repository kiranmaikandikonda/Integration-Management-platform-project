import express from "express";

import {getFood, getAllFoodPlaces} 
from "../controllers/foodController.js";

const router = express.Router();

router.get("/", getAllFoodPlaces);
router.get("/:city", getFood);

export default router;
