import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import cookieParser from 'cookie-parser';

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

const app=express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoute)


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})