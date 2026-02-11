import validator from 'validator'
import providerModel from "../models/providerModel.js";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary'
import appointmentModel from "../models/appointmentModel.js";


// register provider 
export const registerProvider = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details!!" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a Valid Email" })
        }
        const exist = await providerModel.findOne({ email });
        if (exist) return res.json({ success: false, message: "Email already registered" });


        if (!validator.isStrongPassword(password)) {
            return res.json({ success: false, message: "Enter a strong Password" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const provData = {
            name,
            email,
            password: hashPassword
        }

        const newProv = new providerModel(provData)
        const provider = await newProv.save()

        const token = await provider.getJWT()

        res.cookie('pToken', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            path: "/",
            expires: new Date(Date.now() + 24 * 7 * 60 * 60 * 1000)
        })

        res.cookie
        res.json({ success: true, provider })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export const changeAvailablity = async (req, res) => {
    try {

        const { provId } = req.body;

        if (!provId) {
            return res.json({ success: false, message: "Provider not found!" })
        }

        const provData = await providerModel.findById(provId)

        await providerModel.findByIdAndUpdate(provId, { available: !provData.available })

        res.json({ success: true, message: `${provData.name}'s Availablity Changed!` })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export const providerList = async (req, res) => {
    try {
        const providers = await providerModel.find({}, { password: 0, email: 0 })

        res.json({ success: true, providers })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const loginProvider = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Missing Credentails!!" })
        }
        const provider = await providerModel.findOne({ email });

        if (!provider) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        const isMatch = await provider.isPasswordMatch(password);

        if (isMatch) {
            const token = await provider.getJWT()

            res.cookie('pToken', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                path: "/",
                expires: new Date(Date.now() + 24 * 7 * 60 * 60 * 1000)
            })

            const provObj = provider.toObject();
            delete provObj.password;
            res.json({ success: true, provider: provObj });
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const logOutUser = async (req, res) => {
    try {
        res.clearCookie('pToken', {
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


export const appointmentProvider = async (req, res) => {
    try {
        let provId = req.provider._id;
        const appointments = await appointmentModel.find({ provId }).sort({ createdAt: -1 })

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const appointmentComplete = async (req, res) => {
    try {
        let provId = req.provider._id;

        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.provId.toString() === provId.toString()) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed!' })
        } else {
            return res.json({ success: false, message: 'Mark Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const appointmentCancel = async (req, res) => {
    try {
        let provId = req.provider._id;

        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.provId.toString() === provId.toString()) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled!' })
        } else {
            return res.json({ success: false, message: 'Cancellation Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const appointmentAccept = async (req, res) => {
    try {
        let provId = req.provider._id;


        const { appointmentId, status } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.provId.toString() === provId.toString()) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isAccepted: status })
            return res.json({ success: true, message: 'Appointment Confirmed!' })
        } else {
            return res.json({ success: false, message: 'Something went wrong!' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export const providerDashboard = async (req, res) => {
    try {
        let provId = req.provider._id;

        const appointments = await appointmentModel.find({ provId })

        let earning = 0
        let users = []
        appointments.map((item) => {

            if (item.isCompleted || item.payment) {
                earning += item.amount
            }

            if (!users.includes(item.userId)) {
                users.push(item.userId)
            }
        })

        const dashData = {
            earning,
            appointments: appointments.length,
            users: users.length,
            latestAppointments: appointments.reverse().splice(0, 5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const providerProfile = async (req, res) => {
    try {
        res.json({ success: true, profileData: req.provider })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export const updateProviderProfile = async (req, res) => {
    try {
        const { name, phone, street, city, state, pincode, dob, gender, available } = req.body;
        const provId = req.provider._id;

        const imageFile = req.file;

        if (!name || !gender) {
            return res.json({ success: false, message: "Data Missing.." })
        }

        const updateData = { name, phone, dob, gender, available }

        updateData.address = {
            street: street ?? req.provider.address.street,
            city: city ?? req.provider.address.city,
            state: state ?? req.provider.address.state,
            pincode: pincode ?? req.provider.address.pincode
        }

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

        await providerModel.findByIdAndUpdate(provId, { $set: updateData }, { new: true })
        console.log(name, phone, street, city, state, pincode, dob, gender, available)
        res.json({ success: true, message: 'Profile Updated!!' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}