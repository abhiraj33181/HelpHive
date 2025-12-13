import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        propertyType: {
            type: String,
            enum: ["Apartment", "Flat", "Room", "House", "PG"],
            required: true,
        },
        rent: {
            type: Number,
            required: true,
        },
        deposit: {
            type: Number,
            default: 0,
        },
        furnishing: {
            type: String,
            enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
            default: "Unfurnished",
        },
        bedroom: { type: Number, default: 1 },
        bathroom: { type: Number, default: 1 },
        size: {
            type: Number,
            default: 0,
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
                type: [Number], // [lng, lat]
                required: true,
            },
        },
        available: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

propertySchema.index({ location: "2dsphere" });

const propertyModel = mongoose.models.Property || mongoose.model("Property", propertySchema);
export default propertyModel;
