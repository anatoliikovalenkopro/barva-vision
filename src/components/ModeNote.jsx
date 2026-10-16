export default function ModeNote({ mode }) {
  if (mode === "ai") return <p className="mode-note"><b>AI-assisted</b> · suggestions only — we'll confirm everything personally.</p>;
  if (mode === "demo") return <p className="mode-note">A starting suggestion — we'll refine everything together.</p>;
  return null;
}
