import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap about-grid">
        <Reveal className="about-art">
          <div className="about-arch">
            <svg viewBox="0 0 200 120" aria-hidden="true">
              <circle cx="78" cy="60" r="38" fill="none" stroke="#b48a63" strokeWidth="2.5" />
              <circle cx="122" cy="60" r="38" fill="none" stroke="#d9a9a2" strokeWidth="2.5" />
            </svg>
            <span className="about-arch-text">Colour · Light · Feeling</span>
          </div>
        </Reveal>
        <Reveal>
          <div className="eyebrow"><span className="rule" />ABOUT</div>
          <p className="about-quote">
            I named the studio <em>Barva</em> — colour — because that's what I feel first when a room fills with people
            who love each other. My whole job is catching it before it's gone.
          </p>
          <p className="about-body">
            Eight years directing and shooting across music and life. Cinema-grade cameras, careful light, a colour
            palette built for every couple. Everything you see here was handled start to finish in-house.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
