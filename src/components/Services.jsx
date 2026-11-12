import Reveal from "./Reveal.jsx";
import Icon from "./Icon.jsx";

export default function Services({ items, eyebrow = "SERVICES", title, em, lead, tint = "" }) {
  return (
    <section id="services" className={`section ${tint}`}>
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="eyebrow"><span className="rule" />{eyebrow}<span className="rule" /></div>
          <h2>{title} <em>{em}</em></h2>
          {lead && <p className="lead">{lead}</p>}
        </Reveal>
        <div className="services-grid">
          {items.map((s) => (
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
