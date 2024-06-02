import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { getReviews, postReviews, deleteReview } from "../controllers/reviews.controller.js";
const router=express.Router();


router.post("/postReview/:id",verifyToken,postReviews)
router.get("/getReviews/:movieID",getReviews)
router.delete("/deleteReview/:id",verifyToken,deleteReview)

export default router;