import express from "express";
import { addMat, getMats, updateMat, deleteMat } from "../controllers/mat.js";



const router = express.Router()

router.get("/", getMats)

router.post("/", addMat)

router.put("/:id", updateMat)

router.delete("/:id", deleteMat)

export default router