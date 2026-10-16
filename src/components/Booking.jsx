import { BOOKING, PRICING } from "../../shared/siteData.js";
import Reveal from "./Reveal.jsx";

export default function Booking() {
  const wf = PRICING.find((c) => c.id === "wedding-films");

  return (
    <section id="booking" className="booking">
      <div className="wrap booking-grid">
        <Reveal className="booking-copy">
          <div className="eyebrow"><span className="rule" />LIMITED LAUNCH OFFER</div>
          <h2>Booking <em>{BOOKING.year}</em> weddings</h2>
          <p className="lead">
            The calendar for {BOOKING.year} is open. To celebrate our wedding season, the first five couples to book
            receive special launch rates on our wedding films.
          </p>
          <ul className="check-list">
            <li>Special rate on every Wedding Film package</li>
            <li>Only {BOOKING.totalSpots} weddings at this price — once they're gone, they're gone</li>
            <li>Dates confirmed with a quick, no-pressure chat</li>
          </ul>
          <a className="btn" href="#contact">Reserve your date</a>
        </Reveal>

        <Reveal className="poster">
          <div className="poster-kicker">NOW BOOKING</div>
          <div className="poster-year">{BOOKING.year}</div>
          <div className="poster-sub">Wedding Films</div>
          <span className="poster-ribbon">First {BOOKING.totalSpots} weddings · launch rates</span>
          <div className="poster-rows">
            {wf.tiers.map((t) => (
              <div className="poster-row" key={t.name}>
                <span className="n">{t.name}</span>
                <span className="p"><s>{t.price}</s><b>{t.early}</b></span>
              </div>
            ))}
          </div>
          <div className="spots">
            {Array.from({ length: BOOKING.totalSpots }, (_, i) => (
              <span key={i} className={`spot${i >= BOOKING.spotsLeft ? " taken" : ""}`} />
            ))}
          </div>
          <div className="spots-text">{BOOKING.spotsLeft} of {BOOKING.totalSpots} launch spots available</div>
        </Reveal>
      </div>
    </section>
  );
}
