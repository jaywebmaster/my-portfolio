import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { profile } from "@/data/profile";
import { education } from "@/data/resume";

const focusAreas = [
  { title: "WordPress Development", detail: "Builds, themes and plugins" },
  { title: "Front-End Development", detail: "HTML, CSS, JavaScript, React" },
  { title: "Design Implementation", detail: "Mockups to pixel-perfect pages" },
  { title: "Responsive Development", detail: "Desktop, tablet and mobile" },
  { title: "Website Optimization", detail: "Speed, Core Web Vitals, SEO" },
  { title: "Website Maintenance", detail: "Updates and content changes" },
  { title: "Troubleshooting", detail: "Bugs, errors, compatibility" },
];

export function About() {
  const degree = education[0];
  const facts = [
    { label: "Education", value: degree.credential.replace("Bachelor of Science", "BS"), sub: degree.school },
    { label: "Based in", value: profile.location, sub: `${profile.timezone}, works ${profile.workArrangement}` },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeader
              index="01"
              eyebrow="About"
              titleId="about-title"
              title="I build the site, then I keep it running well."
            />
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 max-w-[38rem] space-y-5 text-[1.0625rem] leading-relaxed text-mute">
              <p>
                For more than {profile.yearsExperience.replace("+", "")} years I’ve built and looked
                after websites for agencies and the businesses they serve. Most projects start with
                a design or a brief and end with a site that matches it pixel for pixel, loads fast
                and works on every screen.
              </p>
              <p>
                Most of my work is in WordPress: building pages in Elementor, Divi, Beaver Builder
                or Bricks, customizing themes and plugins in PHP, and setting up WooCommerce. I also
                build on Shopify, Webflow and Squarespace, work in React and Next.js when a project
                calls for it, and set up GoHighLevel funnels, calendars and automations.
              </p>
              <p>
                After launch I keep sites healthy with plugin, theme and content updates, speed and
                Core Web Vitals work, and quick fixes when something breaks. I work remotely from
                the {profile.location} ({profile.timezone}) and collaborate closely with designers,
                project managers and clients to deliver on schedule and within scope.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <a
              href="#contact"
              className="group mt-9 inline-flex items-center gap-2 font-medium text-paper transition-colors hover:text-accent"
            >
              Let’s work together
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-5">
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/[0.07] bg-ink-850/60 p-6 sm:p-8">
              <h3 className="label-mono font-sans text-mute">What I focus on</h3>
              <ol className="mt-4 divide-y divide-white/[0.06]">
                {focusAreas.map((area, index) => (
                  <li key={area.title} className="flex items-baseline gap-4 py-3.5">
                    <span aria-hidden="true" className="label-mono w-6 shrink-0 text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                      <span className="font-display text-[1.0625rem] font-semibold tracking-tight">
                        {area.title}
                      </span>
                      <span className="text-sm text-mute">{area.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-white/[0.07] bg-ink-850/60 p-5"
                >
                  <dt className="label-mono text-mute">{fact.label}</dt>
                  <dd className="mt-2">
                    <span className="block font-display text-[1.0625rem] font-semibold tracking-tight">
                      {fact.value}
                    </span>
                    <span className="mt-1 block text-sm text-mute">{fact.sub}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
