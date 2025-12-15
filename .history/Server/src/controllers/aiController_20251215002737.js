import Groq from "groq-sdk";
import ChatMemory from "../models/chatMemoryModel.js";
import mongoose from "mongoose";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/* -------------------- RATE LIMIT -------------------- */
const COOLDOWN_MS = 1000;
const lastRequest = new Map();

function checkCooldown(ownerId) {
  const now = Date.now();
  const last = lastRequest.get(ownerId) || 0;
  if (now - last < COOLDOWN_MS) return false;
  lastRequest.set(ownerId, now);
  return true;
}

/* -------------------- CONFIG -------------------- */
const MEMORY_LIMIT = 6;

const SYSTEM_PROMPTS = {
  user: `
You are HelpHive AI for USERS.

You help with:
- booking services
- payments & refunds
- providers, shops & properties
- appointments, cancellations
- HelpHive app usage

Rules:
- Answer ONLY HelpHive related queries
- Use Markdown
- Keep answers short & clear
- If unrelated, reply EXACTLY:
"Sorry, I can answer only HelpHive related queries."
`,

  provider: `
You are HelpHive AI for PROVIDERS.

You help with:
- accepting/rejecting bookings
- job completion flow
- earnings, wallet & payments
- profile & verification
- service management

Rules:
- Do NOT answer user-side questions
- Use Markdown
- Be professional & precise
- If unrelated, reply EXACTLY:
"Sorry, I can answer only HelpHive related queries."
`
};

/* -------------------- ALLOWED SCOPE -------------------- */
const ALLOWED_KEYWORDS = [
  "booking", "book", "appointment",
  "provider", "shop", "property",
  "payment", "wallet", "refund",
  "cancel", "service", "category",
  "plumber", "electrician", "ac",
  "repair", "helphive", "status"
];

function textIsRelevant(text) {
  if (!text) return false;
  const t = text.toLowerCase();
  return ALLOWED_KEYWORDS.some(k => t.includes(k));
}

/* -------------------- INTENT DETECTION -------------------- */
function detectIntent(text) {
  const t = text.toLowerCase();

  if (t.includes("book")) return "BOOKING";
  if (t.includes("payment") || t.includes("refund")) return "PAYMENT";
  if (t.includes("cancel")) return "CANCELLATION";
  if (t.includes("provider") || t.includes("job")) return "PROVIDER";

  return "GENERAL";
}

/* -------------------- PREDEFINED ANSWERS -------------------- */
const PREDEFINED_BY_INTENT = {
  BOOKING: `
### How to book a service
1. Choose a category
2. Select a provider
3. Pick date & time
4. Confirm & pay

You're all set 👍
`,

  PAYMENT: `
### Payment help
- Check wallet balance
- Retry payment if failed
- Refunds are auto-processed

Need more help? Contact support.
`,

  CANCELLATION: `
### Cancel booking
1. Open My Appointments
2. Select booking
3. Click Cancel

Refund (if any) is auto-initiated.
`
};

/* -------------------- MEMORY HELPERS -------------------- */
async function loadMemory(ownerId, ownerRole) {
  const mem = await ChatMemory.findOne({ ownerId, ownerRole });
  return mem ? mem.messages : [];
}

function shouldSave(text) {
  return textIsRelevant(text) && text.length > 10;
}

async function saveToMemory(ownerId, ownerRole, msg) {
  return ChatMemory.findOneAndUpdate(
    { ownerId, ownerRole },
    {
      $push: { messages: { $each: [msg], $slice: -MEMORY_LIMIT } },
      $set: { updatedAt: new Date() }
    },
    { upsert: true, new: true }
  );
}

/* -------------------- HARD RESPONSE GUARD -------------------- */
function enforceScope(reply) {
  if (!textIsRelevant(reply)) {
    return "Sorry, I can answer only HelpHive related queries.";
  }
  return reply;
}

/* -------------------- MAIN CONTROLLER -------------------- */
export const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    const ownerId =
      req.user?.id ||
      req.provider?._id ||
      req.body.ownerId;

    const ownerRole =
      req.user ? "user" :
      req.provider ? "provider" :
      req.body.ownerRole || "user";

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        reply: "Empty message"
      });
    }

    if (ownerId && !checkCooldown(ownerId)) {
      return res.status(429).json({
        success: false,
        reply: "You're sending messages too fast. Please wait."
      });
    }

    /* -------- Scope Check (early reject) -------- */
    if (!textIsRelevant(message)) {
      return res.json({
        success: true,
        reply: "Sorry, I can answer only HelpHive related queries."
      });
    }

    const intent = detectIntent(message);

    /* -------- Quick predefined answers -------- */
    if (PREDEFINED_BY_INTENT[intent]) {
      if (ownerId) {
        await saveToMemory(ownerId, ownerRole, { role: "user", content: message });
        await saveToMemory(ownerId, ownerRole, {
          role: "assistant",
          content: PREDEFINED_BY_INTENT[intent]
        });
      }

      return res.json({
        success: true,
        reply: PREDEFINED_BY_INTENT[intent]
      });
    }

    /* -------- Load memory -------- */
    let memory = [];
    if (ownerId && mongoose.Types.ObjectId.isValid(ownerId)) {
      memory = await loadMemory(ownerId, ownerRole);
    }

    /* -------- Build prompt -------- */
    const messages = [
      {
        role: "system",
        content: SYSTEM_PROMPTS[ownerRole] + `\nCurrent intent: ${intent}`
      },
      ...memory.map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content
      })),
      { role: "user", content: message }
    ];

    if (ownerId && shouldSave(message)) {
      await saveToMemory(ownerId, ownerRole, {
        role: "user",
        content: message
      });
    }

    /* -------- Groq Call -------- */
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      max_tokens: 350
    });

    let reply =
      completion.choices?.[0]?.message?.content ||
      "Sorry, I couldn't answer that.";

    reply = enforceScope(reply);

    if (ownerId && shouldSave(reply)) {
      await saveToMemory(ownerId, ownerRole, {
        role: "assistant",
        content: reply
      });
    }

    return res.json({ success: true, reply });

  } catch (error) {
    console.error("AI Controller Error:", error);
    return res.status(500).json({
      success: false,
      reply: "AI service error"
    });
  }
};
