import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    provId: {
        type: String,
        required: true,
    },
    slotDate: {
        type: String,
        required: true,
    },
    slotTime: {
        type: String,
        required: true,
    },
    userData: {
        type: Object,
        required: true,
    },
    provData: {
        type: Object,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
    isAccepted: {
        type: String,
        default: 'Pending',
    },
    payment: {
        type: Boolean,
        default: false,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    completeStatus: {
        type: String,
        enum: ['complete', 'issue']
    },
    remarks: {
        type: String,
    },
    extraCharge: {
        type : Number,
    },
    extraChargeReason: {
        type : String
    },
}, { timestamps: true })

const appointmentModel = mongoose.models.appointment || mongoose.model('Appointment', appointmentSchema)

export default appointmentModel;