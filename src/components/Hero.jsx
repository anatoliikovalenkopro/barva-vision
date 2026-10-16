import { useState } from "react";

export default function Hero() {
  const [hasPhoto, setHasPhoto] = useState(true);

  return (
    <section id="home" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy-col">
          <div className="eyebrow"><span className="rule" />BASED IN ALBERTA · AVAILABLE ACROSS CANADA</div>
          <h1>Your wedding day,<br />told as a <em>film</em>.</h1>
          <p className="lead">
            Soft light, honest emotion and a story you'll want to watch again and again. Barva Vision films
            weddings the way you remember them — not staged, just felt.
          </p>
          <div className="hero-actions">
            <a className="btn" href="#contact">Check your date</a>
            <a className="btn btn-ghost" href="#plan">Plan your film</a>
          </div>
          <div className="hero-facts">
            <div><strong>4K</strong><span>cinematic delivery</span></div>
            <div><strong>Free</strong><span>planning tools</span></div>
            <div><strong>2027</strong><span>now booking</span></div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="arch">
            {hasPhoto && (
              <img className="arch-photo" src="/hero-couple.jpg" alt="Wedding couple" onError={() => setHasPhoto(false)} />
            )}
            <svg className="couple-art" viewBox="0 0 400 520" aria-hidden="true">
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#f7d9d4" /><stop offset=".55" stopColor="#efe3ef" /><stop offset="1" stopColor="#dfe9e3" />
                </linearGradient>
                <linearGradient id="dress" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#fffdfa" /><stop offset="1" stopColor="#f1e4dc" />
                </linearGradient>
              </defs>
              <rect width="400" height="520" fill="url(#sky)" />
              <circle cx="290" cy="150" r="70" fill="#fff6ea" opacity=".75" />
              <circle cx="290" cy="150" r="110" fill="#fff6ea" opacity=".3" />
              <path d="M0 430 Q120 380 220 420 T400 400 V520 H0Z" fill="#cddbc8" />
              <path d="M0 470 Q140 430 260 465 T400 450 V520 H0Z" fill="#b9cdb5" />
              <g>
                <circle cx="150" cy="215" r="24" fill="#5b4747" />
                <path d="M118 262 Q150 246 182 262 L190 440 H110Z" fill="#5b4747" />
                <path d="M150 252 L140 300 L150 330 L160 300Z" fill="#f6efe8" />
                <path d="M150 262 L144 276 L150 290 L156 276Z" fill="#e8b9b3" />
                <rect x="114" y="436" width="30" height="46" rx="6" fill="#4a3a3a" />
                <rect x="156" y="436" width="30" height="46" rx="6" fill="#4a3a3a" />
              </g>
              <g>
                <path d="M232 205 Q262 150 292 215 L300 330 Q262 345 226 330Z" fill="#fffdfa" opacity=".85" />
                <circle cx="262" cy="214" r="22" fill="#6b5252" />
                <path d="M240 258 Q262 246 284 258 L292 300 Q262 312 232 300Z" fill="url(#dress)" />
                <path d="M232 300 Q262 312 292 300 L335 470 Q262 500 190 470Z" fill="url(#dress)" />
                <path d="M262 300 L262 470" stroke="#eadbd0" strokeWidth="2" opacity=".7" />
                <circle cx="214" cy="326" r="13" fill="#e8b9b3" /><circle cx="204" cy="318" r="9" fill="#f3cfc9" /><circle cx="222" cy="318" r="9" fill="#dca69f" />
                <path d="M214 336 L210 372" stroke="#8fa88a" strokeWidth="3" />
              </g>
            </svg>
            <div className="arch-stamp"><span>NOW BOOKING</span><strong>2027</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}
