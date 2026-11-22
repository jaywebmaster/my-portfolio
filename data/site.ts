/** Site-wide identity used by metadata, Open Graph and structured data. */
export const site = {
  name: "Jayvan Dorig",
  title: "Jayvan Dorig | WordPress Developer & Web Developer",
  tagline: "Building modern, high-performing websites for businesses.",
  intro:
    "Jayvan Dorig is an experienced WordPress and Web Developer specializing in modern, responsive, and high-performing websites for businesses worldwide.",
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
