import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { PLATFORMS, countByPlatform, projects } from "@/data/projects";
import { site } from "@/data/site";
import { stackGroups } from "@/data/stack";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { WorkGrid } from "@/components/WorkGrid";

/** Resolved at build time: a card shows a placeholder when its screenshot is missing. */
function thumbnailExists(thumbnail: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", thumbnail));
}

/** Screenshots shown as floating browser windows in the hero, desktop only. */
const HERO_SHOT_SLUGS = ["willow-haven-candles", "hirehawk", "space-coast-cooling"];

export default function Home() {
  const work = projects.map((p) => ({
    ...p,
    hasThumbnail: thumbnailExists(p.thumbnail),
  }));
  const counts = countByPlatform(projects);
  const platformsUsed = PLATFORMS.filter((p) => counts[p] > 0).length;
  const heroShots = HERO_SHOT_SLUGS.map((slug) =>
    work.find((p) => p.slug === slug),
  ).filter((p): p is (typeof work)[number] => Boolean(p && p.hasThumbnail));

  // Last word of the tagline gets the gradient accent.
  const taglineWords = site.tagline.split(" ");
  const taglineLast = taglineWords.pop();

  const stats = [
    { label: "Live client sites", value: projects.length },
    { label: "Platforms", value: platformsUsed },
    { label: "WordPress builds", value: counts.WordPress },
    { label: "Shopify stores", value: counts.Shopify },
  ];

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />

      <main>
        <section className="hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="container">
            <div className="hero-copy">
              <p className="eyebrow">Web development studio</p>
              <h1>
                {taglineWords.join(" ")}{" "}
                <span className="h1-accent">{taglineLast}</span>
              </h1>
              <p className="lede">{site.intro}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#work">
                  See our work
                  <svg
                    className="btn-arrow"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    aria-hidden="true"
                  >
                    <path d="M7 2v10M2.5 7.5 7 12l4.5-4.5" />
                  </svg>
                </a>
              </div>
              <dl className="hero-stats">
                {stats.map((stat, index) => (
                  <div key={stat.label}>
                    <dt>{stat.label}</dt>
                    <dd>
                      <CountUp value={stat.value} delay={500 + index * 120} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {heroShots.length > 0 && (
              <div className="hero-stack" aria-hidden="true">
                {heroShots.map((shot) => (
                  <figure className="hero-shot" key={shot.slug}>
                    <Image
                      src={shot.thumbnail}
                      alt=""
                      width={1440}
                      height={900}
                      sizes="(min-width: 1024px) 26vw, 1px"
                    />
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="marquee-band">
          <p className="marquee-label">
            {projects.length} brands across {platformsUsed} platforms
          </p>
          <div className="marquee">
            <div className="marquee-track">
              {[0, 1].map((copy) => (
                <ul
                  className="marquee-list"
                  key={copy}
                  aria-hidden={copy === 1 ? "true" : undefined}
                >
                  {projects.map((p) => (
                    <li className="marquee-item" key={p.slug}>
                      {p.name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <section id="work" className="section">
          <div className="container">
            <Reveal className="section-head">
              <p className="eyebrow">
                <span className="eyebrow-num">01</span>Work
              </p>
              <h2>Websites we have designed and built</h2>
              <p className="lede">
                Every project below is live. Filter by platform, then open any
                site in a new tab.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <WorkGrid projects={work} />
            </Reveal>
          </div>
        </section>

        <section id="stack" className="section">
          <div className="container">
            <Reveal className="section-head">
              <p className="eyebrow">
                <span className="eyebrow-num">02</span>Stack
              </p>
              <h2>What we build with</h2>
              <p className="lede">
                We pick the platform that fits the brief, build it properly,
                and wire it into your CRM so every lead has somewhere to go.
              </p>
            </Reveal>
            <div className="stack-groups">
              {stackGroups.map((group, index) => (
                <Reveal
                  className="stack-group"
                  key={group.title}
                  delay={index * 140}
                >
                  <h3>{group.title}</h3>
                  <ul className="chip-list">
                    {group.items.map((item) => (
                      <li className="chip" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
