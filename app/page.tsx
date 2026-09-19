import fs from "node:fs";
import path from "node:path";
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

export default function Home() {
  const work = projects.map((p) => ({
    ...p,
    hasThumbnail: thumbnailExists(p.thumbnail),
  }));
  const counts = countByPlatform(projects);
  const platformsUsed = PLATFORMS.filter((p) => counts[p] > 0).length;

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
      <main>
        <section className="hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="container">
            <p className="eyebrow">Web development studio</p>
            <h1>
              {taglineWords.join(" ")}{" "}
              <span className="h1-accent">{taglineLast}</span>
            </h1>
            <p className="lede">{site.intro}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#work">
                See our work
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
        </section>

        <section id="work" className="section">
          <div className="container">
            <Reveal className="section-head">
              <p className="eyebrow">Work</p>
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
              <p className="eyebrow">Stack</p>
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

      <footer className="site-footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {site.name}. Built with Next.js,
            deployed on Vercel.
          </p>
          <ul className="footer-links">
            {site.social.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
