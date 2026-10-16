import { useState } from "react";
import { QUIZ, recommend } from "../../shared/recommend.js";
import { BOOKING } from "../../shared/siteData.js";
import { post } from "../api.js";
import ModeNote from "./ModeNote.jsx";

export default function PackageFinder({ onPrefill }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ extras: [] });
  const [result, setResult] = useState(null);
  const [note, setNote] = useState(null);
  const [mode, setMode] = useState(null);
  const [loading, setLoading] = useState(false);

  const q = QUIZ[step];

  const finish = async (finalAnswers) => {
    const rec = recommend(finalAnswers);
    setResult(rec);
    setNote(null);
    setLoading(true);
    try {
      const data = await post("/api/recommend", { answers: finalAnswers });
      setNote(data.note);
      setMode(data.mode);
    } catch {
      setNote(null);
    } finally {
      setLoading(false);
    }
  };

  const next = (updated) => {
    if (step + 1 >= QUIZ.length) finish(updated);
    else setStep(step + 1);
  };

  const pick = (value) => {
    const updated = { ...answers, [q.id]: value };
    setAnswers(updated);
    next(updated);
  };

  const toggle = (value) => {
    const has = answers.extras.includes(value);
    setAnswers({ ...answers, extras: has ? answers.extras.filter((v) => v !== value) : [...answers.extras, value] });
  };

  const restart = () => {
    setStep(0);
    setAnswers({ extras: [] });
    setResult(null);
    setNote(null);
  };

  if (result) {
    const t = result.tierData;
    return (
      <div className="result">
        <div className="plan-head">
          <h3>Your best fit</h3>
          <p>Based on what you told us.</p>
        </div>
        <div className="result-tier">
          <span className="name">{result.tier}</span>
          <span className="price">{BOOKING.spotsLeft > 0 ? t.early : t.price}</span>
          {BOOKING.spotsLeft > 0 && <s>{t.price}</s>}
        </div>
        {loading ? (
          <p className="mode-note"><span className="spinner dark" />Writing your personal note…</p>
        ) : note ? (
          <p className="ai-note">{note}</p>
        ) : null}
        <ul>{result.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
        <div>
          <div className="sub-h">What's included</div>
          <ul>{t.feats.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
        {result.addons.length > 0 && (
          <div>
            <div className="sub-h">Suggested add-ons</div>
            <div className="addon-chips">
              {result.addons.map((a) => <span className="addon-chip" key={a.name}>{a.name} · {a.price}</span>)}
            </div>
          </div>
        )}
        <div className="result-actions">
          <button
            className="btn"
            onClick={() => {
              const extras = result.addons.map((a) => a.name.toLowerCase()).join(", ");
              onPrefill(`I'd like to know more about the ${result.tier} wedding film package${extras ? ` with ${extras}` : ""}.`);
              location.hash = "#contact";
            }}
          >
            Ask about this package
          </button>
          <button className="btn btn-ghost" onClick={restart}>Start over</button>
        </div>
        <ModeNote mode={mode} />
      </div>
    );
  }

  return (
    <div>
      <div className="plan-head">
        <h3>Find my package</h3>
        <p>Four quick questions — no email needed.</p>
      </div>
      <div className="progress">
        {QUIZ.map((_, i) => <span key={i} className={i <= step ? "on" : ""} />)}
      </div>
      <div className="quiz-q">{q.question}</div>
      <div className="opt-grid">
        {q.options.map((o) => {
          const selected = q.type === "multi" ? answers.extras.includes(o.value) : answers[q.id] === o.value;
          return (
            <button key={o.value} className={`opt${selected ? " selected" : ""}`} onClick={() => (q.type === "multi" ? toggle(o.value) : pick(o.value))}>
              <b>{o.label}</b>
              {o.hint && <small>{o.hint}</small>}
            </button>
          );
        })}
      </div>
      <div className="quiz-actions">
        {step > 0 && <button className="btn btn-ghost btn-sm" onClick={() => setStep(step - 1)}>Back</button>}
        {q.type === "multi" && (
          <button className="btn btn-sm" onClick={() => next(answers)}>
            {answers.extras.length ? "See my package" : "No extras — see my package"}
          </button>
        )}
      </div>
    </div>
  );
}
