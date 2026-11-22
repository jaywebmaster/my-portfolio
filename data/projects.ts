/**
 * Client sites shown in the Projects section and on /projects/[slug].
 *
 * Sources: Jayvan's earlier portfolio list and his Fiverr portfolio PDF.
 * `summary` describes the business in the site's own terms (checked against
 * each live homepage on 2026-11-22). `stack` lists only what the live site's
 * markup shows. `role` stays empty until Jayvan confirms what he did on that
 * site; the UI shows no role claim without it.
 *
 * Screenshots: public/screenshots/{slug}.webp (1440x900) and
 * {slug}-mobile.webp (390x844), captured with `npm run screenshots`.
 */
export type Platform = "WordPress" | "Shopify" | "Webflow" | "Next.js";

export const PLATFORMS: readonly Platform[] = ["WordPress", "Shopify", "Webflow", "Next.js"];

export interface Project {
  slug: string;
  name: string;
  url: string;
  platform: Platform;
  industry: string;
  location?: string;
  summary: string;
  stack: string[];
  /** Shown as a large card on the home page. */
  featured?: boolean;
  /** Jayvan's contribution, only once he has confirmed it. */
  role?: string;
  thumbnail: string;
  mobileThumbnail: string;
}

type ProjectInput = Omit<Project, "thumbnail" | "mobileThumbnail">;

function project(input: ProjectInput): Project {
  return {
    ...input,
    thumbnail: `/screenshots/${input.slug}.webp`,
    mobileThumbnail: `/screenshots/${input.slug}-mobile.webp`,
  };
}

export const projects: Project[] = [
  // Featured (provisional until Jayvan picks his 6–8 and confirms his role).
  project({
    slug: "cville-gutter-pros",
    name: "Charlottesville Gutter Pros",
    url: "https://cvillegutterpros.com/",
    platform: "WordPress",
    industry: "Home services",
    location: "Charlottesville, VA",
    summary:
      "Gutter cleaning, repair, guards and underground drain cleaning, with instant pricing and online booking.",
    stack: ["WordPress", "Elementor"],
    featured: true,
  }),
  project({
    slug: "hirehawk",
    name: "HireHawk",
    url: "https://hirehawk.com/",
    platform: "WordPress",
    industry: "Staffing",
    summary: "Staffing agency placing vetted US and global hires for growing companies.",
    stack: ["WordPress"],
    featured: true,
  }),
  project({
    slug: "atlantic-ae",
    name: "Atlantic AE",
    url: "https://atlantic-ae.com/",
    platform: "WordPress",
    industry: "Architecture",
    location: "United States",
    summary: "Nationwide commercial architecture firm offering design, planning and project delivery.",
    stack: ["WordPress", "Elementor"],
    featured: true,
  }),
  project({
    slug: "phlash-consulting",
    name: "Phlash Consulting",
    url: "https://phlashconsulting.com/",
    platform: "WordPress",
    industry: "Digital marketing",
    summary: "Digital marketing team that helps local service businesses grow with technology.",
    stack: ["WordPress"],
    featured: true,
  }),
  project({
    slug: "majestic-tree-service",
    name: "Majestic Tree Service",
    url: "https://www.majestictreeservice.com/",
    platform: "WordPress",
    industry: "Tree care",
    location: "San Jose, CA",
    summary: "Tree care for homes and businesses across San Jose and the Bay Area.",
    stack: ["WordPress", "Elementor"],
    featured: true,
  }),
  project({
    slug: "lubar",
    name: "LùBar",
    url: "https://www.lubar.it/",
    platform: "Shopify",
    industry: "Hospitality",
    location: "Milan, Italy",
    summary: "Mediterranean restaurants, events and catering in Milan.",
    stack: ["Shopify"],
    featured: true,
  }),
  project({
    slug: "cosello-construction",
    name: "Cosello Construction",
    url: "https://www.coselloconstruction.pro/",
    platform: "Next.js",
    industry: "Construction",
    location: "NJ, PA & DE",
    summary: "Window and door replacement and installation across New Jersey, Pennsylvania and Delaware.",
    stack: ["Next.js"],
    featured: true,
  }),
  project({
    slug: "enroll-here",
    name: "EnrollHere",
    url: "https://enrollhere.com/",
    platform: "Webflow",
    industry: "Insurance software",
    summary:
      "Insurance software for agents, agencies and carriers to manage leads, compliance, reporting and commissions.",
    stack: ["Webflow"],
    featured: true,
  }),

  // WordPress
  project({
    slug: "outsourced-ph",
    name: "Outsourced PH",
    url: "https://outsourced.ph/",
    platform: "WordPress",
    industry: "Outsourcing",
    location: "Philippines",
    summary: "ISO-certified remote staffing provider building dedicated offshore teams in the Philippines.",
    stack: ["WordPress"],
  }),
  project({
    slug: "outsourced-co",
    name: "Outsourced.co",
    url: "https://outsourced.co/",
    platform: "WordPress",
    industry: "Outsourcing",
    summary:
      "Dedicated offshore staffing across the Philippines, India, Vietnam, Malaysia, Argentina and Colombia.",
    stack: ["WordPress"],
  }),
  project({
    slug: "silver-ridge",
    name: "Silver Ridge Design Build",
    url: "https://www.srdb.ca/",
    platform: "WordPress",
    industry: "Construction",
    location: "London, ON",
    summary: "Custom home builder for new homes, additions and remodels in London, Ontario.",
    stack: ["WordPress", "Elementor"],
  }),
  project({
    slug: "leonard-splaine",
    name: "Leonard Splaine Co.",
    url: "https://www.leonardsplaine.com/",
    platform: "WordPress",
    industry: "HVAC",
    location: "Northern Virginia",
    summary: "Family-owned heating, air conditioning, water heater and electrical company.",
    stack: ["WordPress"],
  }),
  project({
    slug: "exact-exteriors",
    name: "Exact Exteriors",
    url: "https://exactexteriorsllc.com/",
    platform: "WordPress",
    industry: "Roofing",
    location: "Providence, RI",
    summary: "Roofing, painting and construction company in Providence, Rhode Island.",
    stack: ["WordPress"],
  }),
  project({
    slug: "az-pain-medical-clinic",
    name: "AZ Pain Medical Clinic",
    url: "https://azpainmed.com/",
    platform: "WordPress",
    industry: "Healthcare",
    summary: "Pain management clinic focused on fast, effective pain relief.",
    stack: ["WordPress", "Elementor"],
  }),
  project({
    slug: "pinkys-softwash",
    name: "Pinky’s Softwash",
    url: "https://pinkyssoftwash.com/",
    platform: "WordPress",
    industry: "Exterior cleaning",
    location: "Sugar Land, TX",
    summary: "Exterior cleaning, pressure washing and roof cleaning across Sugar Land and Greater Houston.",
    stack: ["WordPress", "Elementor"],
  }),
  project({
    slug: "clements-pools",
    name: "Clements Pool Services",
    url: "https://clementspools.com/",
    platform: "WordPress",
    industry: "Pool services",
    location: "Lake County, FL",
    summary: "Pool cleaning, maintenance, repair and remodeling in Lake County, Florida.",
    stack: ["WordPress"],
  }),
  project({
    slug: "pilbara-minerals",
    name: "Pilbara Minerals",
    url: "https://pls.com/",
    platform: "WordPress",
    industry: "Mining",
    location: "Australia",
    summary: "Corporate website for an Australian lithium producer.",
    stack: ["WordPress"],
  }),
  project({
    slug: "bens-paint-supply",
    name: "Ben’s Paint Supply",
    url: "https://www.benspaintsupply.com/",
    platform: "WordPress",
    industry: "Retail",
    summary: "Paint and painting-supply store.",
    stack: ["WordPress", "Elementor"],
  }),
  project({
    slug: "sg-credit-partners",
    name: "SG Credit Partners",
    url: "https://www.sgcreditpartners.com/",
    platform: "WordPress",
    industry: "Finance",
    summary: "Credit platform providing flexible financing to lower-middle-market companies.",
    stack: ["WordPress", "Beaver Builder"],
  }),
  project({
    slug: "ultimate-image-spa",
    name: "Ultimate Image MedSpa",
    url: "https://ultimateimagemedspa.com/",
    platform: "WordPress",
    industry: "Med spa",
    location: "Dallas, TX",
    summary: "Medical spa offering microneedling and aesthetic treatments in Dallas–Fort Worth.",
    stack: ["WordPress", "Elementor"],
  }),
  project({
    slug: "mydose-ai",
    name: "MyDose",
    url: "https://mydose.ai/",
    platform: "WordPress",
    industry: "Telehealth",
    summary: "Infrastructure platform for launching and running telehealth businesses.",
    stack: ["WordPress", "Bricks"],
  }),
  project({
    slug: "disability-advice",
    name: "Disability Advice",
    url: "https://disabilityadvice.org/",
    platform: "WordPress",
    industry: "Legal & benefits",
    summary: "Helps people claim financial benefits for disabilities that keep them from working.",
    stack: ["WordPress", "Elementor"],
  }),
  project({
    slug: "love-inc-cv",
    name: "Love INC Cedar Valley",
    url: "https://loveinccv.org/",
    platform: "WordPress",
    industry: "Nonprofit",
    location: "Cedar Valley, IA",
    summary: "Faith-based nonprofit connecting local churches with neighbors in need.",
    stack: ["WordPress", "Elementor"],
  }),
  project({
    slug: "cherie-inn",
    name: "Cherie Inn",
    url: "https://cherieinn.com/",
    platform: "WordPress",
    industry: "Restaurant",
    summary: "European-style café known for homemade cuisine and professional service.",
    stack: ["WordPress", "Elementor"],
  }),
  project({
    slug: "cooper-pg",
    name: "Cooper People Group",
    url: "https://cooperpg.com/",
    platform: "WordPress",
    industry: "HR consulting",
    summary: "HR consulting covering recruiting, compliance, culture and leadership.",
    stack: ["WordPress", "Elementor"],
  }),
  project({
    slug: "next-step-wm",
    name: "Next Step West Michigan",
    url: "https://nextstep-wm.org/",
    platform: "WordPress",
    industry: "Nonprofit",
    location: "West Michigan",
    summary: "Faith-based social enterprise providing job skills training and employment.",
    stack: ["WordPress", "Elementor"],
  }),

  // Shopify
  project({
    slug: "mirada-firenze",
    name: "Mirada Firenze",
    url: "https://miradafirenze.it/",
    platform: "Shopify",
    industry: "Fashion",
    location: "Florence, Italy",
    summary: "Made-in-Italy women’s clothing and hair accessories.",
    stack: ["Shopify"],
  }),
  project({
    slug: "willow-haven-candles",
    name: "Willow Haven Candles",
    url: "https://willowhavencandles.com/",
    platform: "Shopify",
    industry: "Home goods",
    summary: "Hand-crafted natural soy wax candles made without toxic chemicals.",
    stack: ["Shopify"],
  }),
  project({
    slug: "dimitri-daleno",
    name: "Dimitri Daleno",
    url: "https://dimitridaleno.com/",
    platform: "Shopify",
    industry: "Jewelry",
    location: "Italy",
    summary: "Luxury body jewelry made from hypoallergenic, high-grade materials.",
    stack: ["Shopify"],
  }),
  project({
    slug: "c2-vehicles",
    name: "C2 Vehicles",
    url: "https://c2vehicles.com/",
    platform: "Shopify",
    industry: "Automotive",
    location: "New England",
    summary: "Golf cart dealer for new and pre-owned carts, with service, rentals and parts.",
    stack: ["Shopify"],
  }),
  project({
    slug: "dalysmooth",
    name: "Dalysmooth",
    url: "https://dalysmooth.com/",
    platform: "Shopify",
    industry: "Personal care",
    summary: "Premium beard and skin care brand.",
    stack: ["Shopify"],
  }),
  project({
    slug: "upper-aeon",
    name: "Upper Aeon",
    url: "https://www.upperaeon.com/",
    platform: "Shopify",
    industry: "Wellness",
    summary: "Wellness store for EMF protection, light therapy and supplements.",
    stack: ["Shopify"],
  }),

  // Next.js
  project({
    slug: "space-coast-cooling",
    name: "Space Coast Cooling",
    url: "https://www.spacecoastcooling.com/",
    platform: "Next.js",
    industry: "HVAC & plumbing",
    location: "Brevard County, FL",
    summary: "Family-owned AC repair, HVAC and plumbing company serving Brevard County since 1994.",
    stack: ["Next.js"],
  }),

  // Webflow
  project({
    slug: "aarons-leak-detection",
    name: "Aaron’s Leak Detection",
    url: "https://www.aaronsleakdetection.com/",
    platform: "Webflow",
    industry: "Pool services",
    location: "Central Florida",
    summary: "Pool leak detection and repair specialists in Central Florida since 2001.",
    stack: ["Webflow"],
  }),
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Number of projects per platform, derived from the list above. */
export function countByPlatform(
  list: readonly Pick<Project, "platform">[],
): Record<Platform, number> {
  const counts = Object.fromEntries(PLATFORMS.map((p) => [p, 0])) as Record<Platform, number>;
  for (const item of list) counts[item.platform] += 1;
  return counts;
}

/** Display host without protocol or trailing slash, e.g. "hirehawk.com". */
export function displayHost(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}
