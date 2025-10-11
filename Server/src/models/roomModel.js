import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    fullName: String,
    mobile: Number,
    email: String,
    Address : String,
    facilities : [String],
    image : String
}, {timestamps: true})

const roomModel = mongoose.model('Room', roomSchema)

export default roomModel