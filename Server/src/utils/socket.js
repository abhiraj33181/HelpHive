import { Server } from "socket.io";
import crypto from "crypto";
import Chat from "../models/chatModel.js";

// Secure room identifier
const getRoomId = (userId, provId) => {
    return crypto
        .createHash("sha256")
        .update([userId, provId].sort().join("_"))
        .digest("hex");
};

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    // Track online users
    const onlineUsers = new Map(); // socketId → userId | provId

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        /*
        |--------------------------------------------------------------------------
        | JOIN CHAT ROOM
        |--------------------------------------------------------------------------
        */
        socket.on("joinChat", async ({ userId, provId, who }) => {
            const roomId = getRoomId(userId, provId);
            socket.join(roomId);

            onlineUsers.set(socket.id, who);

            io.to(roomId).emit("userOnline", { who });

            console.log(`${who} joined room ${roomId}`);
        });

        /*
        |--------------------------------------------------------------------------
        | TYPING INDICATOR
        |--------------------------------------------------------------------------
        */
        socket.on("typing", ({ userId, provId, senderId }) => {
            const roomId = getRoomId(userId, provId);
            io.to(roomId).emit("typingResponse", { typing: true, senderId });
        });

        socket.on("stopTyping", ({ userId, provId, senderId }) => {
            const roomId = getRoomId(userId, provId);
            io.to(roomId).emit("typingResponse", { typing: false, senderId });
        });

        /*
        |--------------------------------------------------------------------------
        | SEND MESSAGE (TEXT + MEDIA + DELIVERED STATUS)
        |--------------------------------------------------------------------------
        */
        socket.on("sendMessage", async ({ userId, provId, senderId, text, media }) => {
            try {
                const roomId = getRoomId(userId, provId);

                let chat = await Chat.findOne({ userId, provId });

                if (!chat) {
                    chat = new Chat({
                        userId,
                        provId,
                        messages: []
                    });
                }

                const newMessage = {
                    senderId,
                    text: text || "",
                    media: media || null,
                    delivered: true,
                    seen: false
                };

                chat.messages.push(newMessage);

                // last message for sidebar UI
                chat.lastMessage =
                    text ||
                    (media?.type === "image" ? "📷 Photo" : media?.type === "file" ? "📁 File" : "");

                chat.lastMessageAt = new Date();

                // increase unread count for the receiver
                chat.unreadCount = (chat.unreadCount || 0) + 1;

                await chat.save();

                io.to(roomId).emit("messageReceived", {
                    ...newMessage,
                    createdAt: new Date()
                });

                // update chat list sidebar
                io.to(roomId).emit("chatUpdated", {
                    lastMessage: chat.lastMessage,
                    lastMessageAt: chat.lastMessageAt,
                    unreadCount: chat.unreadCount
                });

                console.log("Message sent:", text);
            } catch (error) {
                console.log("sendMessage Error:", error);
            }
        });

        /*
        |--------------------------------------------------------------------------
        | MARK SEEN  ✓✓
        |--------------------------------------------------------------------------
        */
        socket.on("markSeen", async ({ userId, provId, viewerId }) => {
            try {
                const chat = await Chat.findOne({ userId, provId });
                if (!chat) return;

                chat.messages.forEach((msg) => {
                    if (msg.senderId !== viewerId) msg.seen = true;
                });

                chat.unreadCount = 0;
                await chat.save();

                const roomId = getRoomId(userId, provId);
                io.to(roomId).emit("messagesSeen", { viewerId });
            } catch (error) {
                console.log("markSeen Error:", error);
            }
        });

        /*
        |--------------------------------------------------------------------------
        | DISCONNECT → OFFLINE STATUS
        |--------------------------------------------------------------------------
        */
        socket.on("disconnect", () => {
            const user = onlineUsers.get(socket.id);
            onlineUsers.delete(socket.id);

            io.emit("userOffline", { who: user });
            console.log("Socket disconnected:", socket.id);
        });
    });
};

export default initializeSocket;
