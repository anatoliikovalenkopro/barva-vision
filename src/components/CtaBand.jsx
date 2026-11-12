import { Link, contactLink } from "../router.jsx";
import Reveal from "./Reveal.jsx";

export default function CtaBand({ title = "Have a project in mind?", em = "Let's talk.", service = "", button = "Get a quote" }) {
  return (
    <section className="cta-band">
      <Reveal className="wrap cta-inner">
        <h2>{title} <em>{em}</em></h2>
        <Link className="btn" to={contactLink(service)}>{button}</Link>
      </Reveal>
    </section>
  );
}
