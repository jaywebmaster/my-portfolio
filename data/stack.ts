export interface StackGroup {
  title: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    title: "Platforms & Frameworks",
    items: [
      "WordPress",
      "Shopify (Liquid, Online Store 2.0)",
      "Webflow",
      "Squarespace",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "PHP",
      "MySQL",
      "Vercel",
    ],
  },
  {
    title: "CRM & Marketing Automation",
    items: [
      "GoHighLevel (GHL)",
      "CRM setup and pipelines",
      "Funnels and landing pages",
      "Booking calendars",
      "Email and SMS automations",
      "Form, webhook and website integrations",
    ],
  },
  {
    title: "AI-assisted development",
    items: [
      "ChatGPT",
      "Claude",
      "Codex",
      "Gemini",
      "Claude Code",
      "GitHub Copilot",
      "Cursor",
    ],
  },
];
