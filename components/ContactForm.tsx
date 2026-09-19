"use client";

import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { site } from "@/data/site";

// Same EmailJS service, templates and public key the previous site used.
const EMAILJS = {
  service: "service_zq2lat5",
  contactTemplate: "template_ad3cm4k",
  autoReplyTemplate: "template_xtujx6c",
  publicKey: "ZKmUhx9DTtnWyhpHy",
};

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;
    setStatus("sending");

    const data = new FormData(form);
    const templateParams = {
      from_name: String(data.get("from_name") ?? ""),
      from_email: String(data.get("from_email") ?? ""),
      project_type: String(data.get("project_type") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      await emailjs.sendForm(
        EMAILJS.service,
        EMAILJS.contactTemplate,
        form,
        EMAILJS.publicKey,
      );
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.autoReplyTemplate,
        templateParams,
        EMAILJS.publicKey,
      );
      setStatus("sent");
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-sent" role="status">
        <h3>Message sent</h3>
        <p>Thanks for reaching out. We reply within one business day.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="from_name">Name</label>
          <input
            id="from_name"
            name="from_name"
            type="text"
            autoComplete="name"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="from_email">Email</label>
          <input
            id="from_email"
            name="from_email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="project_type">Project type</label>
        <input
          id="project_type"
          name="project_type"
          type="text"
          placeholder="WordPress site, Shopify store, Next.js app"
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required />
      </div>

      {status === "error" && (
        <p className="form-error" role="alert">
          Something went wrong sending your message. Email us directly at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}

      <button
        className="btn btn-primary"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
