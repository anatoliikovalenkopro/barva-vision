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
  const [edge, setEdge] = useState({ start: true, end: false, progress: 0, first: 1, last: 1 });
  const updateEdges = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const items = [...el.children];
    const visible = items
      .map((c, i) => ({ i, mid: c.offsetLeft - el.offsetLeft + c.offsetWidth / 2 }))
      .filter((c) => c.mid >= el.scrollLeft && c.mid <= el.scrollLeft + el.clientWidth);
    setEdge({
      start: el.scrollLeft < 8,
      end: el.scrollLeft > max - 8,
      progress: max > 0 ? el.scrollLeft / max : 1,
      first: visible.length ? visible[0].i + 1 : 1,
      last: visible.length ? visible[visible.length - 1].i + 1 : 1,
    });
  };
  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, []);
  // Endless: past the last photo it jumps back to the first (and the other way round).
  const slide = (dir) => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (dir > 0 && el.scrollLeft >= max - 8) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir < 0 && el.scrollLeft <= 8) el.scrollTo({ left: max, behavior: "smooth" });
    else el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // Slides on its own every few seconds while visible; pauses while someone hovers or touches it.
  const paused = useRef(false);
  const visible = useRef(false);
  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0.4 });
    io.observe(el);
    const timer = setInterval(() => {
      if (visible.current && !paused.current && index === null && !document.hidden) slide(1);
    }, 4500);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [index]);
  const hold = () => { paused.current = true; };
  const release = () => { paused.current = false; };
  let resumeTimer;
  const touchHold = () => { paused.current = true; clearTimeout(resumeTimer); };
  const touchRelease = () => { clearTimeout(resumeTimer); resumeTimer = setTimeout(release, 6000); };
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
        </div>
        <div className={`pg-viewport${edge.start ? " at-start" : ""}${edge.end ? " at-end" : ""}`}>
        <div className="pg-track" ref={track} onScroll={updateEdges} onMouseEnter={hold} onMouseLeave={release} onTouchStart={touchHold} onTouchEnd={touchRelease}>
          {photos.map((p, i) => (
            <button key={p.src} className={`pg-item${p.wide ? " wide" : ""}`} onClick={() => setIndex(i)} aria-label={`Open photo ${i + 1}`}>
              <img src={p.sm} alt={alt} loading="lazy" width={p.wide ? 760 : 506} height={p.wide ? 506 : 760} />
            </button>
          ))}
        </div>
        </div>
        <div className="pg-bar">
          <span className="pg-count">
            {edge.first === edge.last ? edge.first : `${edge.first}–${edge.last}`} of {photos.length}
            <em className="pg-swipe"> · swipe →</em>
          </span>
          <span className="pg-progress"><i style={{ width: `${Math.max(8, edge.progress * 100)}%` }} /></span>
          <span className="pg-arrows">
            <button onClick={() => slide(-1)} aria-label="Previous photos">‹</button>
            <button onClick={() => slide(1)} aria-label="Next photos">›</button>
          </span>
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
