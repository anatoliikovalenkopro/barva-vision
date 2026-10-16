import { useState } from "react";
import { BOOKING } from "../../shared/siteData.js";
import { useActiveSection } from "../hooks.js";

const LINKS = [
  ["home", "Home"],
  ["services", "Services"],
  ["plan", "Plan your film"],
  ["work", "Work"],
  ["prices", "Prices"],
  ["about", "About"],
  ["contact", "Contact"],
];

export function Announce() {
  const left = BOOKING.spotsLeft;
  return (
    <a className="announce" href="#booking">
      <b>Now booking {BOOKING.year} weddings</b> — first {BOOKING.totalSpots} couples get special launch rates
      {left < BOOKING.totalSpots ? ` · ${left} left` : ""} →
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(LINKS.map(([id]) => id));

  return (
    <>
      <header className="masthead" id="nav">
        <a href="#home" className="brand">
          <span className="logo-mark">BV</span>
          <span className="brand-text">
            <span className="brand-name">Barva Vision</span>
            <span className="brand-tag">WEDDING FILMS · ALBERTA</span>
          </span>
        </a>
        <nav className="dnav">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>{label}</a>
          ))}
        </nav>
        <a className="btn btn-sm nav-cta" href="#contact">Check your date</a>
        <button className="burger" aria-label="Open menu" onClick={() => setOpen(true)}>
          <span /><span /><span />
        </button>
      </header>

      <div className={`menu-overlay${open ? " open" : ""}`}>
        <div className="menu-links">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </div>
        <button className="menu-close-btn" onClick={() => setOpen(false)}>CLOSE ✕</button>
      </div>
    </>
  );
}
