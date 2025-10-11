import mongoose from "mongoose";
import validator from 'validator'

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type : String,
      required : true,
      trim: true,
    },
    mobile: {
      type : String,
      unique: true,
      required: true,
      validate: (value) => {
        if (!validator.isMobilePhone(value)){
          throw new Error('Mobile Number is not valid!!')
        }
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate : (value) =>{
        if (!validator.isEmail(value)){
          throw new Error('Email is not Valid!!')
        }
      },
    },
    location: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
    },
    profilePicture: {
      type: String,
      default: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'
    },
    password: {
      type : String,
      required: true,
      validate : (value) => {
        if (!validator.isStrongPassword(value)){
          throw new Error("Please Enter Strong Password!!");
        }
      }
    },
    role : {
      type: String,
      enum : ['user', 'provider', 'admin']
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
