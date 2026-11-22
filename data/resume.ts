/**
 * Resume content. Primary source: Jayvan_Dorig_Resume_2026.pdf (Sep 2026).
 * The About, Experience, Skills and Resume sections and the downloadable PDF
 * all read from here, so they can't drift apart.
 *
 * Only items backed by Jayvan's own documents are listed. Brief suggestions
 * that no document supports (Advanced Custom Fields, Figma, VS Code) are left
 * out until he confirms them.
 */

export const summary =
  "WordPress and front-end developer with 4+ years of professional experience building, customizing and maintaining responsive, high-performing websites and web applications for agency and direct clients. Works across WordPress, Elementor, WooCommerce, Shopify, Webflow, Squarespace, React and Next.js, and sets up GoHighLevel CRM pipelines, funnels and automations. Strong on performance optimization, SEO best practices, cross-browser compatibility and troubleshooting, and used to working closely with designers, project managers and clients to deliver pixel-perfect work on schedule and within scope.";

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
    company: "TechZ Digital",
    title: "Mid Full-Stack Web Developer",
    period: "2024 – 2026",
    focus: "Client web applications in React and Next.js, plus GoHighLevel CRM builds.",
    highlights: [
      "Developed and maintained scalable, responsive web applications for multiple clients using React, Next.js and modern JavaScript tooling.",
      "Led front-end implementation, translating UI/UX designs into pixel-perfect, accessible interfaces across desktop, tablet and mobile.",
      "Set up and integrated GoHighLevel CRM pipelines, funnels, booking calendars and email/SMS automations for client businesses.",
      "Improved website performance, responsiveness and usability, and resolved front-end bugs and compatibility issues.",
      "Collaborated with designers, project managers and clients to deliver projects on schedule and within scope.",
    ],
    tech: ["React", "Next.js", "JavaScript", "GoHighLevel", "Responsive design"],
  },
  {
    company: "PixelDev",
    title: "Mid Full-Stack Web Developer",
    period: "2022 – 2026",
    focus: "WordPress builds and ongoing care for small-business client sites.",
    highlights: [
      "Built and customized WordPress websites using Elementor, Divi, Beaver Builder, and custom theme and plugin work for varied business needs.",
      "Developed and maintained Shopify, Webflow and Squarespace sites for small-business clients.",
      "Produced responsive, cross-browser layouts compatible across desktop, tablet and mobile devices.",
      "Optimized websites for speed, SEO and Core Web Vitals; troubleshot website issues and implemented efficient fixes.",
      "Handled ongoing website maintenance, content updates, and plugin and theme updates for client accounts.",
    ],
    tech: ["WordPress", "Elementor", "Divi", "Beaver Builder", "PHP", "Shopify", "Webflow", "Squarespace"],
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
    note: "Page builders, themes and plugins, from first build to ongoing care.",
    items: [
      "WordPress",
      "Elementor",
      "Divi",
      "Beaver Builder",
      "Bricks",
      "WPBakery",
      "GeneratePress",
      "WooCommerce",
      "Theme & plugin customization",
    ],
  },
  {
    id: "frontend",
    title: "Front-End Development",
    note: "Clean, responsive markup and modern JavaScript.",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "jQuery",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Responsive web design",
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
    title: "Back-End & Data",
    note: "Enough server-side to customize and connect things properly.",
    items: ["PHP", "Node.js", "MySQL"],
  },
  {
    id: "performance",
    title: "Performance & SEO",
    note: "Fast pages that search engines and visitors can read.",
    items: [
      "PageSpeed & Core Web Vitals",
      "On-page SEO",
      "Cross-browser compatibility",
      "Debugging & testing",
    ],
  },
  {
    id: "workflow",
    title: "Tools & Workflow",
    note: "Version control, deployment and AI-assisted development.",
    items: ["Git", "GitHub", "Vercel", "Claude Code", "GitHub Copilot", "Cursor", "ChatGPT"],
  },
];
