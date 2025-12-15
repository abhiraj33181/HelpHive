import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { askAIAPI } from "../services/aiService";

export default function HelpHiveAssistant({ ownerId, ownerRole }) {
  const [messages, setMessages] = useState([{ id: 1, from: "bot", text: "Hello! Ask HelpHive related questions." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { id: Date.now(), from: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await askAIAPI(text, ownerId, ownerRole);
      const reply = res.data?.reply ?? "No response";
      setMessages(prev => [...prev, { id: Date.now() + 1, from: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now() + 2, from: "bot", text: "AI service error." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto border rounded p-4">
      <div className="h-64 overflow-auto mb-3 space-y-3">
        {messages.map(m => (
          <div key={m.id} className={m.from === "user" ? "text-right" : "text-left"}>
            <div className={`inline-block p-2 rounded ${m.from === "user" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
              <ReactMarkdown>{m.text}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 border p-2" onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask HelpHive related question..." disabled={loading} />
        <button onClick={send} className="bg-green-600 text-white px-3 py-2 rounded" disabled={loading}>{loading ? "..." : "Send"}</button>
      </div>
    </div>
  );
}
