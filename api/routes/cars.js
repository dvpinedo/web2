import express from "express";
import { addCar, deleteCar, getCars, updateCar } from "../controllers/car.js";

const router = express.Router()

router.get("/", getCars)

router.post("/", addCar)

router.put("/:id", updateCar)

router.delete("/:id", deleteCar)

export default router