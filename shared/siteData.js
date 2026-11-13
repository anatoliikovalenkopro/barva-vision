// Single source of truth for the site AND the AI assistant (both import this file).

export const CONTACT = {
  email: "hello@barvavision.com",
  phone: "", // add your number here, e.g. "+1 780 000 0000" — the Phone line appears automatically
  instagram: "@barvavision",
  instagramUrl: "https://www.instagram.com/barvavision",
  base: "Alberta",
  reach: "Across Canada",
};

// Wedding launch offer — edit spotsLeft as couples book.
export const BOOKING = { year: 2027, totalSpots: 5, spotsLeft: 5 };

// Your films. id = the YouTube video id (the part after "v=" in the link).
// cat should be one of: "Music Video", "Concert", "Event", "Wedding Film"
export const FILMS = [
  { id: "8cBDGLc0bW0", artist: "Mallory Chipman", song: "Mythic Time", cat: "Music Video" },
  { id: "bYtKVmn1HDw", artist: "Mikayla Bortscher", song: "In the Dark", cat: "Music Video" },
  { id: "h5iX21z1sXI", artist: "Marissa K", song: "Bird Flew Over The Water", cat: "Music Video" },
];

// Photos come from src/photo/<gallery>/ — run `npm run photos` after adding some.
export { PHOTOS } from "./photos.js";

// Unique artist names, used for the "Worked with" credits.
export const artistsOf = (films) => [...new Set(films.map((f) => f.artist).filter(Boolean))];

export const SERVICES = [
  { icon: "note", title: "Music Video", text: "From concept to final cut — performance, story or visual-led videos that look as good as your track sounds. Shot on cinema cameras, delivered in 4K." },
  { icon: "stage", title: "Live Shows", text: "Multi-angle coverage of your set with clean audio sync — a full live video, highlight cuts and moments for socials." },
  { icon: "spark", title: "Events", text: "Launches, festivals, private parties and corporate nights — the energy of the room, told as a short cinematic film." },
  { icon: "heart", title: "Wedding Films", text: "Your day told as a cinematic film — getting ready, vows, first dance and the quiet moments in between." },
  { icon: "camera", title: "Cinematic Edit & Colour", text: "Professional editing and colour grading, so every project has its own look — moody, bright, warm or raw." },
  { icon: "drone", title: "Drone Footage", text: "Sweeping aerial shots of the venue, stage or landscape — the big picture behind your story." },
];

// Home "Featured work" cards. Drop photos into public/images/ with these names
// (any landscape JPG works). Add a YouTube id as `yt` to make the card play a video.
export const FEATURED = [
  { title: "Live Show", cat: "Concert", img: "/images/work-1.jpg", tone: "concert", yt: "" },
  { title: "Wedding Film", cat: "Wedding", img: "/images/work-2.jpg", tone: "wedding", yt: "" },
  { title: "Music Video", cat: "Music Video", img: "/images/work-3.jpg", tone: "music", yt: "" },
  { title: "Alberta", cat: "Event", img: "/images/work-4.jpg", tone: "landscape", yt: "" },
];

// Menu / pages.
export const PAGES = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/music-videos", label: "Music Video" },
  { path: "/live-shows", label: "Live Shows" },
  { path: "/events", label: "Events" },
  { path: "/weddings", label: "Weddings" },
  { path: "/prices", label: "Pricing" },
  { path: "/contact", label: "About & Contact" },
];

// Services shown on the Weddings page.
export const WEDDING_SERVICES = [
  { icon: "film", title: "Wedding Highlight Film", text: "Your day told as a cinematic film — getting ready, vows, first dance and the quiet moments in between. Delivered in 4K." },
  { icon: "mic", title: "Ceremony & Speeches", text: "Full ceremony and speeches captured with care, so you can relive every word, laugh and tear long after the day." },
  { icon: "camera", title: "Cinematic Edit & Colour", text: "Professional colour grading and licensed music, so your film feels like a story — soft, warm and true to the day." },
  { icon: "drone", title: "Drone Footage", text: "Sweeping aerial shots of your venue, grounds and landscape — the big picture behind your story." },
  { icon: "people", title: "Second Filmmaker", text: "A second angle for larger weddings, so nothing is missed — the ceremony, the guests, the reactions." },
];

// `price` is the regular rate (crossed out); `early` is the special / launch rate shown instead.
// `from: true` adds a small "from" label in front of the price.
export const PRICING = [
  {
    id: "music-videos", tab: "Music Video", title: "Music Video",
    tiers: [
      { name: "MUSIC VIDEO", from: true, price: "C$500", early: "C$400", desc: "Every song is different — tell us your idea and we'll tailor the quote.", feats: ["Concept & planning chat", "Cinema-camera shoot", "Editing & colour grading", "4K delivery", "Vertical cuts for socials on request"] },
    ],
  },
  {
    id: "live-shows", tab: "Live Shows", title: "Live Shows",
    tiers: [
      { name: "LIVE PERFORMANCE", from: true, price: "C$500", early: "C$250", desc: "Final price depends on set length, venue and number of cameras.", feats: ["Multi-angle filming", "Audio sync with your board mix", "Full set and/or highlight film", "Colour grading", "4K delivery"] },
    ],
  },
  {
    id: "events", tab: "Events", title: "Events",
    tiers: [
      { name: "EVENT FILM", price: "C$250/hr", early: "C$200/hr", desc: "Hourly coverage — tell us how long your event runs.", feats: ["Hourly coverage", "Cinematic highlight film", "Colour grading & licensed music", "4K delivery"] },
    ],
  },
  {
    id: "photography", tab: "Photography", title: "Photography",
    tiers: [
      { name: "PHOTOGRAPHY", price: "C$150/hr", desc: "Concerts, portraits, weddings and events — all one simple hourly rate.", feats: ["Concert & live photography", "Portraits & artist photos", "Wedding photography", "Event photography", "Colour-edited, high-resolution photos"] },
    ],
  },
  {
    id: "wedding-films", tab: "Weddings", title: "Wedding Films", badge: "2027 launch rates — first 5 weddings",
    tiers: [
      { name: "STARTER", price: "C$1,000", early: "C$400", desc: "4K delivery, up to 1.5 hour film.", feats: ["Up to 4 hours", "One filmmaker", "3–4 min highlight film", "Licensed music", "4K delivery"] },
      { name: "SIGNATURE", price: "C$2,000", early: "C$800", desc: "4K delivery, up to 2.5 hour film.", popular: true, feats: ["Up to 8 hours", "One filmmaker", "Full ceremony coverage", "4–5 min highlight film", "4K delivery"] },
      { name: "PREMIUM", price: "C$2,500", early: "C$1,200", feats: ["Up to 10 hours", "One filmmaker", "Ceremony + speeches", "5–6 min highlight film", "4K delivery"] },
    ],
  },
  {
    id: "addons", tab: "Wedding add-ons", title: "Wedding add-ons",
    tiers: [
      { name: "DRONE FOOTAGE", price: "C$250", feats: [] },
      { name: "ADDITIONAL FILMING HOUR", price: "C$150/hr", feats: [] },
      { name: "SECOND FILMMAKER", price: "from C$250", feats: [] },
    ],
  },
];

// Plain-text summary of the offer, used in the AI assistant's instructions.
export function offerAsText() {
  const find = (id) => PRICING.find((c) => c.id === id);
  const wf = find("wedding-films");
  const lines = [];
  lines.push(`Studio: Barva Vision — video production: music videos, live shows (concerts, gigs, festivals), events and weddings, plus concert and artist photography. Most clients are musicians and artists. Based in ${CONTACT.base}, available ${CONTACT.reach.replace(/^Across/, "across")}.`);
  for (const id of ["music-videos", "live-shows", "events", "photography"]) {
    const c = find(id);
    const t = c.tiers[0];
    const fr = t.from ? "from " : "";
    const price = t.early ? `special price ${fr}${t.early} (regular ${fr}${t.price})` : `${fr}${t.price}`;
    lines.push(`${c.title}: ${price}. ${t.desc} Includes: ${t.feats.join(", ")}.`);
  }
  lines.push(`Weddings: now booking ${BOOKING.year}. The first ${BOOKING.totalSpots} weddings get special launch rates (${BOOKING.spotsLeft} of ${BOOKING.totalSpots} launch spots currently available).`);
  lines.push("Wedding Film packages (launch rate, regular price in brackets):");
  for (const t of wf.tiers) {
    lines.push(`- ${t.name}: ${t.early} (regular ${t.price}). ${t.desc ? t.desc + " " : ""}Includes: ${t.feats.join(", ")}.`);
  }
  lines.push("Wedding add-ons: " + find("addons").tiers.map((t) => `${t.name} ${t.price}`).join("; ") + ".");
  lines.push("Services: " + SERVICES.map((s) => s.title).join("; ") + ".");
  lines.push("Process: 1) say hello with your idea, date and location, 2) a relaxed planning chat, 3) the shoot, 4) edited, colour-graded 4K film delivered.");
  lines.push(`Contact: ${CONTACT.email}.`);
  return lines.join("\n");
}
