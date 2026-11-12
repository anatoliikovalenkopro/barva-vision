import { Link, contactLink } from "../router.jsx";

function Actions({ service }) {
  return (
    <div className="hero-actions">
      <Link className="btn" to={contactLink(service)}>Get a quote</Link>
      <a className="btn btn-ghost" href="#prices">See pricing</a>
    </div>
  );
}

// Music Videos — huge uppercase type + animated equalizer.

export function MusicHero({ lead, service }) {
  return (
    <section className="music-hero">
      <div className="wrap">
        <div className="mh-tag"><span>01</span> MUSIC VIDEO</div>
        <h1 className="mh-title">Videos that look like <span>your sound</span></h1>
        <div className="mh-row">
          <p className="lead">{lead}</p>
          <Actions service={service} />
        </div>
      </div>
    </section>
  );
}

// Live Shows — gig poster.
export function LiveHero({ lead, service }) {
  return (
    <section className="live-hero">
      <div className="wrap live-grid">
        <div className="gig-poster" aria-hidden="true">
          <span className="gp-top">BARVA VISION PRESENTS</span>
          <span className="gp-big">LIVE</span>
          <span className="gp-sub">CONCERTS · GIGS · FESTIVALS</span>
          <div className="gp-lines"><span>ALBERTA</span><b>★</b><span>ACROSS CANADA</span></div>
          <span className="gp-foot">NOW BOOKING 2027 · MULTI-CAM · 4K</span>
        </div>
        <div className="live-copy">
          <div className="live-tag">02 — LIVE SHOWS</div>
          <h1>Your set, filmed like it felt.</h1>
          <p className="lead">{lead}</p>
          <Actions service={service} />
        </div>
      </div>
    </section>
  );
}

// Events — light editorial board of event tiles.
const TILES = [
  ["LAUNCH", "t-blue", "circle"],
  ["GALA", "t-ink", "arch"],
  ["FESTIVAL", "t-sun", "burst"],
  ["PARTY", "t-pink", "dots"],
  ["CONFERENCE", "t-paper", "lines"],
  ["RELEASE", "t-green", "square"],
];

export function EventsHero({ lead, service }) {
  return (
    <section className="events-hero">
      <div className="wrap events-grid">
        <div>
          <div className="ev-tag">03 / EVENTS</div>
          <h1>The energy of the room, <em>on film.</em></h1>
          <p className="lead">{lead}</p>
          <Actions service={service} />
        </div>
        <div className="ev-board" aria-hidden="true">
          {TILES.map(([label, tone, shape]) => (
            <div key={label} className={`ev-tile ${tone}`}>
              <span className={`ev-shape ${shape}`} />
              <b>{label}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
