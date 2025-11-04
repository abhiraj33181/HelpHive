import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    about: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
    },
    fees: {
        type: Number,
        required: true
    },
    address: {
        line1: { type: String, required: true },
        line2: { type: String },
    },
    slots_booked: {
        type: Object,
        default: {}
    }
}, { timestamps: true }, { minimize: false })


const providerModel = mongoose.models.provider || mongoose.model('provider', providerSchema)

export default providerModel;