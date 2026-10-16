import "dotenv/config";
import express from "express";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { recommend } from "../shared/recommend.js";
import { rateLimit } from "./limits.js";
import { addEnquiry, updateEnquiry, listEnquiries } from "./store.js";
import { emailOwner, mailEnabled } from "./mailer.js";
import { aiEnabled, canUseAi, chatReply, packageNote, dayPlan, vibeMatch, analyseEnquiry } from "./ai.js";
import { demoChat, demoNote, demoPlan, demoVibe, demoAnalysis } from "../shared/offline.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, "..", "dist");

const app = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});
app.use(express.json({ limit: "50kb" }));

const aiLimit = rateLimit({ name: "ai", windowMs: 10 * 60_000, max: 40 });
const formLimit = rateLimit({ name: "form", windowMs: 60 * 60_000, max: 8 });

const clip = (v, n) => String(v ?? "").trim().slice(0, n);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Runs the AI path when available; otherwise (or on any failure) the demo fallback. */
async function withFallback(aiFn, demoFn) {
  if (canUseAi()) {
    try {
      return { data: await aiFn(), mode: "ai" };
    } catch (err) {
      console.error("[ai] falling back:", err?.status || "", err?.message || err);
    }
  }
  return { data: await demoFn(), mode: "demo" };
}

// ---------------------------------------------------------------- enquiries

function cleanEnquiry(body) {
  const e = {
    names: clip(body.names, 120),
    email: clip(body.email, 160),
    date: clip(body.date, 60),
    venue: clip(body.venue, 160),
    service: clip(body.service, 80),
    message: clip(body.message, 3000),
  };
  if (!e.names) throw Object.assign(new Error("Please add your names."), { status: 400 });
  if (!EMAIL_RE.test(e.email)) throw Object.assign(new Error("Please enter a valid email address."), { status: 400 });
  return e;
}

/** Save, then analyse + email in the background so the visitor gets an instant reply. */
function processEnquiry(clean, source) {
  const record = addEnquiry(clean, source);
  (async () => {
    const { data } = await withFallback(() => analyseEnquiry(clean), () => demoAnalysis(clean));
    const updated = updateEnquiry(record.id, { analysis: data });
    try {
      const sent = await emailOwner(updated || { ...record, analysis: data });
      if (!sent) console.log(`[enquiry] saved (${record.id}); email not configured`);
    } catch (err) {
      console.error("[enquiry] email failed:", err.message);
    }
  })();
  return record;
}

app.post("/api/enquiry", formLimit, (req, res) => {
  try {
    const clean = cleanEnquiry(req.body || {});
    processEnquiry(clean, "contact form");
    res.json({ ok: true });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------- chat

app.post("/api/chat", aiLimit, async (req, res) => {
  const raw = Array.isArray(req.body?.messages) ? req.body.messages.slice(-12) : [];
  const history = raw
    .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .map((m) => ({ role: m.role, content: clip(m.content, 1000) }));
  while (history.length && history[0].role !== "user") history.shift();
  if (!history.length || history[history.length - 1].role !== "user") {
    return res.status(400).json({ error: "Send a message first." });
  }

  const { data, mode } = await withFallback(
    () =>
      chatReply(history, async (lead) => {
        const clean = cleanEnquiry({
          names: lead.names,
          email: lead.email,
          date: lead.wedding_date,
          venue: lead.venue,
          service: "Wedding Film",
          message: lead.notes,
        });
        processEnquiry(clean, "chat assistant");
        return "Enquiry sent to the team. Tell the visitor someone will reply personally by email.";
      }),
    () => ({ reply: demoChat(history[history.length - 1].content), leadSent: false }),
  );
  res.json({ reply: data.reply, leadSent: data.leadSent, mode });
});

// ---------------------------------------------------------------- quiz note

app.post("/api/recommend", aiLimit, async (req, res) => {
  const answers = {
    guests: clip(req.body?.answers?.guests, 20),
    coverage: clip(req.body?.answers?.coverage, 20),
    keep: clip(req.body?.answers?.keep, 20),
    extras: Array.isArray(req.body?.answers?.extras) ? req.body.answers.extras.slice(0, 4).map((x) => clip(x, 20)) : [],
  };
  const rec = recommend(answers);
  const { data, mode } = await withFallback(() => packageNote(answers, rec), () => demoNote(rec));
  res.json({ note: data, mode });
});

// ---------------------------------------------------------------- planner

app.post("/api/planner", aiLimit, async (req, res) => {
  const b = req.body || {};
  const input = {
    ceremonyTime: clip(b.ceremonyTime, 8),
    gettingReady: clip(b.gettingReady, 8),
    receptionEnd: clip(b.receptionEnd, 8),
    venueType: clip(b.venueType, 40),
    guests: clip(b.guests, 8),
    firstLook: b.firstLook === "yes" ? "yes" : "no",
    notes: clip(b.notes, 600),
  };
  if (!/^\d{1,2}:\d{2}$/.test(input.ceremonyTime)) return res.status(400).json({ error: "Please add your ceremony time." });
  const { data, mode } = await withFallback(() => dayPlan(input), () => demoPlan(input));
  res.json({ ...data, mode });
});

// ---------------------------------------------------------------- vibe

app.post("/api/vibe", aiLimit, async (req, res) => {
  const text = clip(req.body?.text, 500);
  if (text.length < 3) return res.status(400).json({ error: "Describe your wedding style in a few words." });
  const { data, mode } = await withFallback(() => vibeMatch(text), () => demoVibe(text));
  const palette = (data.palette || [])
    .filter((c) => /^#[0-9a-fA-F]{6}$/.test(c.hex))
    .slice(0, 5);
  res.json({ ...data, palette, mode });
});

// ---------------------------------------------------------------- admin + health

function isAdmin(req) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return null;
  const given = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(given);
  const b = Buffer.from(token);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

app.get("/api/admin/enquiries", (req, res) => {
  const ok = isAdmin(req);
  if (ok === null) return res.status(503).json({ error: "Admin page is disabled. Set ADMIN_TOKEN in .env." });
  if (!ok) return res.status(401).json({ error: "Wrong token." });
  res.json({ enquiries: listEnquiries() });
});

app.get("/api/health", (_req, res) => res.json({ ok: true, ai: aiEnabled(), email: mailEnabled() }));

// ---------------------------------------------------------------- static (production)

if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get(/^\/(?!api\/).*/, (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

const port = Number(process.env.API_PORT || process.env.PORT || 8787);
app.listen(port, () => {
  console.log(`Barva Vision API on http://localhost:${port}`);
  console.log(`  AI: ${aiEnabled() ? "on (" + (process.env.ANTHROPIC_MODEL || "claude-opus-5-5") + ")" : "demo mode (no ANTHROPIC_API_KEY)"}`);
  console.log(`  Email: ${mailEnabled() ? "on" : "off (enquiries saved to server/data and visible at /#admin)"}`);
});
