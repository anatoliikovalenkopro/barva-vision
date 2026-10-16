import { useEffect, useState } from "react";

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("bv-admin") || "");
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");

  const load = async (t) => {
    setError("");
    try {
      const res = await fetch("/api/admin/enquiries", { headers: { Authorization: `Bearer ${t}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load");
      sessionStorage.setItem("bv-admin", t);
      setItems(data.enquiries);
    } catch (err) {
      setItems(null);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) load(token);
  }, []);

  return (
    <div className="admin">
      <a href="#home" className="u" style={{ fontSize: 13 }}>← Back to site</a>
      <h1 style={{ marginTop: 18 }}>Enquiries</h1>
      <p className="admin-meta">New messages from the contact form and the chat assistant, with an AI summary and a draft reply.</p>

      {!items && (
        <form className="admin-card" onSubmit={(e) => { e.preventDefault(); load(token); }}>
          <label className="field">
            <span>ADMIN TOKEN</span>
            <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="From ADMIN_TOKEN in .env" />
          </label>
          <button className="btn btn-sm" style={{ marginTop: 14 }}>Open</button>
          {error && <p className="err">{error}</p>}
        </form>
      )}

      {items && items.length === 0 && <div className="admin-card">No enquiries yet.</div>}

      {items?.map((e) => (
        <article className="admin-card" key={e.id}>
          <h3>
            {e.analysis?.priority && <span className={`badge ${e.analysis.priority}`}>{e.analysis.priority}</span>}
            {e.names}
          </h3>
          <div className="admin-meta">
            {new Date(e.receivedAt).toLocaleString()} · via {e.source} · <a href={`mailto:${e.email}`}>{e.email}</a>
          </div>
          <div className="admin-meta">Date: {e.date || "—"} · Venue: {e.venue || "—"} · Interested in: {e.service || "—"}</div>
          {e.message && <pre>{e.message}</pre>}
          {e.analysis && (
            <>
              <p style={{ marginTop: 14 }}><b>Summary:</b> {e.analysis.summary}</p>
              <p><b>Suggested package:</b> {e.analysis.suggested_package}</p>
              {e.analysis.questions_to_ask?.length > 0 && (
                <p><b>Ask:</b> {e.analysis.questions_to_ask.join(" · ")}</p>
              )}
              <p style={{ marginTop: 10 }}><b>Draft reply</b></p>
              <pre>{e.analysis.draft_reply}</pre>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 10 }} onClick={() => navigator.clipboard?.writeText(e.analysis.draft_reply)}>Copy draft</button>
            </>
          )}
        </article>
      ))}
    </div>
  );
}
