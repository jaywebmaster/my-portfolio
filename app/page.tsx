import fs from "node:fs";
import path from "node:path";
import { PLATFORMS, countByPlatform, projects } from "@/data/projects";
import { site } from "@/data/site";
import { stackGroups } from "@/data/stack";
import { ContactForm } from "@/components/ContactForm";
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

  return (
    <>
      <header className="site-header">
        <div className="container">
          <a className="wordmark" href="#top" aria-label={`${site.name} home`}>
            <span className="wordmark-dot" aria-hidden="true" />
            {site.name}
          </a>
          <nav className="site-nav" aria-label="Primary">
            <a href="#work">Work</a>
            <a href="#stack">Stack</a>
            <a href="#contact">Contact</a>
            <a className="btn btn-primary" href="#contact">
              Start a project
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container">
            <p className="eyebrow">Web development studio</p>
            <h1>{site.tagline}</h1>
            <p className="lede">{site.intro}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#work">
                See our work
              </a>
              <a className="btn btn-ghost" href="#contact">
                Start a project
              </a>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>Live client sites</dt>
                <dd>{projects.length}</dd>
              </div>
              <div>
                <dt>Platforms</dt>
                <dd>{platformsUsed}</dd>
              </div>
              <div>
                <dt>WordPress builds</dt>
                <dd>{counts.WordPress}</dd>
              </div>
              <div>
                <dt>Shopify stores</dt>
                <dd>{counts.Shopify}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="work" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Work</p>
              <h2>Websites we have designed and built</h2>
              <p className="lede">
                Every project below is live. Filter by platform, then open any
                site in a new tab.
              </p>
            </div>
            <WorkGrid projects={work} />
          </div>
        </section>

        <section id="stack" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Stack</p>
              <h2>What we build with</h2>
              <p className="lede">
                We pick the platform that fits the brief, then build it
                properly.
              </p>
            </div>
            <div className="stack-groups">
              {stackGroups.map((group) => (
                <div className="stack-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul className="chip-list">
                    {group.items.map((item) => (
                      <li className="chip" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container contact-grid">
            <div className="contact-intro">
              <p className="eyebrow">Contact</p>
              <h2>Have a site to build or rebuild?</h2>
              <p className="lede">
                Tell us about the project and we will come back with a plan and
                a quote.
              </p>
              <a className="contact-email" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <ul className="contact-meta">
                <li>{site.location}</li>
                <li>Replies within one business day</li>
              </ul>
            </div>
            <ContactForm />
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
