import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        shopName: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            default: "",
        },
        images: {
            type: [String],
            default: [],
        },
        description: {
            type: String,
            default: "",
        },
        address: {
            street: { type: String, default: "" },
            city: { type: String, default: "" },
            state: { type: String, default: "" },
            pincode: { type: String, default: "" },
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },

        openingHours: {
            type: String,
            default: "",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

shopSchema.index({ location: "2dsphere" });

const shopModel = mongoose.models.Shop || mongoose.model("Shop", shopSchema);


export default shopModel;
