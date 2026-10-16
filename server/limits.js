// Tiny in-memory protections: per-IP rate limit + a daily cap on paid AI calls.

const hits = new Map();

export function rateLimit({ name, windowMs, max }) {
  return (req, res, next) => {
    const key = `${name}:${req.ip}`;
    const now = Date.now();
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      res.setHeader("Retry-After", Math.ceil(windowMs / 1000));
      return res.status(429).json({ error: "Too many requests — please try again in a little while." });
    }
    recent.push(now);
    hits.set(key, recent);
    next();
  };
}

setInterval(() => {
  const now = Date.now();
  for (const [k, v] of hits) if (!v.some((t) => now - t < 3_600_000)) hits.delete(k);
}, 600_000).unref();

let day = new Date().toDateString();
let calls = 0;

export function withinDailyBudget() {
  const today = new Date().toDateString();
  if (today !== day) { day = today; calls = 0; }
  return calls < Number(process.env.DAILY_AI_CALL_LIMIT || 300);
}

export function countAiCall() {
  calls += 1;
}
