import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    role: { type: String, enum: ["system", "user", "assistant"], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ChatMemorySchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    ownerRole: { type: String, enum: ["user", "provider"], required: true },
    messages: { type: [MessageSchema], default: [] },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("ChatMemory", ChatMemorySchema);
