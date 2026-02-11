import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import providerModel from '../models/providerModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'

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

        const token = await user.getJWT()

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            path: "/",
            expires: new Date(Date.now() + 24 * 7 * 60 * 60 * 1000)
        })
        user.password = undefined;
        res.json({ success: true, message: "User Registered", user });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: true, message: 'Missing Credentials!' })
        }
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid Credentials!!" })
        }


        const isMatch = await user.isPasswordMatch(password)

        if (isMatch) {
            const token = await user.getJWT()

            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                path: "/",
                expires: new Date(Date.now() + 24 * 7 * 60 * 60 * 1000)
            })
            res.json({ success: true, user })
        } else {
            res.json({ success: false, message: 'Invalid Credentials!!' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const logOutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
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

export const getProfile = async (req, res) => {
    try {
        res.json({ success: true, userData: req.user })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name, phone, street, city, state, pincode, dob, gender } = req.body;
        const userId = req.user._id;

        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing.." })
        }

        const updateData = { name, phone, dob, gender };

        updateData.address = {
            street: street ?? req.user.address.street,
            city: city ?? req.user.address.city,
            state: state ?? req.user.address.state,
            pincode: pincode ?? req.user.address.pincode,
        };

        if (req.body.lat && req.body.lng) {
            updateData.location = {
                type: "Point",
                coordinates: [req.body.lng, req.body.lat]
            };
        }


        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            updateData.image = imageUpload.secure_url
        }

        await userModel.findByIdAndUpdate(userId, { $set: updateData })


        res.json({ success: true, message: 'Profile Updated!!' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to book the appointment 

export const bookAppointment = async (req, res) => {
    try {
        const user = req.user;
        const { provId, slotDate, slotTime } = req.body

        const provData = await providerModel.findById(provId).select('-password')

        if (!provData.available) {
            return res.json({ success: false, message: 'Provider not available' })
        }

        let slots_booked = provData.slots_booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        delete provData.slots_booked

        const appointmentData = {
            userId: user._id,
            provId,
            userData: user,
            provData,
            amount: provData.fees,
            slotTime,
            slotDate,
        }
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await providerModel.findByIdAndUpdate(provId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked!' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const listAppointment = async (req, res) => {
    try {
        let user = req.user;
        const appointments = await appointmentModel.find({ userId: user._id })

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const cancelAppointment = async (req, res) => {
    try {
        const userId = req.user._id;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData.userId.toString() !== req.user._id.toString()) {
            return res.json({ success: false, message: 'Unauthorized action.' })
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        const { provId, slotDate, slotTime } = appointmentData

        const providerData = await providerModel.findById(provId)

        let slots_booked = providerData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await providerModel.findByIdAndUpdate(provId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled!' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// razorpay payement integration 

const razorypayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or not found." })
        }


        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.currency,
            receipt: appointmentId
        }

        const order = await razorypayInstance.orders.create(options)
        res.json({ success: true, order })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body.response
        const orderInfo = await razorypayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: 'Payment Successfull!!' })
        } else {
            res.json({ success: false, message: 'Payment Failed!!' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}