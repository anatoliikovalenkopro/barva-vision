import { useState } from "react";
import { FILMS, PHOTOS, artistsOf } from "../../shared/siteData.js";
import Reveal from "../components/Reveal.jsx";
import PageHero from "../components/PageHero.jsx";
import PhotoGallery from "../components/PhotoGallery.jsx";
import VideoLightbox from "../components/VideoLightbox.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { thumb } from "../components/Work.jsx";

// Every group shows up only when it has work in it.
const GROUPS = [
  { id: "music", label: "Music Video", type: "video", cat: "Music Video", title: "Music", em: "videos" },
  { id: "live", label: "Live Shows", type: "photo", key: "live", title: "Live", em: "shows", lead: "Concert photography from recent shows." },
  { id: "studio", label: "Studio Sessions", type: "photo", key: "studio", title: "Studio", em: "sessions", lead: "Recording sessions and behind the scenes." },
  { id: "portraits", label: "Portraits", type: "photo", key: "portraits", title: "", em: "Portraits", lead: "Portraits for press, covers and socials." },
  { id: "event-photos", label: "Event Photos", type: "photo", key: "events", title: "Event", em: "photos" },
  { id: "wedding-photos", label: "Wedding Photos", type: "photo", key: "weddings", title: "Wedding", em: "photos" },
  { id: "concert-video", label: "Concert Films", type: "video", cat: "Concert", title: "Concert", em: "films" },
  { id: "events", label: "Events", type: "video", cat: "Event", title: "Event", em: "films" },
  { id: "weddings", label: "Weddings", type: "video", cat: "Wedding Film", title: "Wedding", em: "films" },
]
  .map((g) => ({ ...g, items: g.type === "video" ? FILMS.filter((f) => f.cat === g.cat) : PHOTOS[g.key] || [] }))
  .filter((g) => g.items.length > 0);

function VideoGroup({ g, onPlay }) {
  return (
    <section className="section work-group" id={`work-${g.id}`}>
      <div className="wrap">
        <Reveal className="section-head">
          <div className="eyebrow"><span className="rule" />{g.label.toUpperCase()} · {g.items.length}</div>
          <h2>{g.title} <em>{g.em}</em></h2>
        </Reveal>
        <div className="film-grid">
          {g.items.map((f) => (
            <button className="fcard" key={f.id} onClick={() => onPlay(f)} aria-label={`Play ${f.artist} — ${f.song}`}>
              <div className="fthumb">
                <div className="fthumb-img" style={{ backgroundImage: `url(${thumb(f.id)})` }} />
                <span className="fplay" />
              </div>
              <div className="fmeta"><span>{f.artist} — {f.song}</span><span className="muted">{f.cat}</span></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WorkPage() {
  const [filter, setFilter] = useState("all");
  const [playing, setPlaying] = useState(null);
  const artists = artistsOf(FILMS);
  const shown = filter === "all" ? GROUPS : GROUPS.filter((g) => g.id === filter);
  const total = GROUPS.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <PageHero eyebrow="WORK" title="Our" em="work." visual={false} small
        lead={`${total} projects and photos — music videos, live shows, studio sessions and more.`} />
      <div className="wrap work-bar">
        {artists.length > 0 && <p className="worked-with"><span>Worked with</span>{artists.join(" · ")}</p>}
        <div className="tabs work-filters">
          <button className={`tab${filter === "all" ? " active" : ""}`} onClick={() => setFilter("all")}>All</button>
          {GROUPS.map((g) => (
            <button key={g.id} className={`tab${filter === g.id ? " active" : ""}`} onClick={() => setFilter(g.id)}>
              {g.label} <small>{g.items.length}</small>
            </button>
          ))}
        </div>
      </div>

      {shown.map((g) =>
        g.type === "video" ? (
          <VideoGroup key={g.id} g={g} onPlay={setPlaying} />
        ) : (
          <PhotoGallery key={g.id} id={`work-${g.id}`} className="work-group" photos={g.items} eyebrow={`${g.label.toUpperCase()} · ${g.items.length}`}
            title={g.title} em={g.em} lead={g.lead} showPrice={false} />
        ),
      )}

      <CtaBand title="Like what you see?" em="Let's make yours." />
      <VideoLightbox film={playing} onClose={() => setPlaying(null)} />
    </>
  );
}
