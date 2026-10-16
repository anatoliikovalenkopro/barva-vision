import Reveal from "./Reveal.jsx";

const STEPS = [
  ["01", "Say hello", "Send your date and a few details. We'll let you know if we're free."],
  ["02", "Plan together", "A relaxed chat about your day, your style and the package that fits."],
  ["03", "Your wedding day", "We film quietly in the background so you can simply enjoy being there."],
  ["04", "Your film", "Colour-graded, edited with music and delivered in 4K, ready to relive."],
];

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="eyebrow"><span className="rule" />HOW IT WORKS<span className="rule" /></div>
          <h2>Simple, calm, <em>personal</em></h2>
        </Reveal>
        <div className="steps">
          {STEPS.map(([n, title, text]) => (
            <Reveal className="step" key={n}>
              <span className="step-n">{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
