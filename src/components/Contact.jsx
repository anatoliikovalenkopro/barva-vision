import { useEffect, useState } from "react";
import { CONTACT } from "../../shared/siteData.js";
import { post } from "../api.js";
import Reveal from "./Reveal.jsx";

const SERVICES = [
  "Music Video",
  "Concert / Live Performance",
  "Event",
  "Photography",
  "Wedding Film",
  "Wedding Film + Drone",
  "Wedding Film + Second Filmmaker",
  "Something else",
];

const EMPTY = { names: "", email: "", date: "", venue: "", service: SERVICES[0], message: "" };

export default function Contact({ prefill, about = false }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [viaMail, setViaMail] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const wanted = new URLSearchParams(location.search).get("service");
    if (wanted && SERVICES.includes(wanted)) setForm((f) => ({ ...f, service: wanted }));
  }, []);

  useEffect(() => {
    if (prefill) setForm((f) => ({ ...f, message: prefill, service: /wedding/i.test(prefill) ? "Wedding Film" : f.service }));
  }, [prefill]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await post("/api/enquiry", form);
      setViaMail(res?.via === "mailto");
      setStatus("sent");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="section contact-page">
      <div className="wrap contact-grid">
        <Reveal>
          {about ? (
            <div className="about-mini">
              <div className="eyebrow"><span className="rule" />ABOUT</div>
              <p className="about-mini-quote">
                <em>Barva</em> means colour.
              </p>
              <p className="about-mini-body">
                I'm here to capture your moments as they really feel — so you can keep the memories and relive them again
                and again.
              </p>
            </div>
          ) : (
            <p className="contact-intro">Prefer email or Instagram? Reach us directly — or fill in the form and we'll get back to you.</p>
          )}
          <div className="contact-list">
            <div><span>EMAIL</span><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
            {CONTACT.phone && (
              <div><span>PHONE</span><a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>{CONTACT.phone}</a></div>
            )}
            <div><span>INSTAGRAM</span><a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">{CONTACT.instagram}</a></div>
            <div><span>BASED IN</span><b>{CONTACT.base}</b></div>
            <div><span>AVAILABLE</span><b>{CONTACT.reach}</b></div>
          </div>
        </Reveal>

        <Reveal as="div" className="form-card-wrap">
          {status === "sent" ? (
            <div className="form-card success">
              <h3>{viaMail ? "Almost there!" : "Thank you!"}</h3>
              <p className="lead" style={{ margin: "0 auto" }}>
                {viaMail ? (
                  <>
                    Your email app should now be open with your message ready. Press <b>Send</b> there to reach us.
                    If nothing opened, just email us at <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
                  </>
                ) : (
                  "Your enquiry is with us. We'll reply personally by email — usually within a day or two."
                )}
              </p>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 20 }} onClick={() => { setForm(EMPTY); setStatus("idle"); }}>
                Send another
              </button>
            </div>
          ) : (
            <form className="form-card" onSubmit={submit}>
              <div className="form-row">
                <label><span>YOUR NAME / ARTIST</span><input value={form.names} onChange={set("names")} required placeholder="Your name or band" maxLength={120} /></label>
                <label><span>EMAIL</span><input type="email" value={form.email} onChange={set("email")} required placeholder="you@email.com" /></label>
              </div>
              <div className="form-row">
                <label><span>DATE</span><input type="date" value={form.date} onChange={set("date")} /></label>
                <label><span>VENUE / CITY</span><input value={form.venue} onChange={set("venue")} placeholder="City, Province" maxLength={160} /></label>
              </div>
              <label>
                <span>I'M INTERESTED IN</span>
                <select value={form.service} onChange={set("service")}>
                  {SERVICES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label><span>TELL US ABOUT YOUR PROJECT</span><textarea rows="5" value={form.message} onChange={set("message")} placeholder="The song, the venue, the look you have in mind, what matters most…" maxLength={3000} /></label>
              <button className="btn btn-block" disabled={status === "sending"}>
                {status === "sending" ? <><span className="spinner" />Sending…</> : "Send enquiry"}
              </button>
              {error && <p className="err">{error} You can also email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
