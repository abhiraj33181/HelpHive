import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken'

// register new user 

export const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body

        if (!name || !email || !password){
            return res.json({success: false, message : "Missing Details!!"})
        }

        if (!validator.isEmail(email)){
            return res.json({success: false, message : "Enter a Valid Email"})
        }

        if(!validator.isStrongPassword(password)){
            return res.json({success: false, message : "Enter a strong Password"})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const userData = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token =JWT.sign({_id : user._id}, process.env.SECRET_KEY)

        res.json({success : true, token})
    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}


export const userLogin = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success: false, message : "Invalid Credentials!!"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = JWT.sign({id : user._id}, process.env.SECRET_KEY)

            res.json({success: true, token})
        }else{
            res.json({success: false, message : 'Invalid Credentials!!'})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}