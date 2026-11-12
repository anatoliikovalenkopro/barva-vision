import { useEffect, useState } from "react";
import StageArt from "./StageArt.jsx";
import BokehArt from "./BokehArt.jsx";

// A camera-viewfinder frame: REC dot, running timecode, format label.
export default function Viewfinder({ label = "4K · 24 FPS", photo, scene = "stage" }) {
  const [frames, setFrames] = useState(0);
  const [hasPhoto, setHasPhoto] = useState(Boolean(photo));

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => setFrames((f) => f + 1), 1000 / 24);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");
  const total = frames + 24 * 207;
  const tc = `${pad(Math.floor(total / 86400) % 24)}:${pad(Math.floor(total / 1440) % 60)}:${pad(Math.floor(total / 24) % 60)}:${pad(total % 24)}`;

  return (
    <div className="viewfinder">
      {scene === "bokeh" ? <BokehArt /> : <StageArt />}
      {hasPhoto && <img className="vf-photo" src={photo} alt="" onError={() => setHasPhoto(false)} />}
      <span className="vf-corner tl" /><span className="vf-corner tr" /><span className="vf-corner bl" /><span className="vf-corner br" />
      <div className="vf-top"><span className="vf-rec"><i />REC</span><span>{tc}</span></div>
      <div className="vf-bottom"><span>{label}</span><span>BARVA VISION</span></div>
    </div>
  );
}
