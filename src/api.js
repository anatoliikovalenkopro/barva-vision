import { CONTACT } from "../shared/siteData.js";
import { recommend } from "../shared/recommend.js";
import { demoChat, demoNote, demoPlan, demoVibe } from "../shared/offline.js";

// Static mode (default): everything runs in the browser and the contact form goes to a form service.
// Server mode: build with VITE_API=server to talk to the Express API (needed for real AI).
const SERVER = import.meta.env.VITE_API === "server";
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const fail = (message) => Object.assign(new Error(message), { status: 400 });
const clip = (v, n) => String(v ?? "").trim().slice(0, n);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function serverPost(path, body) {
  let res;
  try {
    res = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  } catch {
    throw new Error("Can't reach the server right now. Please try again shortly.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}

async function sendEnquiry(body) {
  const e = {
    names: clip(body.names, 120),
    email: clip(body.email, 160),
    date: clip(body.date, 60),
    venue: clip(body.venue, 160),
    service: clip(body.service, 80),
    message: clip(body.message, 3000),
  };
  if (!e.names) throw fail("Please add your names.");
  if (!EMAIL_RE.test(e.email)) throw fail("Please enter a valid email address.");

  if (FORM_ENDPOINT) {
    let res;
    try {
      res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...e, _subject: `New wedding enquiry — ${e.names}`, _replyto: e.email }),
      });
    } catch {
      throw new Error("Can't send right now. Please try again shortly.");
    }
    if (!res.ok) throw new Error("Could not send your enquiry. Please email us directly.");
    return { ok: true };
  }

  // No form service configured yet: open the visitor's email app instead.
  const text = [
    `Names: ${e.names}`, `Email: ${e.email}`, `Wedding date: ${e.date || "—"}`,
    `Venue / city: ${e.venue || "—"}`, `Interested in: ${e.service || "—"}`, "", e.message,
  ].join("\n");
  location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Wedding enquiry — " + e.names)}&body=${encodeURIComponent(text)}`;
  return { ok: true, via: "mailto" };
}

const local = {
  async "/api/chat"(body) {
    const last = [...(body.messages || [])].reverse().find((m) => m.role === "user");
    await wait(450);
    return { reply: demoChat(clip(last?.content, 1000)), leadSent: false, mode: "demo" };
  },
  async "/api/recommend"(body) {
    await wait(300);
    return { note: demoNote(recommend(body.answers || {})), mode: "demo" };
  },
  async "/api/planner"(body) {
    if (!/^\d{1,2}:\d{2}$/.test(body.ceremonyTime || "")) throw fail("Please add your ceremony time.");
    await wait(500);
    return { ...demoPlan(body), mode: "demo" };
  },
  async "/api/vibe"(body) {
    const text = clip(body.text, 500);
    if (text.length < 3) throw fail("Describe your wedding style in a few words.");
    await wait(500);
    return { ...demoVibe(text), mode: "demo" };
  },
  "/api/enquiry": sendEnquiry,
};

export async function post(path, body) {
  if (SERVER) return serverPost(path, body);
  return local[path](body);
}

export const isServerMode = SERVER;
