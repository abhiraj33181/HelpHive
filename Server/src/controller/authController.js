import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// Register New User
export const registerUser = async (req, res) => {
  try {
    const { fullName, mobile, email, password } = req.body;
    const isUser = await userModel.findOne({ email });
    if (isUser) {
      return res
        .status(400)
        .json({ status: false, message: "User Already Exists!" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      fullName,
      mobile,
      email,
      password: hashPassword,
    });
    const savedUser = await user.save();

    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Profile Created Successfully!!",
        user: savedUser,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Login User

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials!!" });
    }
    const isPasswordValid = await user.isPasswordMatch(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.token("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      res
        .status(200)
        .json({ success: true, message: "Logged In Successfully", user });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials!!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const userLogOut = async () => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({ success: true, message: "Logged Out Successfully!!" });
};
