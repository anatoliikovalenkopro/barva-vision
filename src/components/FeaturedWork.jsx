import { useState } from "react";
import { FEATURED, FILMS, artistsOf } from "../../shared/siteData.js";
import { Link, contactLink } from "../router.jsx";
import Icon from "./Icon.jsx";
import VideoLightbox from "./VideoLightbox.jsx";
import { thumb } from "./Work.jsx";

function Placeholder({ f }) {
  const [hasImg, setHasImg] = useState(true);
  return (
    <Link className="fw-card" to={contactLink("")}>
      <span className={`fw-fallback ${f.tone}`} />
      {hasImg && <img src={f.img} alt="" loading="lazy" onError={() => setHasImg(false)} />}
      <span className="fw-shade" />
      <span className="fw-play"><Icon name="play" /></span>
      <span className="fw-meta"><b>{f.title}</b><small>{f.cat}</small></span>
    </Link>
  );
}

export default function FeaturedWork() {
  const [playing, setPlaying] = useState(null);
  // Real films first, then placeholders (skipping categories already covered) to fill 4 cards.
  const taken = new Set(FILMS.map((f) => f.cat));
  const fillers = FEATURED.filter((f) => !taken.has(f.cat)).slice(0, Math.max(0, 3 - FILMS.length));
  const artists = artistsOf(FILMS);

  return (
    <section id="work" className="featured-work">
      <div className="wrap">
        <div className="fw-head">
          <div>
            <div className="hh-kicker"><span className="red-line" />FEATURED WORK</div>
            {artists.length > 0 && <p className="worked-with"><span>Worked with</span>{artists.join(" · ")}</p>}
          </div>
          <Link to="/music-videos" className="fw-all">View all projects <span>→</span></Link>
        </div>
        <div className="fw-grid">
          {FILMS.slice(0, 6).map((f) => (
            <button key={f.id} className="fw-card" onClick={() => setPlaying(f)} aria-label={`Play ${f.artist} — ${f.song}`}>
              <img src={thumb(f.id)} alt="" loading="lazy" />
              <span className="fw-shade" />
              <span className="fw-play"><Icon name="play" /></span>
              <span className="fw-meta"><b>{f.artist}</b><small>{f.song}</small></span>
            </button>
          ))}
          {fillers.map((f) => <Placeholder key={f.title} f={f} />)}
        </div>
      </div>
      <VideoLightbox film={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}
