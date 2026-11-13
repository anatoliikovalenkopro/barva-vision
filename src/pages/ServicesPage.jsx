import { FILMS, PHOTOS, PRICING, WEDDING_SERVICES } from "../../shared/siteData.js";
import { Link, contactLink } from "../router.jsx";
import { SERVICE_PAGES } from "./servicePages.js";
import Reveal from "../components/Reveal.jsx";
import PageHero from "../components/PageHero.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Icon from "../components/Icon.jsx";
import { thumb } from "../components/Work.jsx";

const tierOf = (id, i = 0) => PRICING.find((c) => c.id === id)?.tiers[i] || {};
const photo = (key, n) => (PHOTOS[key] || []).slice(0, n).map((p) => p.sm);

const SERVICES = [
  {
    id: "music-video", title: "Music Video", to: "/music-videos", icon: "note", service: "Music Video",
    lead: SERVICE_PAGES["/music-videos"].lead,
    points: ["Performance, story or visual-led", "Concept & planning chat", "Cinema cameras, edit & colour grade", "4K delivery + vertical cuts on request"],
    price: tierOf("music-videos"),
    media: FILMS.filter((f) => f.cat === "Music Video").slice(0, 3).map((f) => thumb(f.id)),
    wide: true,
  },
  {
    id: "live-shows", title: "Live Shows", to: "/live-shows", icon: "live", service: "Concert / Live Performance",
    lead: SERVICE_PAGES["/live-shows"].lead,
    points: SERVICE_PAGES["/live-shows"].kinds.map((k) => k.title),
    price: tierOf("live-shows"),
    media: photo("live", 3),
  },
  {
    id: "events", title: "Events", to: "/events", icon: "clapper", service: "Event",
    lead: SERVICE_PAGES["/events"].lead,
    points: SERVICE_PAGES["/events"].kinds.map((k) => k.title),
    price: tierOf("events"),
    media: photo("events", 3),
  },
  {
    id: "weddings", title: "Weddings", to: "/weddings", icon: "rings", service: "Wedding Film",
    lead: "Soft light, honest emotion and a story you'll want to watch again and again — wedding films, not staged, just felt.",
    points: WEDDING_SERVICES.slice(0, 4).map((s) => s.title),
    price: { ...tierOf("wedding-films"), from: true },
    note: "2027 launch rate",
    media: photo("weddings", 3),
  },
  {
    id: "photography", title: "Photography", to: "/work", icon: "camera", service: "Photography",
    lead: "Concerts, portraits, weddings and events — colour-edited, high-resolution photos at one simple hourly rate.",
    points: tierOf("photography").feats || [],
    price: tierOf("photography"),
    media: [...photo("portraits", 2), ...photo("live", 1)],
  },
];

function Price({ t, note }) {
  const now = (t.early || t.price || "").replace("/hr", "");
  const hourly = /\/hr$/.test(t.early || t.price || "");
  return (
    <div className="sv-price">
      {t.from && <small>from</small>}
      <b>{now}</b>
      {hourly && <small>/hour</small>}
      {t.early && <s>{t.price.replace("/hr", "")}</s>}
      <span>{note || (t.early ? "Special price" : "")}</span>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="SERVICES" title="What we" em="do." visual={false} small
        lead="Music videos, live shows, events, weddings and photography — scroll through everything we offer, or jump straight to a service." />
      <nav className="wrap sv-jump" aria-label="Jump to a service">
        {SERVICES.map((s) => (
          <a key={s.id} href={`#sv-${s.id}`}><Icon name={s.icon} />{s.title}</a>
        ))}
      </nav>

      {SERVICES.map((s, i) => (
        <section key={s.id} id={`sv-${s.id}`} className={`sv${i % 2 ? " flip" : ""}`}>
          <div className="wrap sv-grid">
            <Reveal className="sv-copy">
              <span className="sv-n">{String(i + 1).padStart(2, "0")}</span>
              <h2>{s.title}</h2>
              <p className="lead">{s.lead}</p>
              <ul className="sv-points">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <Price t={s.price} note={s.note} />
              <div className="hero-actions">
                <Link className="btn" to={contactLink(s.service)}>Get a quote</Link>
                <Link className="btn btn-ghost" to={s.to}>{s.id === "photography" ? "See photos" : "More"}</Link>
              </div>
            </Reveal>
            <Reveal className={`sv-media${s.media.length ? "" : " empty"}${s.wide ? " wide" : ""}`}>
              {s.media.length ? (
                s.media.map((src, k) => <img key={src} src={src} alt="" loading="lazy" className={`m${k}`} />)
              ) : (
                <div className="sv-empty"><Icon name={s.icon} /><span>Gallery coming soon</span></div>
              )}
            </Reveal>
          </div>
        </section>
      ))}

      <CtaBand title="Not sure which one?" em="Just ask." />
    </>
  );
}
