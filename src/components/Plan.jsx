import { useState } from "react";
import Reveal from "./Reveal.jsx";
import PackageFinder from "./PackageFinder.jsx";
import DayPlanner from "./DayPlanner.jsx";
import VibeMatcher from "./VibeMatcher.jsx";

const TABS = [
  ["package", "Find my package"],
  ["planner", "Day planner"],
  ["vibe", "Vibe & colour"],
];

export default function Plan({ onPrefill }) {
  const [tab, setTab] = useState("package");

  return (
    <section id="plan" className="section tint-lav">
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="eyebrow"><span className="rule" />PLAN YOUR FILM<span className="rule" /></div>
          <h2>Let's shape your <em>film</em></h2>
          <p className="lead">Three little tools to help you imagine your wedding film — try one, then share it with us.</p>
        </Reveal>

        <div className="tabs center">
          {TABS.map(([id, label]) => (
            <button key={id} className={`tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>

        <div className="plan-panel">
          {tab === "package" && <PackageFinder onPrefill={onPrefill} />}
          {tab === "planner" && <DayPlanner onPrefill={onPrefill} />}
          {tab === "vibe" && <VibeMatcher onPrefill={onPrefill} />}
        </div>
      </div>
    </section>
  );
}
