import nodemailer from "nodemailer";

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

let transport;
function getTransport() {
  if (!process.env.SMTP_HOST) return null;
  transport ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
  return transport;
}

export const mailEnabled = () => Boolean(process.env.SMTP_HOST && process.env.OWNER_EMAIL);

export async function emailOwner(enquiry) {
  const t = getTransport();
  if (!t || !process.env.OWNER_EMAIL) return false;
  const a = enquiry.analysis;
  const rows = [
    ["Names", enquiry.names],
    ["Email", enquiry.email],
    ["Wedding date", enquiry.date || "—"],
    ["Venue / city", enquiry.venue || "—"],
    ["Interested in", enquiry.service || "—"],
    ["Came from", enquiry.source],
  ];
  const html = `
    <h2>New wedding enquiry — ${esc(enquiry.names)}</h2>
    ${a ? `<p><b>${esc(a.priority?.toUpperCase())}</b> · ${esc(a.summary)}</p>` : ""}
    <table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`).join("")}</table>
    <p><b>Message</b><br>${esc(enquiry.message || "—").replace(/\n/g, "<br>")}</p>
    ${a ? `<hr><p><b>Suggested package:</b> ${esc(a.suggested_package)}</p>
    <p><b>Questions to ask:</b></p><ul>${(a.questions_to_ask || []).map((q) => `<li>${esc(q)}</li>`).join("")}</ul>
    <p><b>Draft reply (edit before sending):</b></p><blockquote style="white-space:pre-wrap">${esc(a.draft_reply)}</blockquote>` : ""}
  `;
  await t.sendMail({
    from: process.env.SMTP_FROM || process.env.OWNER_EMAIL,
    to: process.env.OWNER_EMAIL,
    replyTo: enquiry.email,
    subject: `New enquiry: ${enquiry.names}${enquiry.date ? " — " + enquiry.date : ""}`,
    html,
  });
  return true;
}
