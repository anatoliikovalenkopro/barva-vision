import { useEffect, useState } from "react";
import { BOOKING } from "../../shared/siteData.js";
import { Link, contactLink } from "../router.jsx";
import Icon from "./Icon.jsx";

export const SERVICE_LINKS = [
  { path: "/music-videos", label: "Music Video", icon: "note" },
  { path: "/live-shows", label: "Live Shows", icon: "live" },
  { path: "/weddings", label: "Weddings", icon: "rings" },
  { path: "/events", label: "Events", icon: "clapper" },
];

const NAV = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { label: "Services", children: SERVICE_LINKS },
  { path: "/prices", label: "Pricing" },
  { path: "/contact", label: "About & Contact" },
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

export default function Header({ path, wedding }) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => setDrop(false), [path]);

  const isServices = SERVICE_LINKS.some((s) => s.path === path);

  return (
    <>
      <header className="masthead" id="nav">
        <Link to="/" className="brand">
          <span className="brand-text">
            <span className="brand-name">Barva Vision</span>
            <span className="brand-tag">{wedding ? "Wedding films" : "Video production"}</span>
          </span>
        </Link>
        <span className="brand-divider" aria-hidden="true" />
        <nav className="dnav">
          {NAV.map((n) =>
            n.children ? (
              <div className={`dnav-drop${drop ? " open" : ""}`} key={n.label} onMouseLeave={() => setDrop(false)}>
                <button className={isServices ? "active" : ""} onClick={() => setDrop(!drop)} onMouseEnter={() => setDrop(true)} aria-expanded={drop}>
                  {n.label} <span className="chev">⌄</span>
                </button>
                <div className="drop-panel">
                  {n.children.map((c) => (
                    <Link key={c.path} to={c.path} className={path === c.path ? "active" : ""}>
                      <Icon name={c.icon} />{c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={n.label} to={n.path} className={path === n.path || (n.path === "/contact" && path === "/about") ? "active" : ""}>{n.label}</Link>
            ),
          )}
        </nav>
        <Link className="nav-cta" to={contactLink(wedding ? "Wedding Film" : "")}>
          {wedding ? "Check your date" : "Get a quote"} <Icon name="arrowUR" />
        </Link>
        <button className="burger" aria-label="Open menu" onClick={() => setOpen(true)}>
          <span /><span /><span />
        </button>
      </header>

      <div className={`menu-overlay${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="menu-top">
          <span className="brand-name">Barva Vision</span>
          <button className="menu-close-btn" onClick={() => setOpen(false)}>CLOSE ✕</button>
        </div>
        <nav className="menu-links">
          {[NAV[0], NAV[1], ...SERVICE_LINKS, NAV[3], NAV[4]].map((p, i) => (
            <Link key={p.label} to={p.path} className={path === p.path ? "active" : ""} onClick={() => setOpen(false)}>
              <small>{String(i + 1).padStart(2, "0")}</small>{p.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-block" to={contactLink("")} onClick={() => setOpen(false)}>Get a quote</Link>
      </div>
    </>
  );
}
