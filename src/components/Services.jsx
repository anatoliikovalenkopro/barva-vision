import { SERVICES } from "../../shared/siteData.js";
import Reveal from "./Reveal.jsx";
import Icon from "./Icon.jsx";

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="eyebrow"><span className="rule" />SERVICES<span className="rule" /></div>
          <h2>Everything your day <em>deserves</em></h2>
          <p className="lead">From the first look to the last dance — wedding films made with care, colour and a lot of heart.</p>
        </Reveal>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <Reveal as="article" className="svc" key={s.title}>
              <div className="svc-icon"><Icon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
