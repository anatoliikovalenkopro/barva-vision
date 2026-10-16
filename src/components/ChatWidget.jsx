import { useEffect, useRef, useState } from "react";
import { post } from "../api.js";

const GREETING = "Hi! I'm the Barva Vision assistant. Ask me about our wedding film packages, the 2027 launch rates, or booking your date.";
const SUGGESTIONS = ["What are your packages?", "Are you free in 2027?", "Do you travel across Canada?"];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, open]);

  const send = async (text) => {
    const content = text.trim();
    if (!content || busy) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const data = await post("/api/chat", { messages: next.filter((m) => m.role !== "system").slice(-12) });
      setMode(data.mode);
      setMessages([
        ...next,
        { role: "assistant", content: data.reply },
        ...(data.leadSent ? [{ role: "system", content: "Your enquiry was sent to the team" }] : []),
      ]);
    } catch (err) {
      setMessages([...next, { role: "assistant", content: err.message }]);
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Open chat assistant">
        <i /> Ask us anything
      </button>
    );
  }

  return (
    <div className="chat-panel" role="dialog" aria-label="Chat assistant">
      <div className="chat-head">
        <div>
          <b>Barva assistant</b>
          <small>{mode === "demo" ? "Quick answers · studio replies personally" : "AI assistant · replies in seconds"}</small>
        </div>
        <button className="chat-x" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
      </div>

      <div className="chat-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role === "user" ? "user" : m.role === "system" ? "sys" : "bot"}`}>{m.content}</div>
        ))}
        {busy && <div className="msg bot typing"><i /><i /><i /></div>}
      </div>

      {messages.length === 1 && (
        <div className="chat-chips">
          {SUGGESTIONS.map((s) => <button key={s} className="example-chip" onClick={() => send(s)}>{s}</button>)}
        </div>
      )}

      <form className="chat-form" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question…" maxLength={500} />
        <button className="chat-send" disabled={busy || !input.trim()} aria-label="Send">→</button>
      </form>
    </div>
  );
}
