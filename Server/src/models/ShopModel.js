import mongoose from "mongoose";
import validator from "validator";

const shopSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shopName: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      validate: (value) => {
        if (!validator.isMobilePhone(value)) {
          throw new Error("Enter valid Mobile Number");
        }
      },
    },
    shopAddress: {
      // todo - future Work
      type: {},
    },
    shopCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShopCategory",
      required: true,
    },
    timing: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    offers: [String],
    images: [
      {
        type: String,
      },
    ],
    ratingCount: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const shopModel = mongoose.model("Shop", shopSchema);

export default shopModel;
