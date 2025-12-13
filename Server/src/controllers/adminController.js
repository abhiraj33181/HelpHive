import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary';
import providerModel from '../models/providerModel.js';
import JWT from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

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

        const existingProvider = await providerModel({ email })
        if (existingProvider) {
            return res.json({ success: false, message: 'Provider Already Exist!!' })
        }

        const hashPassword = await bcrypt.hash(password, 10)


        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageURL = imageUpload.secure_url

        const providerData = {
            name,
            email,
            image: imageURL,
            password: hashPassword,
            service,
            experience,
            fees,
            address: JSON.parse(address),
            about
        }

        const newProvider = new providerModel(providerData)
        await newProvider.save()

        res.json({ success: true, message: 'Provider Added' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = JWT.sign(email + password, process.env.SECRET_KEY)
            res.cookie('aToken', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                path: "/",
                expires: new Date(Date.now() + 24 * 7 * 60 * 60 * 1000)
            })
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Invalid Credentials' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const logOutUser = async (req, res) => {
    try {
        res.clearCookie('aToken', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            path: "/",
        })

        res.json({ success: true, message: 'Logged out Successfully' })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const allProvider = async (req, res) => {
    try {
        const providers = await providerModel.find({}).select('-password')
        res.json({ success: true, providers })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export const appointmentAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId)


        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        const { provId, slotDate, slotTime } = appointmentData

        const providerData = await providerModel.findById(provId)

        let slots_booked = providerData.slots_booked;

        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
        }

        await providerModel.findByIdAndUpdate(provId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled!' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// fetch => dashboard data

export const adminDashboard = async (req, res) => {
    try {
        const providersCount = await providerModel.countDocuments();
        const usersCount = await userModel.countDocuments();
        const appointments = await appointmentModel.find({});

        const dashData = {
            providers: providersCount,
            appointments: appointments.length,
            users: usersCount,
            latestAppointments: [...appointments].reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
