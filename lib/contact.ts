/**
 * Contact form rules, shared by the browser (instant feedback) and the server
 * action (the check that actually counts).
 */
export interface ContactFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 5000 },
} as const;

// Deliberately simple: one @, a dot in the domain, no spaces.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {};
  const { name, email, subject, message } = fields;

  if (name.length < LIMITS.name.min) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name.max) errors.name = `Keep it under ${LIMITS.name.max} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > LIMITS.email.max || !EMAIL.test(email))
    errors.email = "That email address doesn’t look right.";

  if (subject.length < LIMITS.subject.min) errors.subject = "Add a short subject.";
  else if (subject.length > LIMITS.subject.max)
    errors.subject = `Keep it under ${LIMITS.subject.max} characters.`;

  if (message.length < LIMITS.message.min)
    errors.message = `Tell me a little more (at least ${LIMITS.message.min} characters).`;
  else if (message.length > LIMITS.message.max)
    errors.message = `Keep it under ${LIMITS.message.max} characters.`;

  return errors;
}

export function readContactFields(form: FormData): ContactFields {
  const read = (key: keyof ContactFields) => String(form.get(key) ?? "").trim();
  return { name: read("name"), email: read("email"), subject: read("subject"), message: read("message") };
}

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: FieldErrors; values?: ContactFields };
