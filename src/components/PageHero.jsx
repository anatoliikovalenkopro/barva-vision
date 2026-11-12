import { Link, contactLink } from "../router.jsx";
import Viewfinder from "./Viewfinder.jsx";

export default function PageHero({ n, eyebrow, title, em, lead, service, visual = true, label, secondary, small = false }) {
  return (
    <section className={`page-hero${visual ? "" : " compact"}${small ? " small" : ""}`}>
      <div className="wrap page-hero-grid">
        <div>
          {n && <span className="page-n">{n}</span>}
          <div className="eyebrow"><span className="rule" />{eyebrow}</div>
          <h1>{title} <em>{em}</em></h1>
          {lead && <p className="lead">{lead}</p>}
          {service !== undefined && (
            <div className="hero-actions">
              <Link className="btn" to={contactLink(service)}>Get a quote</Link>
              {secondary && <a className="btn btn-ghost" href={secondary[0]}>{secondary[1]}</a>}
            </div>
          )}
        </div>
        {visual && <Viewfinder label={label} />}
      </div>
    </section>
  );
}
