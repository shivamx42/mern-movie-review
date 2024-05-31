import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { getReviews, postReviews } from "../controllers/reviews.controller.js";
const router=express.Router();


router.post("/postReview/:id",verifyToken,postReviews)
router.get("/getReviews/:movieID",getReviews)

export default router;