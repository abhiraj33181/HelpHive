import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    rent: {
      type: Number,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
      enum: [
        "Single Room",
        "Room in Flat",
        "Paying Guest (PG)",
        "1BHK",
        "2BHK",
        "3BHK+",
      ],
    },
    tenantPreference: {
      type: String,
      required: true,
      enum: [
        "Anyone",
        "Family",
        "Bachelors",
        "Students",
        "Girls Only",
        "Boys Only",
      ],
    },
    roomAddress: {
      text: String,
      // todo - add location
      type: {},
    },
    facilities: [String],
    images: [String],
    rating : {
        type : Number,
        // todo - complete in future
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const roomModel = mongoose.model("Room", roomSchema);

export default roomModel;
