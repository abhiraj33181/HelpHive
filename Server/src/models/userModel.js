import mongoose from "mongoose";
import validator from 'validator'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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
      enum : ['user', 'provider', 'admin'],
      default : 'user'
    }
  },
  { timestamps: true }
);

userSchema.methods.getJWT = function (){
  const user = this;
  const token = JWT.sign({_id : user._id}, process.env.SECRET_KEY, {
    expiresIn : '7d'
  })
  return token
}

userSchema.methods.isPasswordMatch = function (password){
  const user = this
  return bcrypt.compare(password, user.password)
}


const userModel = mongoose.model("User", userSchema);

export default userModel;
