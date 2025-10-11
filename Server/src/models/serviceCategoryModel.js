import mongoose, { model, Schema } from "mongoose";

const serviceCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true }
);

const serviceCategoryModel = mongoose.model(
  "ServiceCategory",
  serviceCategorySchema
);

export default serviceCategoryModel;
