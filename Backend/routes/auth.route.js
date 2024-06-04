import express from "express";
import { register,login,logout, forgotPassword, resetPassword } from "../controllers/auth.controller.js";

const router=express.Router();


router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/forgotPassword",forgotPassword);
router.post("/reset-password/:id/:token",resetPassword)

export default router;