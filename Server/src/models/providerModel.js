import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true,
    },
    experience: {
      type: Number,
      default: 0,
    },
    baseCharge: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      maxLength: 500,
    },
    availability: {
      type: String,
      enum: ["Busy", "Available"],
      default: "Available",
    },
    serviceLocation: {
      // todo
      type: {},
      coordinates: {},
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // todo - rating part
  },
  { timestamps: true }
);

const providerModel = mongoose.model("Provider", providerSchema);

export default providerModel;
