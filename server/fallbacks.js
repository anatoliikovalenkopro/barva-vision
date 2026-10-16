// Rule-based answers used when there is no API key, the daily cap is hit, or the AI call fails.
import { PRICING, BOOKING, CONTACT } from "../shared/siteData.js";

const wf = PRICING.find((c) => c.id === "wedding-films");
const addons = PRICING.find((c) => c.id === "addons");

export function demoChat(text) {
  const t = text.toLowerCase();
  if (/(price|cost|how much|package|rate|\$)/.test(t)) {
    return `Our ${BOOKING.year} wedding film launch rates (first ${BOOKING.totalSpots} weddings): ` +
      wf.tiers.map((x) => `${x.name} ${x.early} (regular ${x.price})`).join(", ") +
      `. A small Love Story Walk film is ${PRICING.find((c) => c.id === "love-story").tiers[0].price}. Add-ons: ` +
      addons.tiers.map((x) => `${x.name.toLowerCase()} ${x.price}`).join(", ") + ".";
  }
  if (/(drone|second|shooter|filmmaker)/.test(t)) {
    return "Drone footage is " + addons.tiers[0].price + " and a second filmmaker starts from " + addons.tiers[2].price.replace("from ", "") + ".";
  }
  if (/(canada|travel|where|alberta|location|destination)/.test(t)) {
    return `We're based in ${CONTACT.base} and available ${CONTACT.reach.replace(/^Across/, "across")}. Share your venue and we'll confirm the details.`;
  }
  if (/(available|availability|date|book|free)/.test(t)) {
    return `We're booking ${BOOKING.year} weddings. Send your date and names through the contact form below and we'll check availability and reply personally.`;
  }
  if (/(hi|hello|hey)\b/.test(t)) {
    return "Hello! I can tell you about our wedding film packages, the 2027 launch rates, and how it works. What would you like to know?";
  }
  return `I'd love to help — I can talk about packages, pricing, add-ons or booking. For anything specific, leave your details in the contact form and we'll reply personally (${CONTACT.email}).`;
}

export function demoNote(rec) {
  return `Based on your answers, ${rec.tier} looks like the best fit. Tell us about your day in the contact form and we'll confirm everything personally.`;
}

const HHMM = (m) => {
  const h = Math.floor(((m % 1440) + 1440) % 1440 / 60);
  const mm = ((m % 60) + 60) % 60;
  const ap = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, "0")} ${ap}`;
};
const toMin = (s, d) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec(s || "");
  return m ? Number(m[1]) * 60 + Number(m[2]) : d;
};

export function demoPlan(i) {
  const ceremony = toMin(i.ceremonyTime, 15 * 60);
  const ready = toMin(i.gettingReady, ceremony - 180);
  const end = toMin(i.receptionEnd, ceremony + 360);
  const timeline = [
    { time: HHMM(ready), title: "Getting ready", filming_notes: "Details first — rings, dress, shoes, invitations — then candid moments with family and friends." },
    { time: HHMM(ceremony - 90), title: i.firstLook === "yes" ? "First look" : "Final touches & portraits", filming_notes: "Quiet, natural light, a few minutes alone." },
    { time: HHMM(ceremony - 20), title: "Guests arrive", filming_notes: `Wide shots of the venue (${(i.venueType || "venue").toLowerCase()}) and guest reactions.` },
    { time: HHMM(ceremony), title: "Ceremony", filming_notes: "Entrance, vows, rings and the first kiss, with clean audio of the vows." },
    { time: HHMM(ceremony + 60), title: "Couple portraits", filming_notes: "Golden-hour style cinematic portraits, relaxed and unhurried." },
    { time: HHMM(ceremony + 120), title: "Reception & speeches", filming_notes: "Entrance, toasts, reactions, details of the room." },
    { time: HHMM(Math.max(end - 60, ceremony + 150)), title: "First dance", filming_notes: "A slow, close, emotional coverage." },
    { time: HHMM(end), title: "Grand finale", filming_notes: "Sparkler exit or last dance to close the film." },
  ];
  return {
    timeline,
    shot_list: [
      { moment: "Details", shot: "Rings, dress, flowers, invitations in soft light" },
      { moment: "Ceremony", shot: "Close-up of vows and wide of the whole room" },
      { moment: "Family", shot: "Parents' reactions during the vows" },
      { moment: "Couple", shot: "Walking shots, hands, laughs between takes" },
      { moment: "Reception", shot: "Toasts and the first dance from two angles" },
    ],
    tips: [
      "Leave 20–30 minutes of buffer around the ceremony so nothing feels rushed.",
      "Share your must-have moments with us ahead of time.",
      "Natural light is best around golden hour — we can plan portraits for it.",
    ],
  };
}

const PALETTES = [
  { keys: ["garden", "outdoor", "green", "forest", "boho", "natural", "wild"], name: "Garden Morning", palette: [["Sage", "#b9cdb5"], ["Ivory", "#fffaf5"], ["Blush", "#f2d3cd"], ["Fern", "#7c9a78"], ["Honey", "#d9b98a"]], style: "Soft natural light, slow handheld movement, airy and warm." },
  { keys: ["beach", "sea", "ocean", "lake", "water", "coast"], name: "Quiet Shoreline", palette: [["Mist", "#dce9ee"], ["Sand", "#ecdcc4"], ["Sky", "#bcd3e0"], ["Driftwood", "#a89580"], ["Sea Glass", "#a9cdbf"]], style: "Wide, breathing frames, gentle colour, ocean-light glow." },
  { keys: ["modern", "minimal", "city", "elegant", "classic", "black", "luxury"], name: "Soft Editorial", palette: [["Cream", "#fdf8f3"], ["Stone", "#d8d0c8"], ["Charcoal", "#4b3b3b"], ["Champagne", "#e6d2b5"], ["Rose", "#e8b9b3"]], style: "Clean composition, graceful slow motion, timeless contrast." },
  { keys: ["golden", "sunset", "warm", "rustic", "barn", "autumn", "fall"], name: "Golden Hour", palette: [["Amber", "#e3b778"], ["Cream", "#fbf1e1"], ["Terracotta", "#c98f6f"], ["Olive", "#98a07a"], ["Rose", "#e4b7ae"]], style: "Glowing backlight, warm grade, intimate close-ups." },
];

export function demoVibe(text) {
  const t = text.toLowerCase();
  const p = PALETTES.find((x) => x.keys.some((k) => t.includes(k))) || PALETTES[0];
  return {
    mood_name: p.name,
    description: `A film mood inspired by your words: "${text.slice(0, 80)}". Calm, honest and full of colour.`,
    palette: p.palette.map(([name, hex]) => ({ name, hex })),
    film_style: p.style,
    music_feel: "Gentle acoustic or soft piano that builds slowly toward the vows.",
    shot_ideas: ["Slow push-in on the first look", "Hands and rings in soft light", "Wide of the venue at golden hour"],
  };
}

export function demoAnalysis(e) {
  return {
    summary: `${e.names} enquired${e.date ? ` about ${e.date}` : ""}${e.venue ? ` at ${e.venue}` : ""}.`,
    priority: e.date ? "warm" : "cold",
    suggested_package: "SIGNATURE (confirm after a chat)",
    questions_to_ask: ["How many guests?", "How much of the day do you want filmed?", "Any must-have moments?"],
    draft_reply: `Hi ${e.names},\n\nThank you so much for reaching out — we'd love to hear more about your day${e.date ? ` on ${e.date}` : ""}. Could you tell us a little about your venue, guest count and the moments that matter most to you? Then we'll confirm availability and the best package.\n\nWarmly,\nBarva Vision`,
  };
}
