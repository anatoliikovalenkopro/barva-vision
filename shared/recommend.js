// Deterministic package recommendation (no AI needed) — used by the quiz and by the server.
import { PRICING } from "./siteData.js";

export const QUIZ = [
  {
    id: "guests", question: "How many guests are you expecting?", type: "single",
    options: [
      { value: "small", label: "Under 50", hint: "Intimate" },
      { value: "medium", label: "50–120", hint: "Classic" },
      { value: "large", label: "120+", hint: "Big celebration" },
    ],
  },
  {
    id: "coverage", question: "How much of the day would you like filmed?", type: "single",
    options: [
      { value: "ceremony", label: "The ceremony", hint: "Up to ~4 hours" },
      { value: "half", label: "Ceremony + reception", hint: "Up to ~8 hours" },
      { value: "full", label: "The full day", hint: "Getting ready to last dance" },
    ],
  },
  {
    id: "keep", question: "What would you love to keep?", type: "single",
    options: [
      { value: "highlight", label: "A short highlight film" },
      { value: "full", label: "Full ceremony & speeches" },
      { value: "both", label: "Both" },
    ],
  },
  {
    id: "extras", question: "Anything extra?", type: "multi",
    options: [
      { value: "drone", label: "Drone footage" },
      { value: "second", label: "A second filmmaker" },
    ],
  },
];

const ORDER = ["STARTER", "SIGNATURE", "PREMIUM"];

export function recommend(answers) {
  const reasons = [];
  let level = 0;

  if (answers.coverage === "half") { level = 1; reasons.push("You want the ceremony and reception covered, which needs a longer filming window."); }
  if (answers.coverage === "full") { level = 2; reasons.push("A full day from getting ready to the last dance fits our longest package."); }
  if (answers.coverage === "ceremony") reasons.push("Covering the ceremony fits comfortably in our shortest filming window.");

  if ((answers.keep === "full" || answers.keep === "both") && level < 1) {
    level = 1;
    reasons.push("Keeping the full ceremony and speeches means a package with full ceremony coverage.");
  }
  if (answers.guests === "large" && level < 1) {
    level = 1;
    reasons.push("With 120+ guests there is more happening, so a longer window helps.");
  }

  const tier = ORDER[level];
  const addons = [];
  const addonCat = PRICING.find((c) => c.id === "addons");
  const price = (name) => addonCat.tiers.find((t) => t.name === name)?.price;
  const extras = answers.extras || [];
  if (extras.includes("drone")) addons.push({ name: "Drone footage", price: price("DRONE FOOTAGE") });
  if (extras.includes("second") || (answers.guests === "large" && answers.coverage !== "ceremony")) {
    addons.push({ name: "Second filmmaker", price: price("SECOND FILMMAKER"), suggested: !extras.includes("second") });
    if (!extras.includes("second")) reasons.push("For a larger wedding, a second filmmaker adds a second angle (sold as an add-on).");
  }

  const t = PRICING.find((c) => c.id === "wedding-films").tiers[level];
  return { tier, tierData: t, addons, reasons };
}
