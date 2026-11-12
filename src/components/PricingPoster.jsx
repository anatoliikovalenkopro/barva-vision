import { PHOTOS, PRICING } from "../../shared/siteData.js";
import { Link, contactLink } from "../router.jsx";
import Icon from "./Icon.jsx";
import { Flower, PsychSwirl } from "./Retro.jsx";

const tier = (id) => PRICING.find((c) => c.id === id)?.tiers[0] || {};
const amount = (t) => (t.early || t.price || "").replace("/hr", "");
const hourly = (t) => /\/hr$/.test(t.early || t.price || "");

const CARDS = [
  { id: "music-videos", title: "Music Videos", color: "#d9482b", ink: "#f3e3bf", img: PHOTOS.studio[2].sm, service: "Music Video" },
  { id: "live-shows", title: "Live Shows", color: "#f0ad2f", ink: "#1d1312", img: PHOTOS.live[10].sm, service: "Concert / Live Performance" },
  { id: "events", title: "Events", color: "#7e8a3a", ink: "#f3e3bf", img: PHOTOS.live[9].sm, service: "Event" },
  { id: "photography", title: "Photography", color: "#ec7a2c", ink: "#1d1312", img: PHOTOS.studio[9].sm, service: "Photography" },
  { id: "wedding-films", title: "Wedding Films", color: "#6e3f7a", ink: "#f3e3bf", icon: "rings", service: "Wedding Film" },
];

export default function PricingPoster() {
  return (
    <section className="pp">
      <PsychSwirl className="pp-swirl" />
      <div className="wrap pp-inner">
        <div className="pp-top">
          <div className="pp-portrait" aria-hidden="true">
            <Flower size={170} className="pp-flower" />
            <img src={PHOTOS.studio[0].sm} alt="" />
          </div>
          <h1 className="pp-title"><span>Pricing</span></h1>
          <div className="pp-badge">Clear,<br />honest<br />rates</div>
        </div>

        <div className="pp-cards">
          {CARDS.map((c) => {
            const t = tier(c.id);
            return (
              <Link key={c.id} to={contactLink(c.service)} className="pp-card" style={{ "--c": c.color, "--t": c.ink }}>
                <h3>{c.title}</h3>
                <div className="pp-window">
                  {c.img ? <img src={c.img} alt="" loading="lazy" /> : <Icon name={c.icon} />}
                </div>
                <div className="pp-price">
                  {t.from || c.id === "wedding-films" ? <small>From</small> : null}
                  <b>{amount(t)}</b>
                  {hourly(t) && <small>/hour</small>}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="pp-foot">
          <span className="pp-rule" /><span className="pp-note">Special 2027 launch rates</span><span className="pp-rule" />
        </div>
        <div className="pp-cta"><Link className="pp-quote" to="/contact">Get a custom quote →</Link></div>
      </div>
    </section>
  );
}
