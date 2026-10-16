import { useEffect, useState } from "react";
import { FILMS } from "../../shared/siteData.js";
import Reveal from "./Reveal.jsx";

export default function Work() {
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    if (!playing) return undefined;
    const onKey = (e) => e.key === "Escape" && setPlaying(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  return (
    <section id="work" className="section tint-sage">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="eyebrow"><span className="rule" />SELECTED WORK</div>
          <h2>Stories we've <em>filmed</em></h2>
        </Reveal>

        {FILMS.length === 0 ? (
          <div className="empty-reel">
            <span className="fplay" />
            <h3>Our wedding reel is coming soon</h3>
            <p>We're putting together a reel of real wedding films. In the meantime, get in touch and we'll gladly share more.</p>
            <a className="btn btn-sm" href="#contact">Ask for a preview</a>
          </div>
        ) : (
          <Reveal className="film-grid">
            {FILMS.map((f) => (
              <div className="fcard" key={f.id} onClick={() => setPlaying(f)}>
                <div className="fthumb">
                  <div className="fthumb-img" style={{ backgroundImage: `url(https://img.youtube.com/vi/${f.id}/hqdefault.jpg)` }} />
                  <span className="fplay" />
                </div>
                <div className="fmeta"><span>{f.title}</span><span className="muted">{f.cat}</span></div>
              </div>
            ))}
          </Reveal>
        )}
      </div>

      {playing && (
        <div className="lightbox" onClick={() => setPlaying(null)}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-head">
              <div>
                <div className="lightbox-title">{playing.title}</div>
                <div className="lightbox-meta">{playing.cat.toUpperCase()} · {playing.year}</div>
              </div>
              <button className="close-btn" onClick={() => setPlaying(null)}>CLOSE ✕</button>
            </div>
            <div className="lb-video-wrap">
              <iframe
                title={playing.title}
                src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0&modestbranding=1`}
                allow="autoplay; fullscreen; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
