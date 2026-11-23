/**
 * Who Jayvan is and how to reach him. Every section, the footer and the
 * structured data read from here, so a change of number or title happens once.
 */
export const profile = {
  name: "Jayvan Dorig",
  titles: ["WordPress Developer", "Web Developer", "Full-Stack Developer"],
  email: "jayvan.webmaster@gmail.com",
  phone: {
    /** International format so clients outside the Philippines can dial it. */
    display: "+63 992 974 8359",
    href: "tel:+639929748359",
  },
  /** Primary public address of this portfolio, printed on the resume PDF. */
  website: "https://jayvan.vercel.app",
  location: "Philippines",
  timezone: "UTC+8",
  availability: "Available for remote work worldwide",
  workArrangement: "100% remote",
  yearsExperience: "4+",
  photo: {
    src: "/images/jayvan-dorig.jpg",
    width: 1060,
    height: 1484,
    alt: "Portrait of Jayvan Dorig in a white shirt against an orange backdrop",
  },
} as const;

export const mailto = `mailto:${profile.email}`;

/** Public profiles listed on Jayvan's resume. */
export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jayvan-dorig-15243b280/" },
  { label: "GitHub", href: "https://github.com/jaywebmaster" },
] as const;

/** Built from data/resume.ts by `npm run resume:pdf`; rerun it after editing the resume. */
export const resumePdf = "/Jayvan-Dorig-Resume.pdf";

/** In-page sections, in the order they appear. Drives the nav and its active state. */
export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];
