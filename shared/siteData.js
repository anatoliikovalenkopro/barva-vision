// Single source of truth for the site AND the AI assistant (both import this file).

export const CONTACT = {
  email: "hello@barvavision.com",
  phone: "", // add your number here, e.g. "+1 780 000 0000" — the Phone line appears automatically
  instagram: "@barvavision",
  instagramUrl: "https://www.instagram.com/barvavision",
  base: "Alberta",
  reach: "Across Canada",
};

// Booking poster config — edit spotsLeft as couples book.
export const BOOKING = { year: 2027, totalSpots: 5, spotsLeft: 5 };

// Add wedding films here: { id: "<YouTube video id>", title: "ANNA & MICHAEL", cat: "Wedding Film", year: "'27" }
export const FILMS = [];

export const SERVICES = [
  { icon: "film", title: "Wedding Highlight Film", text: "Your day told as a cinematic film — getting ready, vows, first dance and the quiet moments in between. Delivered in 4K." },
  { icon: "mic", title: "Ceremony & Speeches", text: "Full ceremony and speeches captured with care, so you can relive every word, laugh and tear long after the day." },
  { icon: "camera", title: "Cinematic Edit & Colour", text: "Professional colour grading and licensed music, so your film feels like a story — soft, warm and true to the day." },
  { icon: "drone", title: "Drone Footage", text: "Sweeping aerial shots of your venue, grounds and landscape — the big picture behind your story." },
  { icon: "people", title: "Second Filmmaker", text: "A second angle for larger weddings, so nothing is missed — the ceremony, the guests, the reactions." },
  { icon: "heart", title: "Love Story Walk", text: "A short, relaxed film of the two of you on a walk — no script, just laughs and golden light. A lovely first step before the wedding, or a keepsake on its own." },
];

// `price` is the regular rate (crossed out); `early` is the 2027 launch rate for the first weddings.
export const PRICING = [
  {
    id: "wedding-films", tab: "Wedding Films", title: "Wedding Films", badge: "2027 launch rates — first 5 weddings",
    tiers: [
      { name: "STARTER", price: "C$1,000", early: "C$400", desc: "4K delivery, up to 1.5 hour film.", feats: ["Up to 4 hours", "One filmmaker", "3–4 min highlight film", "Licensed music", "4K delivery"] },
      { name: "SIGNATURE", price: "C$2,000", early: "C$800", desc: "4K delivery, up to 2.5 hour film.", popular: true, feats: ["Up to 8 hours", "One filmmaker", "Full ceremony coverage", "4–5 min highlight film", "4K delivery"] },
      { name: "PREMIUM", price: "C$2,500", early: "C$1,200", feats: ["Up to 10 hours", "One filmmaker", "Ceremony + speeches", "5–6 min highlight film", "4K delivery"] },
    ],
  },
  {
    id: "love-story", tab: "Love Story Walk", title: "Love Story Walk",
    tiers: [
      { name: "LOVE STORY WALK", price: "C$250", desc: "A short, relaxed film of the two of you on a walk.", feats: ["About 1 hour together", "One location", "1–2 min cinematic film", "Colour grading", "4K delivery"] },
    ],
  },
  {
    id: "addons", tab: "Add-ons", title: "Add-ons",
    tiers: [
      { name: "DRONE FOOTAGE", price: "C$250", feats: [] },
      { name: "ADDITIONAL FILMING HOUR", price: "C$150/hr", feats: [] },
      { name: "SECOND FILMMAKER", price: "from C$250", feats: [] },
    ],
  },
];

// Plain-text summary of the offer, used in the AI assistant's instructions.
export function offerAsText() {
  const wf = PRICING.find((c) => c.id === "wedding-films");
  const addons = PRICING.find((c) => c.id === "addons");
  const lines = [];
  lines.push(`Studio: Barva Vision — wedding videography only. Based in ${CONTACT.base}, available ${CONTACT.reach.replace(/^Across/, "across")}.`);
  lines.push(`Now booking ${BOOKING.year} weddings. The first ${BOOKING.totalSpots} weddings get special launch rates (${BOOKING.spotsLeft} of ${BOOKING.totalSpots} launch spots currently available).`);
  lines.push("Wedding Film packages (launch rate, regular price in brackets):");
  for (const t of wf.tiers) {
    lines.push(`- ${t.name}: ${t.early} (regular ${t.price}). ${t.desc ? t.desc + " " : ""}Includes: ${t.feats.join(", ")}.`);
  }
  const love = PRICING.find((c) => c.id === "love-story").tiers[0];
  lines.push(`Love Story Walk (a small, affordable short film of the couple on a walk, a good first step before the wedding): ${love.price}. Includes: ${love.feats.join(", ")}.`);
  lines.push("Add-ons: " + addons.tiers.map((t) => `${t.name} ${t.price}`).join("; ") + ".");
  lines.push("Services: " + SERVICES.map((s) => s.title).join("; ") + ".");
  lines.push("Process: 1) say hello with your date, 2) a relaxed planning chat, 3) we film quietly on the wedding day, 4) colour-graded 4K film delivered.");
  lines.push(`Contact: ${CONTACT.email}.`);
  return lines.join("\n");
}
