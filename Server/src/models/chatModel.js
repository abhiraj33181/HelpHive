import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    // todo
}, {timestamps:true})

const chatModel = mongoose.model('Chat', chatSchema)

export default chatModel