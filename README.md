# Jayvan Dorig: resume and portfolio

Personal site for Jayvan Dorig, WordPress and web developer. Next.js App Router, TypeScript, Tailwind CSS v4 and Lucide icons, deployed on Vercel. Animation is plain CSS and respects `prefers-reduced-motion`.

## Edit the content

Everything visible comes from `data/`. Change it there once and the site (and the PDF) follow.

| File | Holds |
| --- | --- |
| `data/profile.ts` | Name, titles, email, phone, location, photo, nav items, social links |
| `data/resume.ts` | Summary, experience, education, certifications, skill groups |
| `data/services.ts` | The Services cards |
| `data/projects.ts` | Client sites, which ones are featured, and each project page |
| `data/site.ts` | Page title, description, canonical URL logic |

Projects show a "My role" block only when `role` is filled in, so nothing about Jayvan's contribution is claimed without his confirmation.

## Resume PDF

`public/Jayvan-Dorig-Resume.pdf` is generated from `data/profile.ts` and `data/resume.ts` in a single-column layout that applicant tracking systems read cleanly. Rebuild it after any resume change:

```bash
npm run resume:pdf
```

## Contact form

The form posts to a Server Action (`app/actions/contact.ts`) that validates the fields, drops obvious spam (a hidden honeypot field, a minimum fill time and a per-address rate limit), and sends the message through Resend's REST API with the visitor's address as reply-to. See `.env.example` for the variables. Without `RESEND_API_KEY` the form tells visitors to email directly instead of failing silently.

Setup:

1. Create a Resend account with the address that should receive messages (on the free plan without a verified domain, Resend only delivers to the account's own address).
2. Create an API key with **Sending access**.
3. Local: put `RESEND_API_KEY=...` in `.env.local`. Vercel: add it under Project > Settings > Environment Variables for Production, marked Sensitive.

## Screenshots

Thumbnails live in `public/screenshots/{slug}.webp` (1440x900) with a `{slug}-mobile.webp` companion (390x844).

```bash
npm run screenshots:install             # downloads Chromium once
npm run screenshots                     # captures every project
npm run screenshots -- hirehawk lubar   # only these slugs
```

## Canonical URL

Metadata, Open Graph, `sitemap.xml` and `robots.txt` read the origin from `NEXT_PUBLIC_SITE_URL`. The production default is committed in `.env.production`; a value set in Vercel's Environment Variables overrides it, and if both are missing the build falls back to `VERCEL_PROJECT_PRODUCTION_URL`.

## Develop

```bash
npm run dev
npm run build
npm run lint
```
