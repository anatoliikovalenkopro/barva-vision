import Reveal from "./Reveal.jsx";

export const STUDIO_STEPS = [
  ["01", "Say hello", "Send your idea, date and location. We'll let you know if we're free."],
  ["02", "Plan together", "A relaxed chat about the concept, the look and what you need delivered."],
  ["03", "The shoot", "We handle camera, light and sound so you can focus on what matters."],
  ["04", "Your film", "Edited, colour-graded and delivered in 4K — ready to release and share."],
];

export const WEDDING_STEPS = [
  ["01", "Say hello", "Send your date and a few details. We'll let you know if we're free."],
  ["02", "Plan together", "A relaxed chat about your day, your style and the package that fits."],
  ["03", "Your wedding day", "We film quietly in the background so you can simply enjoy being there."],
  ["04", "Your film", "Colour-graded, edited with music and delivered in 4K, ready to relive."],
];

export default function Process({ steps = STUDIO_STEPS, title = "Simple, calm,", em = "personal", tint = "" }) {
  return (
    <section id="process" className={`section ${tint}`}>
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="eyebrow"><span className="rule" />HOW IT WORKS<span className="rule" /></div>
          <h2>{title} <em>{em}</em></h2>
        </Reveal>
        <div className="steps">
          {steps.map(([n, t, text]) => (
            <Reveal className="step" key={n}>
              <span className="step-n">{n}</span>
              <h3>{t}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
