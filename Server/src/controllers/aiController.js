import Groq from "groq-sdk";
import ChatMemory from "../models/chatMemoryModel.js";
import mongoose from "mongoose";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


const COOLDOWN_MS = 1000;
const lastRequest = new Map();

function checkCooldown(ownerId) {
  const now = Date.now();
  const last = lastRequest.get(ownerId) || 0;
  if (now - last < COOLDOWN_MS) return false;
  lastRequest.set(ownerId, now);
  return true;
}


// CONFIG
const MEMORY_LIMIT = 6; // keep last 6 messages (you can tune)
const SYSTEM_PROMPT = `
You are HelpHive Assistant.
Answer ONLY HelpHive-related queries (booking, providers, shops, properties, payments, categories, app usage).
Format every answer in Markdown:
- Short intro (1 sentence)
- Step-by-step numbered list (if steps)
- Bullet summary (if needed)
- Final note (1 line)
If unrelated, reply exactly: "Sorry, I can answer only HelpHive related queries."
`;

// Predefined quick replies
const PREDEFINED_ANSWERS = [
  { keywords: ["how to book", "booking kaise", "book service"], answer: "### Quick Booking Steps\n1. Open category (e.g., AC Repair)\n2. Select provider\n3. Click **Book Now**\n4. Complete payment\n\n**Done.**" },
  { keywords: ["payment issue", "razorpay error"], answer: "### Payment Troubleshooting\n- Check your internet\n- Check Razorpay transaction in Dashboard\n- If still fails, retry payment or contact support." }
];

const ALLOWED_KEYWORDS = [
  "booking", "provider", "shop", "property", "payment", "razorpay",
  "category", "plumber", "electrician", "ac", "repair", "location",
  "error", "update", "status", "service", "helphive", "book", "appointment", "refund", "cancel"
];

function textIsRelevant(text) {
  if (!text) return false;
  const t = text.toLowerCase();
  return ALLOWED_KEYWORDS.some(k => t.includes(k)) || /help(hive)?/i.test(t);
}

function getPredefinedResponse(message) {
  const t = message.toLowerCase();
  for (const item of PREDEFINED_ANSWERS) {
    if (item.keywords.some(k => t.includes(k))) return item.answer;
  }
  return null;
}

// Memory helpers
async function loadMemory(ownerId, ownerRole) {
  const mem = await ChatMemory.findOne({ ownerId, ownerRole });
  return mem ? mem.messages : [];
}

async function saveMessageToMemory(ownerId, ownerRole, messageObj) {
  const upsert = await ChatMemory.findOneAndUpdate(
    { ownerId, ownerRole },
    {
      $push: { messages: { $each: [messageObj], $slice: -MEMORY_LIMIT } },
      $set: { updatedAt: new Date() }
    },
    { upsert: true, new: true }
  );
  return upsert;
}

export const askAI = async (req, res) => {
  try {
    const { message } = req.body;
    // ownerId & role should come from auth middleware (or frontend if optional)
    const ownerId = req.user?.id || req.provider?._id || req.body.ownerId;
    const ownerRole = req.user ? "user" : (req.provider ? "provider" : (req.body.ownerRole || "user"));

    if (ownerId && !checkCooldown(ownerId)) {
      return res.status(429).json({
        success: false,
        reply: "You're sending messages too fast. Please wait a moment."
      });
    }

    if (!message || message.trim().length === 0) return res.status(400).json({ success: false, reply: "Empty message" });

    // 1) Predefined quick answers
    const predefined = getPredefinedResponse(message);
    if (predefined) {
      // save both user msg and assistant reply to memory
      if (ownerId) {
        await saveMessageToMemory(ownerId, ownerRole, { role: "user", content: message });
        await saveMessageToMemory(ownerId, ownerRole, { role: "assistant", content: predefined });
      }
      return res.json({ success: true, reply: predefined });
    }

    // 2) Relevance check
    if (!textIsRelevant(message)) {
      return res.json({ success: true, reply: "Sorry, I can answer only HelpHive related queries." });
    }

    // 3) Load memory and build conversation
    let mem = [];
    if (ownerId && mongoose.Types.ObjectId.isValid(ownerId)) {
      mem = await loadMemory(ownerId, ownerRole);
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      // include memory messages (map to model roles)
      ...mem.map(m => ({ role: m.role === "assistant" ? "assistant" : (m.role === "system" ? "system" : "user"), content: m.content })),
      { role: "user", content: message }
    ];

    // 4) Save user message to memory
    if (ownerId) await saveMessageToMemory(ownerId, ownerRole, { role: "user", content: message });

    // 5) Call Groq
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      max_tokens: 350
    });

    const reply = completion.choices?.[0]?.message?.content ?? "Sorry, I couldn't answer that.";

    // 6) Save assistant reply to memory
    if (ownerId) await saveMessageToMemory(ownerId, ownerRole, { role: "assistant", content: reply });

    return res.json({ success: true, reply });

  } catch (error) {
    console.error("AI error:", error);
    return res.status(500).json({ success: false, reply: "AI service error" });
  }
};
