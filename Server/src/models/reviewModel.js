import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
        index: true
    },
    userId: {
        type: String,
        required: true
    },
    providerId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    title: { type: String },
    message: { type: String },
}, { timestamps: true });

// unique review per appointment
reviewSchema.index({ appointmentId: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
