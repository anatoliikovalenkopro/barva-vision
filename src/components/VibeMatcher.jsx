import { useState } from "react";
import { post } from "../api.js";
import ModeNote from "./ModeNote.jsx";

const EXAMPLES = [
  "Soft garden wedding at golden hour",
  "Modern, minimal, black and cream city wedding",
  "Rustic barn, autumn colours, lots of candlelight",
  "Mountain lake ceremony, wild flowers",
];

export default function VibeMatcher({ onPrefill }) {
  const [text, setText] = useState("");
  const [vibe, setVibe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async (value) => {
    setLoading(true);
    setError("");
    try {
      setVibe(await post("/api/vibe", { text: value }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    run(text);
  };

  return (
    <div>
      <div className="plan-head">
        <h3>Vibe &amp; colour matcher</h3>
        <p>Describe your wedding in a few words — we'll suggest a film mood and a colour palette.</p>
      </div>

      <form className="vibe-row" onSubmit={submit}>
        <input className="vibe-input" value={text} maxLength={300} onChange={(e) => setText(e.target.value)} placeholder="e.g. romantic, outdoors, warm and golden" />
        <button className="btn" disabled={loading || text.trim().length < 3}>
          {loading ? <><span className="spinner" />Thinking…</> : "Find our vibe"}
        </button>
      </form>
      <div className="example-chips">
        {EXAMPLES.map((ex) => (
          <button key={ex} type="button" className="example-chip" onClick={() => { setText(ex); run(ex); }}>{ex}</button>
        ))}
      </div>
      {error && <p className="err">{error}</p>}

      {vibe && (
        <div className="result" style={{ marginTop: 22 }}>
          <div className="vibe-name">{vibe.mood_name}</div>
          <p>{vibe.description}</p>
          <div className="swatches">
            {vibe.palette.map((c) => (
              <div className="swatch" key={c.hex + c.name}>
                <i style={{ background: c.hex }} />
                <span>{c.name}<em>{c.hex}</em></span>
              </div>
            ))}
          </div>
          <div className="vibe-lines">
            <p><b>Film style.</b> {vibe.film_style}</p>
            <p><b>Music.</b> {vibe.music_feel}</p>
            {vibe.shot_ideas?.length > 0 && <p><b>Shot ideas.</b> {vibe.shot_ideas.join(" · ")}</p>}
          </div>
          <div className="result-actions">
            <button
              className="btn"
              onClick={() => {
                onPrefill(`Our wedding vibe: "${vibe.mood_name}" — ${vibe.description} Palette: ${vibe.palette.map((c) => c.name).join(", ")}.`);
                location.hash = "#contact";
              }}
            >
              Use this vibe in my enquiry
            </button>
          </div>
          <ModeNote mode={vibe.mode} />
        </div>
      )}
    </div>
  );
}
