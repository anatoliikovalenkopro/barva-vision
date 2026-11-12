// Neutral, out-of-focus "lens" scene for the Home viewfinder — no specific genre.
// Colours hint at each page: pink (music), red (live), blue (events), blush (weddings), white.
const LIGHTS = [
  [12, 30, 70, "#ff4f9a", 0], [30, 70, 90, "#2c4bff", -3], [52, 26, 60, "#ffffff", -6],
  [70, 62, 100, "#e3141f", -2], [88, 28, 66, "#f2d3cd", -5], [42, 82, 54, "#b48cff", -1],
  [82, 86, 48, "#ffffff", -4], [6, 78, 50, "#f2d3cd", -7], [62, 12, 40, "#2c4bff", -8],
];

export default function BokehArt() {
  return (
    <div className="bokeh" aria-hidden="true">
      {LIGHTS.map(([x, y, size, color, delay], i) => (
        <span
          key={i}
          style={{ left: `${x}%`, top: `${y}%`, width: size * 2.2, height: size * 2.2, background: color, animationDelay: `${delay}s` }}
        />
      ))}
      <div className="bokeh-focus">
        <i className="f tl" /><i className="f tr" /><i className="f bl" /><i className="f br" />
        <b>YOUR PROJECT</b>
      </div>
    </div>
  );
}
