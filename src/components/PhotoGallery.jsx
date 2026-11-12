import { useCallback, useEffect, useRef, useState } from "react";
import { PRICING } from "../../shared/siteData.js";
import { Link, contactLink } from "../router.jsx";
import Reveal from "./Reveal.jsx";

function PhotoViewer({ photos, index, setIndex }) {
  const close = useCallback(() => setIndex(null), [setIndex]);
  const step = useCallback((d) => setIndex((i) => (i + d + photos.length) % photos.length), [photos.length, setIndex]);

  useEffect(() => {
    if (index === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  if (index === null) return null;
  return (
    <div className="pv" onClick={close} role="dialog" aria-label="Photo viewer">
      <img src={photos[index].src} alt="" onClick={(e) => e.stopPropagation()} />
      <button className="pv-btn pv-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo">‹</button>
      <button className="pv-btn pv-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo">›</button>
      <button className="pv-close" onClick={close}>CLOSE ✕</button>
      <span className="pv-count">{index + 1} / {photos.length}</span>
    </div>
  );
}

export default function PhotoGallery({ photos, eyebrow = "PHOTOGRAPHY", title, em, lead, alt = "Photo by Barva Vision", id = "photos", showPrice = true, className = "" }) {
  const [index, setIndex] = useState(null);
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const updateEdges = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, []);
  const slide = (dir) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });
  const price = PRICING.find((c) => c.id === "photography")?.tiers[0];

  return (
    <section className={`section photo-gallery ${className}`} id={id}>
      <div className="wrap">
        <div className="pg-head">
          <Reveal className="section-head">
            <div className="eyebrow"><span className="rule" />{eyebrow}</div>
            <h2>{title} <em>{em}</em></h2>
            {lead && <p className="lead">{lead}</p>}
          </Reveal>
          <div className="pg-arrows">
            <button onClick={() => slide(-1)} disabled={edge.start} aria-label="Previous photos">‹</button>
            <button onClick={() => slide(1)} disabled={edge.end} aria-label="Next photos">›</button>
          </div>
        </div>
        <div className="pg-track" ref={track} onScroll={updateEdges}>
          {photos.map((p, i) => (
            <button key={p.src} className={`pg-item${p.wide ? " wide" : ""}`} onClick={() => setIndex(i)} aria-label={`Open photo ${i + 1}`}>
              <img src={p.sm} alt={alt} loading="lazy" width={p.wide ? 760 : 506} height={p.wide ? 506 : 760} />
            </button>
          ))}
        </div>
        {showPrice && price && (
          <div className="pg-price">
            <div>
              <span className="pg-price-label">Photography</span>
              <b>{price.price.replace("/hr", "")}<small>/hour</small></b>
            </div>
            <p>Concerts, portraits, weddings and events — one hourly rate, colour-edited high-resolution photos.</p>
            <Link className="btn btn-sm" to={contactLink("Photography")}>Book photos</Link>
          </div>
        )}
      </div>
      <PhotoViewer photos={photos} index={index} setIndex={setIndex} />
    </section>
  );
}
