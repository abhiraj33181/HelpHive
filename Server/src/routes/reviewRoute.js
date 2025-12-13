import express from "express";
import { addReview, getProviderReviews, deleteReview } from "../controllers/reviewController.js";
import authUser from "../middlewares/authUser.js"; // must set req.user

const reviewRouter = express.Router();

reviewRouter.post("/add", authUser, addReview);
reviewRouter.get("/provider/:providerId", getProviderReviews);
reviewRouter.delete("/delete/:reviewId", authUser, deleteReview);

export default reviewRouter;

