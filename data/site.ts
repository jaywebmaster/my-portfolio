/** Site-wide copy and identity. Change the agency name here, once. */
export const site = {
  name: "Portfolio",
  title: "Portfolio — Web Development Work",
  tagline: "Websites built to perform.",
  intro:
    "We design and build websites on WordPress, Shopify, Webflow and Next.js for e-commerce brands, service businesses and clinics, and connect them to GoHighLevel CRM.",
};

/**
 * Canonical origin, without a trailing slash.
 *
 * 1. NEXT_PUBLIC_SITE_URL when set (.env.production, or Vercel > Settings >
 *    Environment Variables, which overrides the file).
 * 2. VERCEL_PROJECT_PRODUCTION_URL, which Vercel injects at build time and
 *    which follows the project's production domain automatically.
 * 3. localhost for local builds.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
