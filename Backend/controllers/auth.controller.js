import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
    try {
        const { userName, email, password,  } = req.body;

        const findUserByUsername = await User.findOne({userName});
        if (findUserByUsername) {
            return res.status(400).json({ message: 'Username is already taken!' });
        }


        const findUserByEmail = await User.findOne({email});
        if (findUserByEmail) {
            return res.status(400).json({ message: 'Email is already in use!' });
        }

        else if(password.length<6){
            return res.status(400).json({ message: 'Password must be atleast 6 characters long!' });
        }

        const expiry= 7 * 24 * 60 * 60 * 1000;

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({ userName, email, password: hashedPassword });
        await newUser.save();
        const token=jwt.sign({id: newUser._id,userName: newUser.userName},process.env.JWT_SECRET);

        res.cookie("access_token", token, { httpOnly: true, maxAge: expiry }).status(201).json({ message: 'Registeration Successful!', "userData": newUser});
        

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}



export const login=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const userExist=await User.findOne({email});
        if(!userExist){
            return res.status(400).json({ message: "User Not Found!" });
        }

        const expiry= 7 * 24 * 60 * 60 * 1000;

        const checkPassword=bcryptjs.compareSync(password, userExist.password);

        if(!checkPassword){
            return res.status(400).json({ message: "Invalid Password!" });
        }

        const token=jwt.sign({id: userExist._id,UserName: userExist.userName},process.env.JWT_SECRET);
        res.cookie("access_token",token,{httpOnly: true,  maxAge: expiry }).status(200).json({message: "Login Successful!","userData": userExist});

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export const logout = async (req, res) => {
    try {
      res.clearCookie('access_token');
      return res.status(200).json({message: 'Logout Successful!'});
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };


export const forgotPassword=async(req,res)=>{
    try {
        const {email}=req.body;
        const userExist=await User.findOne({email});
        if(!userExist){
            return res.status(400).json({ message: "User Not Found!" });
        }

        const token=jwt.sign({id: userExist._id},process.env.JWT_SECRET,{expiresIn: "1h"});


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
            });
            
            var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset your password',
            text: `Hello ${userExist.userName},

            Please click the link below to reset your password:

            https://filmgalaxy.onrender.com/reset-password/${userExist._id}/${token}

            Thank you`

            };
            
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
            return res.status(200).json({name:userExist.userName,message: "Success"});

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
} 


export const resetPassword=async(req,res)=>{
    const {id,token}=req.params;
    const {password}=req.body;

    try {

        if(password.length<6){
            return res.status(400).json({ message: 'Password must be atleast 6 characters long!' });
        }

        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            
            if(err){
                return res.status(400).json({message: "Invalid Token"});
            }
            
            bcryptjs.hash(password, 10).
            then(hash=>{
                User.findByIdAndUpdate({_id:id},{password: hash}).
                then(send=>res.status(200).json({message: "Password Updated Successfully!"}))
            })
    
            
        })
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }

}