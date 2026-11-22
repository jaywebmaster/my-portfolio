"use server";

import { headers } from "next/headers";
import { profile } from "@/data/profile";
import {
  readContactFields,
  validateContact,
  type ContactFields,
  type ContactState,
} from "@/lib/contact";

/** Submissions faster than this after the form rendered are treated as bots. */
const MIN_FILL_MS = 3000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

// Per-instance memory: a best-effort brake on bursts from one address. Each
// serverless instance keeps its own map, so it complements, not replaces, the
// honeypot and timing checks.
const recent = new Map<string, number[]>();

function isRateLimited(key: string, now = Date.now()): boolean {
  const hits = (recent.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > RATE_MAX;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function emailBodies(f: ContactFields) {
  const text = `New message from your portfolio\n\nName: ${f.name}\nEmail: ${f.email}\nSubject: ${f.subject}\n\n${f.message}\n`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
<p style="margin:0 0 16px;color:#666">New message from your portfolio</p>
<p style="margin:0"><strong>Name:</strong> ${escapeHtml(f.name)}</p>
<p style="margin:0"><strong>Email:</strong> ${escapeHtml(f.email)}</p>
<p style="margin:0 0 16px"><strong>Subject:</strong> ${escapeHtml(f.subject)}</p>
<p style="margin:0;white-space:pre-wrap">${escapeHtml(f.message)}</p>
</div>`;
  return { text, html };
}

const SENT: ContactState = {
  status: "success",
  message: "Thanks, your message is on its way. I’ll reply to the email address you gave.",
};

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const fields = readContactFields(form);

  // Spam traps: answer like a success so bots learn nothing.
  if (String(form.get("company") ?? "").trim()) return SENT;
  const startedAt = Number(form.get("startedAt"));
  if (startedAt && Date.now() - startedAt < MIN_FILL_MS) return SENT;

  const fieldErrors = validateContact(fields);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values: fields };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: `That’s a lot of messages in a short time. Please try again in a few minutes, or email ${profile.email}.`,
      values: fields,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; message not sent.");
    return {
      status: "error",
      message: `The form isn’t connected right now. Please email me directly at ${profile.email}.`,
      values: fields,
    };
  }

  const { text, html } = emailBodies(fields);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL || profile.email],
        reply_to: fields.email,
        subject: `Portfolio enquiry: ${fields.subject}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] Resend rejected the message", res.status, await res.text().catch(() => ""));
      throw new Error(`Resend ${res.status}`);
    }
  } catch (error) {
    console.error("[contact] Sending failed", error);
    return {
      status: "error",
      message: `Something went wrong sending your message. Please try again, or email ${profile.email}.`,
      values: fields,
    };
  }

  return SENT;
}
