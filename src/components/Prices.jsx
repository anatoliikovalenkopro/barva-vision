import { useState } from "react";
import { BOOKING, PRICING } from "../../shared/siteData.js";
import Reveal from "./Reveal.jsx";

export default function Prices() {
  const [tab, setTab] = useState(PRICING[0].id);
  const cat = PRICING.find((c) => c.id === tab);
  const launch = cat.id === "wedding-films" && BOOKING.spotsLeft > 0;

  return (
    <section id="prices" className="section tint-blush">
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="eyebrow"><span className="rule" />SERVICES &amp; PRICES<span className="rule" /></div>
          <h2>Clear, honest <em>pricing</em></h2>
          <p className="lead">Starting rates — every wedding is a little different, so every project is quoted to fit.</p>
        </Reveal>

        <div className="tabs center">
          {PRICING.map((c) => (
            <button key={c.id} className={`tab${c.id === tab ? " active" : ""}`} onClick={() => setTab(c.id)}>{c.tab}</button>
          ))}
        </div>

        {cat.badge && launch && <span className="price-badge">{cat.badge}</span>}
        <div className={`tiers${cat.tiers.length === 1 ? " single" : ""}`} key={tab}>
          {cat.tiers.map((t) => {
            const early = launch && t.early;
            return (
              <Reveal className={`tier${t.popular ? " popular" : ""}`} key={t.name}>
                {t.popular && <span className="tier-flag">Most loved</span>}
                <span className="tier-name">{t.name}</span>
                <div className={`tier-price${early ? " early" : ""}`}>
                  {early ? <><b>{t.early}</b><s>{t.price}</s></> : <b>{t.price}</b>}
                </div>
                {early && <span className="tier-early">{BOOKING.year} launch rate</span>}
                {t.desc && <p className="tier-desc">{t.desc}</p>}
                {t.feats?.length > 0 && (
                  <ul className="tier-feats">{t.feats.map((f) => <li key={f}>{f}</li>)}</ul>
                )}
              </Reveal>
            );
          })}
        </div>
        {cat.note && <p className="price-note">{cat.note}</p>}
      </div>
    </section>
  );
}
