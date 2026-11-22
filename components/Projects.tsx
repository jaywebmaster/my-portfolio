import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ProjectGrid } from "@/components/ProjectGrid";
import { BrowserShot, PlatformBadge } from "@/components/ProjectVisuals";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { featuredProjects, otherProjects, projects } from "@/data/projects";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeader
            index="05"
            eyebrow="Projects"
            titleId="projects-title"
            title="Selected client work."
            intro={`${projects.length} live sites from my portfolio across WordPress, Shopify, Webflow and Next.js. Open any project for desktop and mobile screenshots and a link to the live site.`}
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={(index % 2) * 90} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-850/60 transition-[border-color,box-shadow] duration-500 hover:border-white/20 hover:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]">
                  <BrowserShot
                    project={project}
                    sizes="(min-width: 76rem) 36rem, (min-width: 48rem) 46vw, 100vw"
                    className="border-b border-white/[0.06]"
                    imageClassName="transition-transform duration-[900ms] ease-out-quint group-hover:scale-[1.035]"
                  />
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="label-mono text-mute">
                        {project.industry}
                        {project.location ? ` · ${project.location}` : ""}
                      </p>
                      <PlatformBadge platform={project.platform} />
                    </div>
                    <h3 className="mt-4 text-[1.625rem]">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="after:absolute after:inset-0 after:rounded-2xl"
                      >
                        {project.name}
                      </Link>
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-mute">{project.summary}</p>
                    <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                      <ul aria-label="Built with" className="flex flex-wrap gap-1.5">
                        {project.stack.map((tool) => (
                          <li
                            key={tool}
                            className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[0.6875rem] text-mute"
                          >
                            {tool}
                          </li>
                        ))}
                      </ul>
                      <span
                        aria-hidden="true"
                        className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-paper-dim transition-colors group-hover:text-accent"
                      >
                        View project
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-20">
          <Reveal>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h3 className="text-[clamp(1.5rem,2.6vw,2rem)]">More client sites</h3>
                <p className="mt-2 text-mute">Filter by platform. Every card opens the project page.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <ProjectGrid projects={otherProjects} />
          </Reveal>
        </div>

        <Reveal>
          <div className="relative mt-20 overflow-hidden rounded-3xl border border-accent/25 bg-[radial-gradient(120%_140%_at_100%_0%,rgb(244_138_66/0.18),transparent_55%)] px-6 py-10 sm:px-12 sm:py-14">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <h3 className="text-[clamp(1.625rem,3vw,2.375rem)]">Need a site like these?</h3>
                <p className="mt-3 text-paper-dim">
                  A new build, a design that needs turning into a site, or a site that needs looking
                  after. Tell me what you have in mind.
                </p>
              </div>
              <ButtonLink href="#contact">
                Let’s Work Together
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
