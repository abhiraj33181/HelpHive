import providerModel from "../models/providerModel.js";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";

export const changeAvailablity = async (req, res) => {
    try {

        const { provId } = req.body;

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
        const providers = await providerModel.find({}).select(['-password', '-email'])

        res.json({ success: true, providers })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const loginProvider = async (req, res) => {
    try {
        const { email, password } = req.body;
        const provider = await providerModel.findOne({ email });

        if (!provider) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        const isMatch = await bcrypt.compare(password, provider.password)

        if (isMatch) {
            const token = JWT.sign({ id: provider._id }, process.env.SECRET_KEY)

            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export const appointmentProvider = async (req, res) => {
    try {
        let provId = req.provId;
        const appointments = await appointmentModel.find({ provId })

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const appointmentComplete = async (req, res) => {
    try {
        const provId = req.provId;
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.provId === provId) {
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
        const provId = req.provId;
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.provId === provId) {
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
        let provId = req.provId
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
        let provId = req.provId;
        const profileData = await providerModel.findById(provId).select('-password')
        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export const updateProviderProfile = async (req, res) => {
    try {
        const provId = req.provId;
        const {fees, address, available} = req.body; 
        await providerModel.findByIdAndUpdate(provId, {fees, address, available})

        res.json({success : true, message : 'Profile Updated!!'})

        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}