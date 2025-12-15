import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { MessageCircle, X, Send } from "lucide-react";
import { askAIAPI } from "../services/aiService";

export default function HelpHiveAssistant({ ownerId, ownerRole }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: "👋 Hi! I am **HelpHive AI**.\n\nAsk me anything related to HelpHive services.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { id: Date.now(), from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await askAIAPI(text, ownerId, ownerRole);
      const reply = res.data?.reply || "No response from AI.";
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "bot", text: reply },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          from: "bot",
          text: "⚠️ AI service is temporarily unavailable.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="
            fixed bottom-4 right-4 z-50
            w-full h-full sm:w-[380px] sm:h-[520px]
            bg-white rounded-2xl shadow-2xl
            flex flex-col overflow-hidden
          "
        >
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">HelpHive AI</h3>
              <p className="text-xs text-blue-100">
                Smart assistant for HelpHive
              </p>
            </div>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow
                    ${
                      m.from === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                >
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl text-sm shadow">
                  🤖 Typing...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t p-3 flex gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask HelpHive..."
              disabled={loading}
              className="flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={send}
              disabled={loading}
              className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700 transition flex items-center gap-1"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
