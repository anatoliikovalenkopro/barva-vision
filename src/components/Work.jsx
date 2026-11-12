import { useState } from "react";
import { FILMS, artistsOf } from "../../shared/siteData.js";
import { Link, contactLink } from "../router.jsx";
import Reveal from "./Reveal.jsx";
import VideoLightbox from "./VideoLightbox.jsx";

export const thumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export default function Work({ cat, title = "Stories we've", em = "filmed", tint = "tint-sage", reelName = "showreel", service = "" }) {
  const films = cat ? FILMS.filter((f) => f.cat === cat) : FILMS;
  const artists = artistsOf(films);
  const [playing, setPlaying] = useState(null);

  return (
    <section id="work" className={`section ${tint}`}>
      <div className="wrap">
        <Reveal className="section-head">
          <div className="eyebrow"><span className="rule" />SELECTED WORK</div>
          <h2>{title} <em>{em}</em></h2>
          {artists.length > 0 && (
            <p className="worked-with"><span>Worked with</span>{artists.join(" · ")}</p>
          )}
        </Reveal>

        {films.length === 0 ? (
          <div className="reel-soon">
            <div className="reel-tiles">
              {[0, 1, 2].map((i) => (
                <div className="reel-tile" key={i}>
                  <span className="fplay" />
                  <span className="reel-tile-tag">Coming soon</span>
                </div>
              ))}
            </div>
            <div className="reel-soon-row">
              <p>Our {reelName} is on its way. In the meantime, get in touch and we'll gladly share recent work.</p>
              <Link className="btn btn-sm" to={contactLink(service)}>Ask for a preview</Link>
            </div>
          </div>
        ) : (
          <Reveal className="film-grid">
            {films.map((f) => (
              <button className="fcard" key={f.id} onClick={() => setPlaying(f)} aria-label={`Play ${f.artist} — ${f.song}`}>
                <div className="fthumb">
                  <div className="fthumb-img" style={{ backgroundImage: `url(${thumb(f.id)})` }} />
                  <span className="fplay" />
                </div>
                <div className="fmeta"><span>{f.artist} — {f.song}</span><span className="muted">{f.cat}</span></div>
              </button>
            ))}
          </Reveal>
        )}
      </div>
      <VideoLightbox film={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}
