import { useEffect } from "react";

// Plays a YouTube video in a pop-up over the page.
export default function VideoLightbox({ film, onClose }) {
  useEffect(() => {
    if (!film) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [film, onClose]);

  if (!film) return null;
  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-head">
          <div>
            <div className="lightbox-title">{film.artist} — {film.song}</div>
            <div className="lightbox-meta">{film.cat.toUpperCase()}</div>
          </div>
          <div className="lightbox-actions">
            <a className="yt-btn" href={`https://www.youtube.com/watch?v=${film.id}`} target="_blank" rel="noopener noreferrer">
              Watch on YouTube <span aria-hidden="true">↗</span>
            </a>
            <button className="close-btn" onClick={onClose}>CLOSE ✕</button>
          </div>
        </div>
        <div className="lb-video-wrap">
          <iframe
            title={`${film.artist} — ${film.song}`}
            src={`https://www.youtube.com/embed/${film.id}?autoplay=1&rel=0&playsinline=1`}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
