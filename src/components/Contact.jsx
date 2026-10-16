import { useEffect, useState } from "react";
import { CONTACT } from "../../shared/siteData.js";
import { post } from "../api.js";
import Reveal from "./Reveal.jsx";

const EMPTY = { names: "", email: "", date: "", venue: "", service: "Wedding Film", message: "" };

export default function Contact({ prefill }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [viaMail, setViaMail] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (prefill) setForm((f) => ({ ...f, message: prefill }));
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
    <section id="contact" className="section tint-blush">
      <div className="wrap contact-grid">
        <Reveal>
          <div className="eyebrow"><span className="rule" />CONTACT</div>
          <h2>Let's talk about <em>your day</em></h2>
          <p className="lead">Tell us your date and a little about your wedding. We'll reply personally and let you know if we're available.</p>
          <div className="contact-list">
            <div><span>EMAIL</span><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
            <div><span>PHONE</span><a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>{CONTACT.phone}</a></div>
            <div><span>INSTAGRAM</span><a href="#contact">{CONTACT.instagram}</a></div>
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
                <label><span>YOUR NAMES</span><input value={form.names} onChange={set("names")} required placeholder="Anna & Michael" maxLength={120} /></label>
                <label><span>EMAIL</span><input type="email" value={form.email} onChange={set("email")} required placeholder="you@email.com" /></label>
              </div>
              <div className="form-row">
                <label><span>WEDDING DATE</span><input type="date" value={form.date} onChange={set("date")} /></label>
                <label><span>VENUE / CITY</span><input value={form.venue} onChange={set("venue")} placeholder="City, Province" maxLength={160} /></label>
              </div>
              <label>
                <span>I'M INTERESTED IN</span>
                <select value={form.service} onChange={set("service")}>
                  <option>Wedding Film</option>
                  <option>Wedding Film + Drone</option>
                  <option>Wedding Film + Second Filmmaker</option>
                  <option>Love Story Walk</option>
                  <option>Something else</option>
                </select>
              </label>
              <label><span>TELL US ABOUT YOUR DAY</span><textarea rows="5" value={form.message} onChange={set("message")} placeholder="Guests, style, what matters most to you…" maxLength={3000} /></label>
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
