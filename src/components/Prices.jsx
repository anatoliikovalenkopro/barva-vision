import { useState } from "react";
import { BOOKING, PRICING } from "../../shared/siteData.js";
import { Link, contactLink } from "../router.jsx";
import Reveal from "./Reveal.jsx";

const QUOTE_SERVICE = { "music-videos": "Music Video", "live-shows": "Concert / Live Performance", events: "Event", photography: "Photography" };

export default function Prices({
  ids = PRICING.map((c) => c.id),
  start,
  title = "Clear, honest",
  em = "pricing",
  lead = "Clear starting prices for every service. Every project is a little different, so we confirm the final quote with you.",
  tint = "tint-blush",
}) {
  const cats = PRICING.filter((c) => ids.includes(c.id) && c.id !== "addons");
  const addons = PRICING.find((c) => c.id === "addons");
  const [tab, setTab] = useState(start || cats[0].id);
  const cat = cats.find((c) => c.id === tab) || cats[0];
  const launch = cat.id === "wedding-films" && BOOKING.spotsLeft > 0;

  return (
    <section id="prices" className={`section ${tint}`}>
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="eyebrow"><span className="rule" />PRICES<span className="rule" /></div>
          <h2>{title} <em>{em}</em></h2>
          {lead && <p className="lead">{lead}</p>}
        </Reveal>

        {cats.length > 1 && (
          <div className="tabs center">
            {cats.map((c) => (
              <button key={c.id} className={`tab${c.id === cat.id ? " active" : ""}`} onClick={() => setTab(c.id)}>{c.tab}</button>
            ))}
          </div>
        )}

        {cat.badge && launch && <span className="price-badge">{cat.badge}</span>}
        <div className={`tiers${cat.tiers.length === 1 ? " single" : ""}`} key={cat.id}>
          {cat.tiers.map((t) => {
            const early = t.early && (cat.id !== "wedding-films" || launch);
            const from = t.from ? <small className="tier-from">from</small> : null;
            return (
              <Reveal className={`tier${t.popular ? " popular" : ""}`} key={t.name}>
                {t.popular && <span className="tier-flag">Most loved</span>}
                <span className="tier-name">{t.name}</span>
                <div className={`tier-price${early ? " early" : ""}`}>
                  {early ? <>{from}<b>{t.early}</b><s>{t.price}</s></> : /^from /.test(t.price) ? <><small className="tier-from">from</small><b>{t.price.slice(5)}</b></> : <>{from}<b>{t.price}</b></>}
                </div>
                {early && <span className="tier-early">{cat.id === "wedding-films" ? `${BOOKING.year} launch rate` : "Special price"}</span>}
                {t.desc && <p className="tier-desc">{t.desc}</p>}
                {t.feats?.length > 0 && (
                  <ul className="tier-feats">{t.feats.map((f) => <li key={f}>{f}</li>)}</ul>
                )}
                {QUOTE_SERVICE[cat.id] && (
                  <Link className="btn btn-sm tier-cta" to={contactLink(QUOTE_SERVICE[cat.id])}>Get a quote</Link>
                )}
              </Reveal>
            );
          })}
        </div>

        {cat.id === "wedding-films" && addons && (
          <Reveal className="addons-block">
            <div className="addons-head">Wedding add-ons</div>
            <div className="addons-row">
              {addons.tiers.map((t) => (
                <div className="addon-card" key={t.name}>
                  <span>{t.name}</span>
                  <b>{/^from /.test(t.price) ? <><small>from</small>{t.price.slice(5)}</> : t.price}</b>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
