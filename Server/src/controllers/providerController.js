import providerModel from "../models/providerModel.js";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";

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
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(Date.now() + 24 * 7 * 60 * 60 * 1000)
            })

            res.json({ success: true, provider })
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
            httpOnly : true,
            secure : true,
            sameSite : 'none'
        })

        res.json({success : true, message : 'Logged out Successfully'})
    } catch (error) {
        console.log(error.message)
        res.json({success : false, message : error.message})
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

        if (appointmentData && appointmentData.provId.toString() === provId) {
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

        if (appointmentData && appointmentData.provId.toString() === provId) {
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
        let provId = req.provider._id;
        const { fees, address, available } = req.body;
        await providerModel.findByIdAndUpdate(provId, { $set: { fees, address, available } });

        res.json({ success: true, message: 'Profile Updated!!' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}