import {
  Blocks,
  Gauge,
  LayoutTemplate,
  MonitorSmartphone,
  Rocket,
  ShoppingCart,
  Store,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  title: string;
  description: string;
  Icon: LucideIcon;
}

/**
 * Only services backed by the resume. "Website redesign" and "website
 * migration" from the brief are left out until Jayvan confirms them.
 */
export const services: Service[] = [
  {
    title: "WordPress Website Development",
    description:
      "Complete WordPress sites built from your design or brief, with theme and plugin customization in PHP where a page builder isn’t enough.",
    Icon: Blocks,
  },
  {
    title: "Elementor & Page Builder Builds",
    description:
      "Pages built in Elementor, Divi, Beaver Builder, Bricks or WPBakery, set up cleanly so content stays easy to update.",
    Icon: LayoutTemplate,
  },
  {
    title: "Design-to-Website Implementation",
    description:
      "UI/UX designs turned into pixel-perfect, accessible pages that hold up on desktop, tablet and mobile.",
    Icon: MonitorSmartphone,
  },
  {
    title: "WooCommerce Customization",
    description: "WooCommerce stores set up and customized to fit the way you sell.",
    Icon: ShoppingCart,
  },
  {
    title: "Shopify, Webflow & Squarespace",
    description:
      "Sites built and maintained on Shopify (Liquid, Online Store 2.0), Webflow and Squarespace.",
    Icon: Store,
  },
  {
    title: "Landing Pages & GoHighLevel Funnels",
    description:
      "Landing pages, funnels, booking calendars and email/SMS automations in GoHighLevel, connected to your site’s forms.",
    Icon: Rocket,
  },
  {
    title: "Speed & Core Web Vitals",
    description:
      "Finding what slows a site down and fixing it, with on-page SEO basics handled along the way.",
    Icon: Gauge,
  },
  {
    title: "Maintenance & Troubleshooting",
    description:
      "Plugin, theme and content updates on a schedule, plus quick fixes for broken layouts, errors and cross-browser issues.",
    Icon: Wrench,
  },
];
