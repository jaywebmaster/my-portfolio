/**
 * Resume content. The About, Experience, Skills and Resume sections and the
 * downloadable PDF (npm run resume:pdf) all read from here, so they can't
 * drift apart.
 *
 * Sources: Jayvan_Dorig_Resume_2026.pdf (Sep 2026) for TechZ Digital, PixelDev
 * and education; Jayvan's own project notes and session history for HireHawk,
 * the AOR client work and the personal projects (Jul to Nov 2026). Every figure
 * below was measured in that work; nothing is estimated.
 */

export const summary =
  "WordPress and front-end developer with 4+ years of turning designs into fast, search-friendly websites built to bring in leads. Builds custom themes and plugins, connects the CRM, booking and analytics tools behind them, and keeps sites quick and secure long after launch. Most recently rebuilt HireHawk's website from Webflow into a custom WordPress platform with 100+ SEO landing pages and an AI-ready toolkit plugin. Comfortable across WordPress, Shopify, Webflow, Squarespace, React and Next.js.";

/** Headline numbers for the top of the resume. Each one is backed by the work below. */
export const keyFacts: { value: string; label: string }[] = [
  { value: "4+", label: "years in web development" },
  { value: "30+", label: "client websites" },
  { value: "100+", label: "SEO pages on one platform" },
  { value: "100", label: "Lighthouse score on desktop" },
];

export interface Role {
  company: string;
  title: string;
  period: string;
  /** One line on what the role centred on. */
  focus: string;
  highlights: string[];
  tech: string[];
}

export const experience: Role[] = [
  {
    company: "HireHawk",
    title: "WordPress Developer",
    period: "Jul 2026 – Present",
    focus: "Rebuilt and now run hirehawk.com, a staffing company's lead-generation website, on a custom WordPress platform.",
    highlights: [
      "Rebuilt hirehawk.com from Webflow into a custom WordPress theme built from Figma designs, then migrated it to SiteGround and ran the DNS and SSL cutover for its August 2026 launch.",
      "Scaled the site to 100+ SEO landing pages (role, industry, case study and blog templates) whose copy the marketing team edits in a Google Sheet that syncs into WordPress and Advanced Custom Fields.",
      "Built HireHawk Toolkit, a custom plugin that turns WordPress into an MCP server for AI-assisted site management, with two-way Google Docs sync, Word document import, an analytics dashboard and AI-written lead briefs.",
      "Cut mobile first contentful paint from 4.0s to 1.4s and raised desktop PageSpeed from 77 to 96; added Organization, EmploymentAgency and JobPosting schema, internal linking and automatic IndexNow submissions.",
      "Connected iClosed booking forms, GA4 and Google Tag Manager, a Workable-synced jobs board, a PartnerStack to Zoho CRM affiliate flow and a live candidate search on the company's talent API.",
      "Shipped every change through a staging-first release process over SSH and WP-CLI, with checksum-verified deploys, backups and security audits.",
    ],
    tech: ["WordPress", "PHP", "Advanced Custom Fields", "JavaScript", "Google APIs", "MCP", "SiteGround"],
  },
  {
    company: "AOR",
    title: "Web Developer, Agency Client Projects",
    period: "Sep 2026 – Present",
    focus: "WordPress and Webflow work for the agency's clients, delivered through BugHerd review rounds.",
    highlights: [
      "MicroAge (WordPress, Salient, WPBakery): rebuilt service pages into the agency's WPBakery component system through the WordPress REST API, and built a post templates plugin for blog posts and client stories with PDF and video fields.",
      "MDP Engineering Group (Webflow): fixed responsive layout, navigation, slider and CMS styling issues across the site through the Webflow API, and wrote a Webflow training guide for the client's team.",
    ],
    tech: ["WordPress", "WPBakery", "Salient", "Webflow", "BugHerd"],
  },
  {
    company: "TechZ Digital",
    title: "Mid Full-Stack Web Developer",
    period: "2024 – 2026",
    focus: "Client web applications in React and Next.js, plus GoHighLevel CRM builds.",
    highlights: [
      "Developed and maintained scalable, responsive web applications for multiple clients with React, Next.js and modern JavaScript tooling.",
      "Led front-end implementation, turning UI/UX designs into pixel-perfect, accessible interfaces for desktop, tablet and mobile.",
      "Set up GoHighLevel CRM pipelines, funnels, booking calendars and email/SMS automations for client businesses.",
      "Improved performance and usability, fixed front-end bugs and compatibility issues, and delivered on schedule alongside designers, project managers and clients.",
    ],
    tech: ["React", "Next.js", "JavaScript", "GoHighLevel", "Responsive design"],
  },
  {
    company: "PixelDev",
    title: "Mid Full-Stack Web Developer",
    period: "2022 – 2026",
    focus: "WordPress builds and ongoing care for small-business client sites.",
    highlights: [
      "Built and customized WordPress sites with Elementor, Divi, Beaver Builder and custom theme and plugin work.",
      "Developed and maintained Shopify, Webflow and Squarespace sites for small-business clients.",
      "Optimized sites for speed, SEO and Core Web Vitals, with responsive, cross-browser layouts on every device.",
      "Handled ongoing maintenance: content updates, plugin and theme updates, troubleshooting and fixes.",
    ],
    tech: ["WordPress", "Elementor", "Divi", "Beaver Builder", "PHP", "Shopify", "Webflow", "Squarespace"],
  },
];

export interface PersonalProject {
  name: string;
  /** Omitted for private projects. */
  url?: string;
  summary: string;
}

/** Built on his own time. The PDF lists these; the site's Projects section covers client work. */
export const personalProjects: PersonalProject[] = [
  {
    name: "Portfolio site",
    url: "https://jayvan.vercel.app",
    summary:
      "Next.js 16, TypeScript and Tailwind CSS. Scores 100 in all four Lighthouse categories on desktop, with a Resend contact form and a resume PDF generated from the same data.",
  },
  {
    name: "Linerush",
    url: "https://linerush.vercel.app",
    summary:
      "Browser runner game in development (Next.js, TypeScript, Supabase): deterministic simulation, generated obstacle courses checked by a bot, synthesized audio, touch controls and player accounts.",
  },
  {
    name: "Real-time chat app",
    summary:
      "Invite-only group chat on Next.js and Supabase Realtime with replies, reactions, read receipts, location sharing and an admin page for invite links.",
  },
];

export interface Education {
  credential: string;
  school: string;
  period: string;
}

export const education: Education[] = [
  {
    credential: "Bachelor of Science in Industrial Technology",
    school: "Talisay City College, Cebu",
    period: "2021 – 2025",
  },
  {
    credential: "Senior High School, ICT / Computer Programming",
    school: "VocTech Academy, Cebu City",
    period: "2019 – 2021",
  },
];

/** None on file. The Resume section and PDF hide this block while it's empty. */
export const certifications: string[] = [];

export interface SkillGroup {
  id: string;
  title: string;
  note: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "wordpress",
    title: "WordPress Development",
    note: "Custom themes and plugins, page builders, and the content tools editors live in.",
    items: [
      "WordPress",
      "Custom themes & plugins",
      "Advanced Custom Fields",
      "Gutenberg",
      "WooCommerce",
      "Elementor",
      "Divi",
      "Beaver Builder",
      "Bricks",
      "WPBakery",
      "GeneratePress",
      "Rank Math & Yoast",
      "WP-CLI & REST API",
    ],
  },
  {
    id: "frontend",
    title: "Front-End Development",
    note: "Clean, responsive markup and modern JavaScript.",
    items: [
      "HTML5",
      "CSS3 & SCSS",
      "JavaScript (ES6+)",
      "TypeScript",
      "jQuery",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Responsive & accessible UI",
    ],
  },
  {
    id: "platforms",
    title: "Other Platforms",
    note: "Stores, marketing sites and CRM funnels beyond WordPress.",
    items: ["Shopify (Liquid, OS 2.0)", "Webflow", "Squarespace", "GoHighLevel"],
  },
  {
    id: "backend",
    title: "Back-End & Integrations",
    note: "The server side and the business tools a site has to talk to.",
    items: [
      "PHP",
      "Node.js",
      "MySQL",
      "Supabase",
      "REST APIs",
      "Google Sheets, Docs & Drive APIs",
      "Zoho CRM",
      "iClosed",
      "PartnerStack",
      "Workable",
    ],
  },
  {
    id: "performance",
    title: "Performance & SEO",
    note: "Fast pages that search engines and visitors can read.",
    items: [
      "Core Web Vitals & PageSpeed",
      "Technical SEO",
      "Schema.org structured data",
      "GA4 & Google Tag Manager",
      "IndexNow",
      "Cross-browser testing",
      "Debugging",
    ],
  },
  {
    id: "workflow",
    title: "Tools & AI",
    note: "Version control, hosting, testing and AI-assisted development.",
    items: [
      "Git & GitHub",
      "Vercel",
      "SiteGround",
      "SSH",
      "Playwright",
      "Lighthouse",
      "Claude Code",
      "MCP servers",
      "Claude API",
      "GitHub Copilot",
      "Cursor",
      "ChatGPT",
    ],
  },
];
