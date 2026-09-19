# Portfolio

Client-facing showcase of the websites we have built, grouped by platform (Shopify, WordPress, Next.js, Webflow). Next.js App Router, plain CSS with custom properties, deployed on Vercel.

## Edit the content

- `data/projects.ts` is the single source of truth for the Work grid. Add or remove a site there; tab counts, stats and the OG image follow.
- `data/stack.ts` holds the two Stack groups.
- `data/site.ts` holds the agency name, tagline, intro line, email and social links.

## Screenshots

Thumbnails live in `public/screenshots/{slug}.webp` (1440x900) with a `{slug}-mobile.webp` companion (390x844).

```bash
npm run screenshots:install   # downloads Chromium once
npm run screenshots           # captures every project
npm run screenshots -- hirehawk lubar   # only these slugs
```

Sites that fail to capture (timeouts, bot walls) are listed in `scripts/screenshots-report.json` and in the console. Drop a hand-made `public/screenshots/{slug}.webp` in place and the card picks it up on the next build; until then the card shows a branded placeholder.

## Canonical URL

Metadata, Open Graph, `sitemap.xml` and `robots.txt` read the origin from `NEXT_PUBLIC_SITE_URL`. The production default is committed in `.env.production` (`https://portfolio-webmaster.vercel.app`); a value set in Vercel's Environment Variables overrides it, and if both are missing the build falls back to `VERCEL_PROJECT_PRODUCTION_URL`.

## Develop

```bash
npm run dev
npm run build
npm run lint
```
