import { useState } from "react";
import { FILMS, PHOTOS } from "../../shared/siteData.js";
import { Link, contactLink } from "../router.jsx";
import Icon from "./Icon.jsx";
import { Flower, PsychSwirl, WavyStripes } from "./Retro.jsx";
import VideoLightbox from "./VideoLightbox.jsx";
import { thumb } from "./Work.jsx";

export function GroovyHero() {
  return (
    <section className="gh">
      <PsychSwirl className="gh-swirl" />
      <div className="wrap">
        <div className="gh-box">
          <div className="gh-strip" aria-hidden="true">
            <img src={PHOTOS.studio[0].sm} alt="" />
            <Flower size={46} />
            <img src={PHOTOS.studio[4].sm} alt="" />
          </div>
          <div className="gh-copy">
            <h1 className="gh-title">Bring your story to screen</h1>
            <p>Music videos, live shows, weddings, events and photography — cinematic video production from Alberta, across Canada.</p>
            <Link className="gh-cta" to="/contact">Start your project <span aria-hidden="true">→</span></Link>
          </div>
          <div className="gh-photo">
            <img src={PHOTOS.live[11].src} alt="Live concert filmed by Barva Vision" />
            <WavyStripes vertical className="gh-wave-l" />
            <WavyStripes vertical className="gh-wave-r" />
          </div>
          <div className="gh-slogan" aria-hidden="true">
            <span className="gh-sprockets" />
            <b>Film · Photo · Sound</b>
            <span className="gh-sprockets" />
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { to: "/music-videos", label: "Music Videos", sub: "Artists / Bands", icon: "movie", color: "#d9472a" },
  { to: "/live-shows", label: "Live Shows", sub: "Concerts / Festivals", icon: "stage", color: "#e2a42c" },
  { to: "/weddings", label: "Weddings", sub: "Real moments / Timeless", icon: "rings", color: "#8a8a35" },
  { to: "/events", label: "Events", sub: "Corporate / Private", icon: "calendar", color: "#d9472a" },
  { to: "/live-shows#photos", label: "Photography", sub: "Concerts / Portraits", icon: "camera", color: "#e2a42c" },
];

export function ServicesBand() {
  return (
    <section className="sb">
      <div className="wrap sb-inner">
        <div className="sb-title">
          <h2>Our<br />services</h2>
          <Flower size={34} />
        </div>
        <div className="sb-list">
          {SERVICES.map((s) => (
            <Link key={s.label} to={s.to} className="sb-item">
              <span className="sb-badge" style={{ background: s.color }}><Icon name={s.icon} /></span>
              <b>{s.label}</b>
              <small>{s.sub}</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedBand() {
  const [playing, setPlaying] = useState(null);
  const photo = PHOTOS.live[0];
  return (
    <section className="fb" id="work">
      <div className="wrap fb-inner">
        <div className="fb-title">
          <h2>Featured<br />work</h2>
          <Flower size={34} petals="#e5a52a" center="#e0522b" />
          <Link to="/work" className="fb-all">View all projects →</Link>
        </div>
        <div className="fb-grid">
          {FILMS.slice(0, 3).map((f) => (
            <button key={f.id} className="fb-card" onClick={() => setPlaying(f)} aria-label={`Play ${f.artist} — ${f.song}`}>
              <span className="fb-img"><img src={thumb(f.id)} alt="" loading="lazy" /><i className="fb-play"><Icon name="play" /></i></span>
              <b>{f.song}</b>
              <small>{f.artist} · {f.cat}</small>
            </button>
          ))}
          <Link to="/live-shows" className="fb-card">
            <span className="fb-img"><img src={photo.sm} alt="" loading="lazy" /></span>
            <b>Live show</b>
            <small>Concert photography</small>
          </Link>
        </div>
      </div>
      <div className="fb-wave">
        <WavyStripes />
        <Flower className="fb-wave-flower" size={70} />
      </div>
      <VideoLightbox film={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}
