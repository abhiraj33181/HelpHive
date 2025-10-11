import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    firstName: String,
    mobile: Number,
    email: String,
    address: String,
    shopType : String, //Groccery, pharmacy
    timing : String,
    Offers : String,
    images : String

}, {timestamps: true})

const shopModel = mongoose.model('Shop', shopSchema)

export default shopModel