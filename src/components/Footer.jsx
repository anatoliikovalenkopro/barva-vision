import { CONTACT, PAGES } from "../../shared/siteData.js";
import { Link } from "../router.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-col">
            <span className="footer-label">Say hello</span>
            <a className="footer-big-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a className="footer-small-link" href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {CONTACT.instagram} ↗</a>
          </div>
          <nav className="footer-nav">
            {PAGES.map((p) => <Link key={p.path} to={p.path}>{p.label}</Link>)}
          </nav>
        </div>
        <div className="footer-wordmark" aria-hidden="true">BARVA VISION</div>
        <div className="footer-meta">
          <span>© 2026 BARVA VISION</span>
          <span>MUSIC VIDEO · LIVE SHOWS · EVENTS · WEDDINGS</span>
          <span>{CONTACT.base.toUpperCase()} &amp; ACROSS CANADA</span>
        </div>
      </div>
    </footer>
  );
}
