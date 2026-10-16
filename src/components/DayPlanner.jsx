import { useState } from "react";
import { post } from "../api.js";
import ModeNote from "./ModeNote.jsx";

const VENUES = ["Church or chapel", "Garden or outdoor", "Banquet hall", "Hotel or resort", "Barn or rustic venue", "Mountain or lake"];

export default function DayPlanner({ onPrefill }) {
  const [form, setForm] = useState({
    gettingReady: "12:00",
    ceremonyTime: "15:00",
    receptionEnd: "22:00",
    venueType: VENUES[1],
    guests: "",
    firstLook: "no",
    notes: "",
  });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      setPlan(await post("/api/planner", form));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const asText = () =>
    plan.timeline.map((t) => `${t.time} — ${t.title}: ${t.filming_notes}`).join("\n");

  if (plan) {
    return (
      <div>
        <div className="plan-head">
          <h3>Your wedding-day filming plan</h3>
          <p>A starting point — we'll refine it together.</p>
        </div>
        <div className="plan-cols">
          <ol className="timeline">
            {plan.timeline.map((t, i) => (
              <li className="tl-item" key={i}>
                <div className="tl-time">{t.time}</div>
                <div className="tl-title">{t.title}</div>
                <div className="tl-notes">{t.filming_notes}</div>
              </li>
            ))}
          </ol>
          <div>
            <div className="sub-h">Shot list</div>
            {plan.shot_list.map((s, i) => (
              <div className="shot" key={i}><b>{s.moment}</b>{s.shot}</div>
            ))}
            {plan.tips?.length > 0 && (
              <ul className="tips">{plan.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
            )}
          </div>
        </div>
        <div className="result-actions">
          <button
            className="btn"
            onClick={() => {
              onPrefill(`Here is my draft wedding-day timeline:\n${asText()}`);
              location.hash = "#contact";
            }}
          >
            Send this plan to the studio
          </button>
          <button
            className="btn btn-ghost"
            onClick={async () => {
              await navigator.clipboard?.writeText(asText());
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
          >
            {copied ? "Copied" : "Copy plan"}
          </button>
          <button className="btn btn-ghost" onClick={() => setPlan(null)}>Change details</button>
        </div>
        <ModeNote mode={plan.mode} />
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="plan-head">
        <h3>Wedding-day planner</h3>
        <p>Tell us how your day runs and we'll draft a filming timeline and shot list.</p>
      </div>
      <div className="form-grid">
        <label className="field"><span>GETTING READY STARTS</span><input type="time" value={form.gettingReady} onChange={set("gettingReady")} /></label>
        <label className="field"><span>CEREMONY TIME</span><input type="time" required value={form.ceremonyTime} onChange={set("ceremonyTime")} /></label>
        <label className="field"><span>RECEPTION ENDS</span><input type="time" value={form.receptionEnd} onChange={set("receptionEnd")} /></label>
      </div>
      <div className="form-grid">
        <label className="field">
          <span>VENUE TYPE</span>
          <select value={form.venueType} onChange={set("venueType")}>{VENUES.map((v) => <option key={v}>{v}</option>)}</select>
        </label>
        <label className="field"><span>APPROX. GUESTS</span><input type="number" min="1" max="1000" value={form.guests} onChange={set("guests")} placeholder="80" /></label>
        <label className="field">
          <span>FIRST LOOK?</span>
          <select value={form.firstLook} onChange={set("firstLook")}><option value="no">No, see each other at the ceremony</option><option value="yes">Yes, a first look</option></select>
        </label>
      </div>
      <label className="field"><span>MUST-HAVE MOMENTS (OPTIONAL)</span><textarea rows="3" value={form.notes} onChange={set("notes")} placeholder="A grandmother's blessing, a surprise dance, sparklers…" /></label>
      <div className="quiz-actions">
        <button className="btn" disabled={loading}>{loading ? <><span className="spinner" />Planning…</> : "Plan my day"}</button>
      </div>
      {error && <p className="err">{error}</p>}
    </form>
  );
}
