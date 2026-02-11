import Review from "../models/reviewModel.js";
import Appointment from "../models/appointmentModel.js";
import { recalcProviderRating } from "../utils/ratingUitls.js";

export const addReview = async (req, res) => {
    try {
        const userId = req.user.id;   // from authUser middleware
        const { appointmentId, rating, title, message } = req.body;

        // Validate fields
        if (!appointmentId || !rating)
            return res.status(400).json({ success: false, message: "appointmentId & rating required" });

        // Check appointment exists
        const app = await Appointment.findById(appointmentId);
        if (!app) return res.status(404).json({ success: false, message: "Appointment not found" });

        // Must be user's own appointment
        if (app.userId !== userId)
            return res.status(403).json({ success: false, message: "Not your appointment" });

        // Appointment must be completed
        if (!app.isCompleted)
            return res.status(400).json({ success: false, message: "You can only review completed appointments" });

        // Check if already reviewed
        const exists = await Review.findOne({ appointmentId });
        if (exists)
            return res.status(400).json({ success: false, message: "Review already exists" });

        // Create review
        const review = await Review.create({
            appointmentId,
            userId,
            providerId: app.provId,
            rating,
            title,
            message
        });

        // Update provider rating
        await recalcProviderRating(app.provId);

        return res.json({ success: true, review });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getProviderReviews = async (req, res) => {
    try {
        const providerId = req.params.providerId;
        const reviews = await Review.find({ providerId }).sort({ createdAt: -1 });
        res.json({ success: true, reviews });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ success: false, message: "Not found" });

        if (review.userId !== userId)
            return res.status(403).json({ success: false, message: "Not allowed" });

        await Review.deleteOne({ _id: reviewId });
        await recalcProviderRating(review.providerId);

        res.json({ success: true, message: "Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
