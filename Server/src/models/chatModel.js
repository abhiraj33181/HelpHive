import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        default: ""
    },
    media: {
        url: String,
        type: {
            type: String,
            enum: ["image", "file", null],
            default: null
        }
    },
    seen: {
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const chatSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    provId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
        required: true
    },

    messages: [messageSchema],

    lastMessage: {
        type: String,
        default: ""
    },

    lastMessageAt: {
        type: Date,
        default: Date.now
    },

    unreadCount: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["active", "completed", "blocked"],
        default: "active"
    },

}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);
