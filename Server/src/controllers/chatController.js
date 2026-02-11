import Chat from "../models/chatModel.js";

// Get full chat between User and Provider
export const getChat = async (req, res) => {
    try {
        const { userId, provId, page = 1, limit = 40 } = req.body;

        // Fetch chat
        let chat = await Chat.findOne({ userId, provId })
            .populate("userId", "name image")
            .populate("provId", "name image");

        // If chat does not exist → create new chat
        if (!chat) {
            chat = new Chat({
                userId,
                provId,
                messages: [],
                unreadCount: 0,
                lastMessage: "",
                lastMessageAt: new Date(),
                status: "active"
            });

            await chat.save();

            return res.json({
                success: true,
                chat,
                messages: [],
                page,
                totalMessages: 0
            });
        }

        // PAGINATION (Load messages newest → oldest)
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const allMessages = chat.messages || [];
        const paginatedMessages = allMessages
            .slice()
            .reverse()            // newest first
            .slice(startIndex, endIndex) // paginated slice
            .reverse();           // return oldest → newest for UI

        // Delivered update → all messages now delivered
        chat.messages.forEach((msg) => {
            if (!msg.delivered) msg.delivered = true;
        });

        // CLEAR unreadCount when opening chat
        chat.unreadCount = 0;

        await chat.save();

        return res.json({
            success: true,
            chat,
            messages: paginatedMessages,
            page,
            totalMessages: allMessages.length
        });
    } catch (error) {
        console.log("GetChat Error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};


// Delete message for everyone
export const deleteMessageForAll = async (req, res) => {
    try {
        const { chatId, messageId } = req.body;

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.json({ success: false, message: "Chat not found" });
        }

        chat.messages = chat.messages.filter((msg) => msg._id.toString() !== messageId);
        await chat.save();

        res.json({ success: true, message: "Message deleted for everyone" });
    } catch (error) {
        console.log("DeleteMsgForAll Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// Message seen manually (Backup — socket already handles seen)
export const markAllSeen = async (req, res) => {
    try {
        const { userId, provId, viewerId } = req.body;

        let chat = await Chat.findOne({ userId, provId });

        if (!chat) return res.json({ success: false, message: "No chat found" });

        chat.messages.forEach((msg) => {
            if (msg.senderId.toString() !== viewerId) {
                msg.seen = true;
            }
        });

        chat.unreadCount = 0;
        await chat.save();

        res.json({ success: true, message: "All messages marked as seen" });

    } catch (error) {
        console.log("markSeen Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
