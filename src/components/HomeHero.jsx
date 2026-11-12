import { useState } from "react";
import { Link, contactLink } from "../router.jsx";
import Icon from "./Icon.jsx";
import { SERVICE_LINKS } from "./Header.jsx";

const ICONS = SERVICE_LINKS;

const EQ = [30, 62, 44, 88, 56, 100, 40, 74, 52, 90, 36, 66];

// Designed "showreel" collage — one frame per service. A real photo at public/images/hero.jpg replaces it.
function ReelStack() {
  return (
    <div className="reel-stack" aria-hidden="true">
      <div className="rs-frame rs-music">
        <div className="rs-bar"><span><i />MUSIC VIDEO</span><span>4K</span></div>
        <div className="rs-eq">{EQ.map((h, i) => <i key={i} style={{ "--h": `${h}%`, animationDelay: `${(i % 5) * -0.2}s` }} />)}</div>
        <div className="rs-tc">00:01:24:08</div>
      </div>
      <div className="rs-frame rs-live">
        <div className="rs-bar"><span><i />LIVE SHOW</span><span>CAM 2</span></div>
        <b className="rs-live-word">LIVE</b>
        <div className="rs-tc">00:47:10:16</div>
      </div>
      <div className="rs-frame rs-wedding">
        <div className="rs-bar"><span><i />WEDDING</span><span>24 FPS</span></div>
        <span className="rs-arch" /><span className="rs-sun" />
        <div className="rs-tc">00:03:51:02</div>
      </div>
      <div className="rs-frame rs-events">
        <div className="rs-bar"><span><i />EVENT</span><span>RAW</span></div>
        <span className="rs-dot a" /><span className="rs-dot b" /><span className="rs-dot c" />
        <div className="rs-tc">00:12:33:20</div>
      </div>
      <div className="rs-play"><Icon name="play" /><small>Showreel 2027</small></div>
    </div>
  );
}

export default function HomeHero() {
  const [hasPhoto, setHasPhoto] = useState(true);
  return (
    <section className="home-hero">
      <div className="hh-bg" aria-hidden="true">
        <span className="hh-haze" />
        {hasPhoto && <img className="hh-photo" src="/images/hero.jpg" alt="" onError={() => setHasPhoto(false)} />}
        <span className="hh-fade" />
      </div>
      <span className="hh-bracket top" aria-hidden="true" /><span className="hh-bracket bottom" aria-hidden="true" />

      <div className="wrap hh-inner">
        <ReelStack />
        <div className="hh-kicker"><span className="red-line" />VIDEO PRODUCTION <span className="sep">/</span> ALBERTA &amp; CANADA</div>
        <h1 className="hh-title">Bring Your<br />Story to Screen<span className="red-dot">.</span></h1>
        <p className="hh-lead">
          Music videos, live shows, events and weddings — cinematic video production from Alberta, across
          Canada.
        </p>
        <div className="hh-actions">
          <Link className="btn btn-red" to="/contact"><Icon name="play" />Start your project</Link>
          <a className="btn btn-outline" href="#work"><Icon name="play" />Watch showreel</a>
        </div>
        <div className="hh-icons">
          {ICONS.map((s) => (
            <Link key={s.label} to={s.path} className="hh-icon">
              <Icon name={s.icon} />
              <span>{s.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="hh-caption" aria-hidden="true">FILM <span>/</span> PHOTOGRAPHY <span>/</span> SOUND <i className="red-line" /></div>
    </section>
  );
}
