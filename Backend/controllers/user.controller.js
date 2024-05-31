import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {

  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: 'Internal Server Error!' });
  }

  try {
    const { userName, email, password, pic } = req.body;

    if (userName) {
      const existingUser = await User.findOne({ userName });
      if (existingUser && existingUser.id !== req.params.id) {
        return res.status(400).json({ message: 'Username is already taken!' });
      }
    }

    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail && existingEmail.id !== req.params.id) {
        return res.status(400).json({ message: 'Email is already in use!' });
      }
    }

    if (password && password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long!' });
    }

    if (password) {
      req.body.password = bcryptjs.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName,
          email,
          password: req.body.password,
          pic,
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "Details updated successfully!", userData: updatedUser });
  } catch (error) {
    return res.status(400).json({message: "Internal Server Error"})
  }
};


export const deleteUser = async (req, res, next) => {

  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: 'Internal Server Error!' });
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    return res.status(200).json({ message: "Profile has been deleted!" });

  } catch (error) {
    return res.status(400).json({message: "Internal Server Error"})
  }  

}