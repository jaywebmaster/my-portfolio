"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { sendContact } from "@/app/actions/contact";
import {
  LIMITS,
  readContactFields,
  validateContact,
  type ContactFields,
  type ContactState,
  type FieldErrors,
} from "@/lib/contact";

const initialState: ContactState = { status: "idle" };

const inputBase =
  "w-full rounded-xl border bg-ink-900/70 px-4 text-[0.9375rem] text-paper placeholder:text-faint transition-[border-color,box-shadow] duration-200 outline-none focus:border-accent/70 focus:shadow-[0_0_0_4px_rgb(244_138_66/0.12)]";

function Field({
  name,
  label,
  error,
  children,
}: {
  name: keyof ContactFields;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} className="mb-2 block text-sm font-medium text-paper-dim">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`contact-${name}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-danger">
          <CircleAlert aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const startedAtRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Stamp when the form became interactive (read by the server's timing check).
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  const serverErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const errors: FieldErrors = { ...serverErrors, ...clientErrors };
  const values = state.status === "error" ? state.values : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validateContact(readContactFields(new FormData(event.currentTarget)));
    setClientErrors(found);
    if (Object.keys(found).length > 0) {
      event.preventDefault();
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }

  // Clear a field's client error as soon as the visitor edits it.
  function clearError(name: keyof ContactFields) {
    if (!clientErrors[name]) return;
    setClientErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  const describedBy = (name: keyof ContactFields) => (errors[name] ? `contact-${name}-error` : undefined);
  const borderFor = (name: keyof ContactFields) =>
    errors[name] ? "border-danger/70" : "border-white/10 hover:border-white/20";

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-3xl border border-white/[0.08] bg-ink-850/80 p-6 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)] sm:p-8"
      aria-describedby="contact-status"
    >
      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Name" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name.max}
            defaultValue={values?.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            onChange={() => clearError("name")}
            className={`${inputBase} ${borderFor("name")} h-12`}
            placeholder="Your name"
          />
        </Field>
        <Field name="email" label="Email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={LIMITS.email.max}
            defaultValue={values?.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            onChange={() => clearError("email")}
            className={`${inputBase} ${borderFor("email")} h-12`}
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field name="subject" label="Subject" error={errors.subject}>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            maxLength={LIMITS.subject.max}
            defaultValue={values?.subject}
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={describedBy("subject")}
            onChange={() => clearError("subject")}
            className={`${inputBase} ${borderFor("subject")} h-12`}
            placeholder="New WordPress site, fixes, maintenance…"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field name="message" label="Message" error={errors.message}>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            maxLength={LIMITS.message.max}
            defaultValue={values?.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message")}
            onChange={() => clearError("message")}
            className={`${inputBase} ${borderFor("message")} resize-y py-3 leading-relaxed`}
            placeholder="A few lines about the project, timeline and anything I should look at."
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div id="contact-status" role="status" aria-live="polite" className="text-sm">
          {state.status === "success" ? (
            <p className="flex items-start gap-2 text-signal">
              <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {state.message}
            </p>
          ) : state.status === "error" && Object.keys(clientErrors).length === 0 ? (
            <p className="flex items-start gap-2 text-danger">
              <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {state.message}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[0.9375rem] font-medium text-ink-950 shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_12px_32px_-12px_rgb(244_138_66/0.7)] transition-[background-color,transform] duration-300 hover:bg-accent-bright active:scale-[0.98] disabled:cursor-progress disabled:opacity-70"
        >
          {pending ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
