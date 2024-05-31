import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const logout = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      return res.status(200).json({message: 'Logout Successful!'});
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };