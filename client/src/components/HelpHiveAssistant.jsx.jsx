import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { MessageCircle, Sparkles, X, Send } from "lucide-react";
import { askAIAPI } from "../services/aiService";

export default function HelpHiveAssistant({ ownerId, ownerRole }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: "Welcome to **HelpHive India AI**.\n\nAsk about providers, bookings, shops, rentals, payments, or account help.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);


  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);


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
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-sky-200 bg-white/95 px-4 py-3 text-slate-900 shadow-[0_18px_50px_-20px_rgba(14,116,144,0.55)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-20px_rgba(14,116,144,0.65)]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30">
            <MessageCircle size={20} />
          </span>
          <span className="hidden sm:block text-left">
            <span className="block text-sm font-semibold">HelpHive India AI</span>
            <span className="block text-xs text-slate-500">Ask anything about the platform</span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/30 backdrop-blur-sm sm:bg-transparent">
        <div
          className="
            fixed inset-x-0 bottom-0 z-50 h-[88vh] w-full overflow-hidden rounded-t-[28px]
            border border-slate-200 bg-white shadow-2xl
            sm:bottom-4 sm:right-4 sm:left-auto sm:h-[560px] sm:w-[400px] sm:rounded-[28px]
            flex flex-col
          "
        >
          {/* Header */}
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.35),_transparent_35%),linear-gradient(135deg,#0f172a,#1d4ed8)] text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                <Sparkles size={18} />
              </span>
              <div>
                <h3 className="font-semibold">HelpHive India AI</h3>
                <p className="text-xs text-blue-100">
                  Booking, support, rentals and provider guidance
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full p-2 transition hover:bg-white/10">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_100%)] p-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[84%] px-4 py-3 rounded-2xl text-sm shadow-sm ring-1 ring-black/5
                    ${m.from === "user"
                      ? "bg-slate-900 text-white rounded-br-none"
                      : "bg-white/95 text-slate-800 rounded-bl-none"
                    }`}
                >
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl text-sm shadow-sm text-slate-600">
                  HelpHive AI is typing...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 bg-white p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about a booking, provider, shop or rental"
              disabled={loading}
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
            <button
              onClick={send}
              disabled={loading}
              className="flex items-center gap-1 rounded-2xl bg-slate-900 px-4 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
        </div>
      )}
    </>
  );
}
