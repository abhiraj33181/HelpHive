import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary';
import providerModel from '../models/providerModel.js';
import JWT from 'jsonwebtoken'

// creating the provider
export const addProvider = async (req, res) => {
    try {
        const { name, email, password, service, experience, fees, address, about } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !service || !experience || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a Valid Email" })
        }
        if (!validator.isStrongPassword(password)) {
            return res.json({ success: false, message: "Please Enter a Strong Password" })
        }

        const hashPassword = await bcrypt.hash(password, 10)


        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type : "image"})
        const imageURL = imageUpload.secure_url

        const providerData = {
            name,
            email,
            image : imageURL,
            password : hashPassword,
            service,
            experience,
            fees,
            address : JSON.parse(address),
            about
        }

        const newProvider = new providerModel(providerData)
        await newProvider.save()

        res.json({success : true, message : 'Provider Added'})
    } catch (error) {
        console.log(error)
        res.json({success : false, message: error.message})
    }
}

export const loginAdmin = async (req,res) => {
    try {
        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = JWT.sign(email+password, process.env.SECRET_KEY)
            res.json({success : true, token})
        }else{
            res.json({success : false, message : 'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}

export const allProvider = async (req,res) => {
    try {
        const providers = await providerModel.find({}).select('-password')
        res.json({success : true, providers})
    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}

