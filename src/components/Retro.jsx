// Small 60s decorations: a flower and flowing psychedelic stripes.
const STRIPES = ["#b5532f", "#c9963a", "#6f6e3a", "#8c2f25"];

export function Flower({ className = "", petals = "#e0522b", center = "#c8381f", size = 40 }) {
  return (
    <svg className={`flower ${className}`} viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="20" cy="9.5" rx="5.6" ry="9" fill={petals} transform={`rotate(${i * 45} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="6" fill={center} />
      <circle cx="20" cy="20" r="2.4" fill="#f3e3c3" opacity=".8" />
    </svg>
  );
}

export function WavyStripes({ className = "", vertical = false }) {
  if (vertical) {
    return (
      <svg className={`wavy ${className}`} viewBox="0 0 120 600" preserveAspectRatio="none" aria-hidden="true">
        {STRIPES.map((c, i) => {
          const x = 30 + i * 18;
          return <path key={c} d={`M${x} -20 C ${x + 46} 90, ${x - 46} 210, ${x} 300 S ${x + 46} 510, ${x} 620`} stroke={c} strokeWidth="12" fill="none" />;
        })}
      </svg>
    );
  }
  return (
    <svg className={`wavy ${className}`} viewBox="0 0 1200 130" preserveAspectRatio="none" aria-hidden="true">
      {STRIPES.map((c, i) => {
        const y = 40 + i * 16;
        return <path key={c} d={`M-20 ${y} C 160 ${y - 44}, 330 ${y + 44}, 500 ${y} S 820 ${y - 44}, 980 ${y} S 1150 ${y + 30}, 1220 ${y}`} stroke={c} strokeWidth="10" fill="none" />;
      })}
    </svg>
  );
}

// Big psychedelic ribbons (dark outline + colour), like 60s concert posters.
const PSYCH = ["#d9482b", "#ec7a2c", "#f0ad2f", "#7e8a3a", "#6e3f7a", "#c84f8a"];

export function PsychSwirl({ className = "" }) {
  const band = (y0, i, top) => {
    const y = y0 + i * 30;
    return top
      ? `M-80 ${y} C 180 ${y - 110}, 360 ${y + 120}, 620 ${y} S 960 ${y - 120}, 1280 ${y + 40}`
      : `M-80 ${y} C 220 ${y + 90}, 420 ${y - 110}, 700 ${y} S 1010 ${y + 110}, 1280 ${y - 30}`;
  };
  return (
    <svg className={`psych ${className}`} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {PSYCH.map((c, i) => (
        <g key={`t${c}`}>
          <path d={band(30, i, true)} stroke="#1d1312" strokeWidth="34" fill="none" strokeLinecap="round" />
          <path d={band(30, i, true)} stroke={c} strokeWidth="24" fill="none" strokeLinecap="round" />
        </g>
      ))}
      {PSYCH.slice().reverse().map((c, i) => (
        <g key={`b${c}`}>
          <path d={band(560, i, false)} stroke="#1d1312" strokeWidth="34" fill="none" strokeLinecap="round" />
          <path d={band(560, i, false)} stroke={c} strokeWidth="24" fill="none" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}
