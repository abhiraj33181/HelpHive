import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import providerModel from '../models/providerModel.js'
import appointmentModel from '../models/appointmentModel.js'

// register new user 

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details!!" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a Valid Email" })
        }

        if (!validator.isStrongPassword(password)) {
            return res.json({ success: false, message: "Enter a strong Password" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const userData = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = JWT.sign({ _id: user._id }, process.env.SECRET_KEY)

        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid Credentials!!" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY)

            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Invalid Credentials!!' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name, phone, line1, line2, dob, gender } = req.body;
        const userId = req.userId

        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing.." })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: { line1, line2 }, dob, gender })
        
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type : 'image'})
            const imageURL = (await imageUpload).secure_url

            await userModel.findByIdAndUpdate(userId, {image : imageURL})
        }

        res.json({success : true, message : 'Profile Updated!!'})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to book the appointment 

export const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const {provId, slotDate, slotTime} = req.body

        const provData = await providerModel.findById(provId).select('-password')

        if(!provData.available) {
            return res.json({ success: false, message: 'Provider not available'})
        }

        let slots_booked = provData.slots_booked
        if (slots_booked[slotDate]){
            if (slots_booked[slotDate].includes(slotTime)){
                return res.json({ success: false, message: 'Slot not available'})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete provData.slots_booked

        const appointmentData = {
            userId,
            provId,
            userData,
            provData,
            amount : provData.fees,
            slotTime,
            slotDate,
        }
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await providerModel.findByIdAndUpdate(provId, {slots_booked})

        res.json({success : true, message : 'Appointment Booked!'})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const listAppointment = async (req,res) => {
    try {
        let userId = req.userId
        const appointments = await appointmentModel.find({userId})

        res.json({success : true, appointments})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}