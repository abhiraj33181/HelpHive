import { isEditProfile } from "../utils/validation";
import bcrypt from "bcrypt";
import validator from "validator";

// View Profile
export const viewProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Edit Profile
export const editProfile = async (req, res) => {
  try {
    if (!isEditProfile(req)) {
      return res
        .status(400)
        .json({ success: false, message: "Updation is not allowed!!" });
    }

    const loggedUser = req.user;

    Object.keys(req.body).forEach(
      (data) => (loggedUser[data] = req.body[data])
    );
    await loggedUser.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Profile Updated Successfully!!",
        user: loggedUser,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { oldPassword, password } = req.body;
    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Strong Password!" });
    }

    const user = req.user;

    const isPasswordValid = await user.isPasswordMatch(oldPassword);
    if (isPasswordValid) {
      const hashPassword = await bcrypt.hash(password, 10);

      user.password = hashPassword;
      await user.save();

      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      res.status(201).json({ success: true, message: "Password Updated!!" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid Credentials!!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
