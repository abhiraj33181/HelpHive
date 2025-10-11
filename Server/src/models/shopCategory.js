import mongoose from "mongoose";

const shopCategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },
    icon : {
        type : String
    }
}, {timestamps : true})

const shopCategoryModel = mongoose.model('ShopCategory', shopCategorySchema)

export default shopCategoryModel