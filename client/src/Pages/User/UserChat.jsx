import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { createSocketConnection } from "../../utils/socket";

const UserChat = () => {
    const messagesEndRef = useRef(null);

    const { userData, backendURL } = useContext(AppContext);
    const userId = userData?._id;

    const { provId } = useParams();

    const [socket, setSocket] = useState(null);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [provInfo, setProvInfo] = useState(null);

    const [isTyping, setIsTyping] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState(false);

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Fetch Existing Chat
    const fetchChatMessages = async () => {
        try {
            const res = await axios.post(
                `${backendURL}/api/chat/get`,
                { userId, provId, page: 1, limit: 50 },
                { withCredentials: true }
            );

            if (res.data.success) {
                setMessages(res.data.messages || []);
                setProvInfo(res.data.chat.provId);
            }
        } catch (error) {
            console.log("Fetch Error:", error);
        }
    };

    // SOCKET CONNECTION
    useEffect(() => {
        if (!provId || !userId) return;

        const newSocket = createSocketConnection();
        setSocket(newSocket);

        // join room
        newSocket.emit("joinChat", { userId, provId, who: userId });

        // receive messages
        newSocket.on("messageReceived", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        // typing
        newSocket.on("typingResponse", ({ typing, senderId }) => {
            if (senderId !== userId) setIsTyping(typing);
        });

        // online / offline
        newSocket.on("userOnline", () => setOnlineStatus(true));
        newSocket.on("userOffline", () => setOnlineStatus(false));

        return () => newSocket.disconnect();
    }, [userId, provId]);

    // Auto scroll when new message comes
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initial fetch
    useEffect(() => {
        fetchChatMessages();
    }, []);

    // Send message
    const sendMessage = () => {
        if (!newMessage.trim()) return;

        socket.emit("sendMessage", {
            userId,
            provId,
            senderId: userId,
            text: newMessage,
        });

        setNewMessage("");
        socket.emit("stopTyping", { userId, provId, senderId: userId });
    };

    // Typing indicator
    const handleTyping = (e) => {
        setNewMessage(e.target.value);

        socket.emit("typing", { userId, provId, senderId: userId });

        setTimeout(() => {
            socket.emit("stopTyping", { userId, provId, senderId: userId });
        }, 1500);
    };

    return (
        provInfo && (
            <div className="flex h-screen max-h-[80vh] max-w-5xl mx-auto mt-6 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">

                {/* Right: Messages */}
                <section className="flex-1 flex flex-col bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-200">

                    {/* HEADER */}
                    <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-white/80 backdrop-blur">
                        <div className="flex gap-3 items-center">
                            <img
                                src={provInfo?.image}
                                className="w-12 h-12 rounded-full object-cover"
                                alt=""
                            />
                            <div>
                                <h2 className="text-md font-semibold text-zinc-900">
                                    {provInfo?.name}
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

                    {/* MESSAGES */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`relative max-w-[70%] px-3 pt-2 pb-5 rounded-2xl text-sm leading-snug
                    ${msg.senderId === userId
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

                    {/* INPUT BAR */}
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
                            className={`rounded-full cursor-pointer ${newMessage === ""
                                    ? "bg-indigo-200 cursor-not-allowed"
                                    : "bg-indigo-500 hover:bg-indigo-600"
                                } px-4 py-2 text-sm font-medium text-white active:scale-95 transition`}
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

export default UserChat;
