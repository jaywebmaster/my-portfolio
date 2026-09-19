/**
 * Single source of truth for the portfolio.
 *
 * Thumbnails are generated into public/screenshots/{slug}.webp by
 * `npm run screenshots`. If a file is missing the card falls back to a
 * branded placeholder, so a screenshot can also be supplied by hand.
 */
export type Platform = "Shopify" | "WordPress" | "Next.js" | "Webflow";

export const PLATFORMS: readonly Platform[] = [
  "Shopify",
  "WordPress",
  "Next.js",
  "Webflow",
];

export interface Project {
  name: string;
  url: string;
  platform: Platform;
  slug: string;
  thumbnail: string;
}

function project(
  platform: Platform,
  slug: string,
  name: string,
  url: string,
): Project {
  return { name, url, platform, slug, thumbnail: `/screenshots/${slug}.webp` };
}

export const projects: Project[] = [
  // Shopify
  project("Shopify", "lubar", "LùBar", "https://www.lubar.it/"),
  project("Shopify", "mirada-firenze", "Mirada Firenze", "https://miradafirenze.it/"),
  project("Shopify", "willow-haven-candles", "Willow Haven Candles", "https://willowhavencandles.com/"),
  project("Shopify", "dimitri-daleno", "Dimitri Daleno", "https://dimitridaleno.com/"),
  project("Shopify", "c2-vehicles", "C2 Vehicles", "https://c2vehicles.com/"),
  project("Shopify", "dalysmooth", "Dalysmooth", "https://dalysmooth.com/"),
  project("Shopify", "upper-aeon", "Upper Aeon", "https://www.upperaeon.com/"),

  // WordPress
  project("WordPress", "leonard-splaine", "Leonard Splaine", "https://www.leonardsplaine.com/"),
  project("WordPress", "majestic-tree-service", "Majestic Tree Service", "https://www.majestictreeservice.com/"),
  project("WordPress", "exact-exteriors", "Exact Exteriors", "https://exactexteriorsllc.com/"),
  project("WordPress", "silver-ridge", "Silver Ridge", "https://www.srdb.ca/"),
  project("WordPress", "hirehawk", "HireHawk", "https://hirehawk.com/"),
  project("WordPress", "outsourced-ph", "Outsourced PH", "https://outsourced.ph/"),
  project("WordPress", "outsourced-co", "Outsourced CO (Global)", "https://outsourced.co/"),
  project("WordPress", "az-pain-medical-clinic", "AZ Pain Medical Clinic LLC", "https://azpainmed.com/"),
  project("WordPress", "pinkys-softwash", "Pinky's Softwash", "https://pinkyssoftwash.com/"),
  project("WordPress", "clements-pools", "Clements Pools", "https://clementspools.com/"),
  project("WordPress", "pilbara-minerals", "Pilbara Minerals", "https://pls.com/"),
  project("WordPress", "bens-paint-supply", "Ben's Paint Supply", "https://www.benspaintsupply.com/"),
  project("WordPress", "sg-credit-partners", "SG Credit Partners", "https://www.sgcreditpartners.com/"),
  project("WordPress", "ultimate-image-spa", "Ultimate Image Spa", "https://ultimateimagemedspa.com/"),
  project("WordPress", "mydose-ai", "Mydose Ai", "https://mydose.ai/"),
  project("WordPress", "disability-advice", "Disability Advice", "https://disabilityadvice.org/"),

  // Next.js
  project("Next.js", "computek", "Computek", "https://computek-six.vercel.app/"),
  project("Next.js", "cosello-construction", "Cosello Construction", "https://www.coselloconstruction.pro/"),
  project("Next.js", "space-coast-cooling", "Space Coast Cooling", "https://www.spacecoastcooling.com/"),

  // Webflow
  project("Webflow", "enroll-here", "Enroll Here", "https://enrollhere.com/"),
];

/** Number of projects per platform, derived from the list above. */
export function countByPlatform(
  list: readonly Pick<Project, "platform">[],
): Record<Platform, number> {
  const counts = Object.fromEntries(PLATFORMS.map((p) => [p, 0])) as Record<
    Platform,
    number
  >;
  for (const item of list) counts[item.platform] += 1;
  return counts;
}

/** CSS-safe key for a platform, e.g. "Next.js" -> "nextjs". */
export function platformKey(platform: Platform): string {
  return platform.toLowerCase().replace(/[^a-z0-9]/g, "");
}
