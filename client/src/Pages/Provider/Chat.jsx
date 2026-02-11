import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProviderContext } from "../../context/ProviderContext";
import { createSocketConnection } from "../../utils/socket";

const ProviderChat = () => {
    const { userId } = useParams();
    const { profileData, backendURL } = useContext(ProviderContext);

    const provId = profileData?._id;
    console.log(provId)
    const [socket, setSocket] = useState(null);

    const [messages, setMessages] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState(false);

    const messagesEndRef = useRef(null);

    // Scroll to bottom when messages update
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Fetch Chat + Pagination (page =1 for now)
    const fetchChatMessages = async () => {
        try {
            const res = await axios.post(
                `${backendURL}/api/chat/get-provider`,
                { userId, provId, page: 1, limit: 50 },
                { withCredentials: true }
            );

            if (res.data.success) {
                setMessages(res.data.messages || []);
                setUserInfo(res.data.chat.userId);
            }
        } catch (error) {
            console.log("Chat Fetch Error:", error);
        }
    };

    // Socket initialization
    useEffect(() => {
        if (!provId) return;

        const newSocket = createSocketConnection();
        setSocket(newSocket);

        newSocket.emit("joinChat", { userId, provId, who: provId });

        // Receive messages
        newSocket.on("messageReceived", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        // Typing Indicator
        newSocket.on("typingResponse", ({ typing, senderId }) => {
            if (senderId !== provId) setIsTyping(typing);
        });

        // Online / Offline
        newSocket.on("userOnline", () => setOnlineStatus(true));
        newSocket.on("userOffline", () => setOnlineStatus(false));

        return () => newSocket.disconnect();
    }, [provId, userId]);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        fetchChatMessages();
    }, []);

    // Sending Message
    const sendMessage = () => {
        if (!newMessage.trim()) return;

        socket.emit("sendMessage", {
            userId,
            provId,
            senderId: provId,
            text: newMessage,
        });

        setNewMessage("");
        socket.emit("stopTyping", { userId, provId, senderId: provId });
    };

    // Typing Handler
    const handleTyping = (e) => {
        setNewMessage(e.target.value);

        socket.emit("typing", { userId, provId, senderId: provId });

        setTimeout(() => {
            socket.emit("stopTyping", { userId, provId, senderId: provId });
        }, 1500);
    };

    return (
        userInfo && (
            <div className="px-2 flex h-screen max-h-[80vh] max-w-5xl mx-auto mt-6 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-xl">

                {/* Chat Screen */}
                <section className="flex-1 flex flex-col bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-200">

                    {/* Header */}
                    <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-white/80 backdrop-blur">
                        <div className="flex gap-3 items-center">
                            <img
                                src={userInfo?.image}
                                className="w-12 h-12 rounded-full object-cover"
                                alt=""
                            />
                            <div>
                                <h2 className="text-md font-semibold text-zinc-900">
                                    {userInfo?.name}
                                </h2>
                                <p className="text-xs text-emerald-600">
                                    {onlineStatus ? "Online" : "Offline"}
                                </p>
                                {isTyping && (
                                    <p className="text-xs text-indigo-500 animate-pulse">typing…</p>
                                )}
                            </div>
                        </div>
                    </header>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.senderId === provId ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`relative max-w-[70%] px-3 pt-2 pb-5 rounded-2xl text-sm leading-snug ${msg.senderId === provId
                                            ? "bg-indigo-500 text-white rounded-br-sm"
                                            : "bg-white text-zinc-900 border border-zinc-200 rounded-bl-sm"
                                        }`}
                                >
                                    {msg.text}
                                    <span className="absolute bottom-1 right-2 text-[10px] opacity-70">
                                        {new Date().toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Box */}
                    <form
                        className="flex items-center gap-2 px-3 py-2 border-t border-zinc-200 bg-white"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={handleTyping}
                            className="flex-1 rounded-full border border-zinc-200 px-3 py-2 text-sm text-zinc-800 outline-none focus:border-indigo-500"
                        />
                        <button
                            type="submit"
                            onClick={sendMessage}
                            className={`rounded-full px-4 py-2 text-sm font-medium text-white ${newMessage === ""
                                    ? "bg-indigo-200 cursor-not-allowed"
                                    : "bg-indigo-500 hover:bg-indigo-600"
                                }`}
                            disabled={newMessage === ""}
                        >
                            Send
                        </button>
                    </form>
                </section>
            </div>
        )
    );
};

export default ProviderChat;
