// Night-time stage illustration used inside the viewfinder on the studio pages.
const CROWD_BACK = [10, 52, 94, 136, 262, 304, 346, 388, 430, 472, 514, 556, 598, 640];
const CROWD_FRONT = [-6, 34, 74, 114, 154, 194, 234, 274, 314, 354, 394, 434, 474, 514, 554, 594, 634, 674];

export default function StageArt() {
  return (
    <svg className="stage-art" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b0c10" /><stop offset=".6" stopColor="#171a22" /><stop offset="1" stopColor="#20242e" />
        </linearGradient>
        <linearGradient id="amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".8" /><stop offset="1" stopColor="#dfe8ff" stopOpacity=".05" />
        </linearGradient>
        <linearGradient id="violet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fb4ff" stopOpacity=".5" /><stop offset="1" stopColor="#8fb4ff" stopOpacity=".04" />
        </linearGradient>
        <radialGradient id="glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#e6eeff" stopOpacity=".45" /><stop offset="1" stopColor="#e6eeff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="360" fill="url(#night)" />
      <path d="M0 34 H640" stroke="#363a44" strokeWidth="3" />
      {[90, 190, 450, 550].map((x) => <circle key={x} cx={x} cy="40" r="7" fill="#454a56" />)}
      <path d="M84 46 L96 46 L344 286 L292 286Z" fill="url(#violet)" />
      <path d="M544 46 L556 46 L348 286 L296 286Z" fill="url(#violet)" />
      <path d="M186 46 L196 46 L338 286 L300 286Z" fill="url(#amber)" />
      <path d="M444 46 L454 46 L342 286 L302 286Z" fill="url(#amber)" />
      <ellipse cx="320" cy="250" rx="150" ry="70" fill="url(#glow)" />
      <rect x="0" y="282" width="640" height="24" fill="#15171c" />
      <path d="M0 282 H640" stroke="#c3ccd8" strokeOpacity=".5" strokeWidth="1.5" />
      <path d="M268 282 V196 L294 186" stroke="#0e0a0b" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M254 282 L268 272 L282 282" stroke="#0e0a0b" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g fill="#0e0a0b">
        <circle cx="320" cy="176" r="17" />
        <path d="M298 206 Q320 192 342 206 L348 282 H292Z" />
        <path d="M326 246 L368 198" stroke="#0e0a0b" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="312" cy="256" rx="24" ry="17" transform="rotate(-38 312 256)" />
        <path d="M302 214 Q290 238 306 256" stroke="#0e0a0b" strokeWidth="8" fill="none" strokeLinecap="round" />
      </g>
      <g fill="#12141a">
        {CROWD_BACK.map((x) => (
          <g key={x}><circle cx={x} cy="312" r="12" /><path d={`M${x - 20} 370 Q${x - 18} 328 ${x} 326 Q${x + 18} 328 ${x + 20} 370Z`} /></g>
        ))}
        <path d="M136 326 L122 292" stroke="#12141a" strokeWidth="6" strokeLinecap="round" />
        <path d="M472 326 L488 290" stroke="#12141a" strokeWidth="6" strokeLinecap="round" />
      </g>
      <g fill="#0b0708">
        {CROWD_FRONT.map((x) => (
          <g key={x}><circle cx={x} cy="334" r="13" /><path d={`M${x - 22} 380 Q${x - 20} 350 ${x} 348 Q${x + 20} 350 ${x + 22} 380Z`} /></g>
        ))}
        <path d="M234 348 L248 306" stroke="#0b0708" strokeWidth="7" strokeLinecap="round" />
        <path d="M394 348 L382 310" stroke="#0b0708" strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  );
}
