import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { BrowserShot, PlatformBadge } from "@/components/ProjectVisuals";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { mailto, profile } from "@/data/profile";
import { displayHost, getProject, projects } from "@/data/projects";

// Every project page is generated at build time; unknown slugs are a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name}: ${project.platform} project | ${profile.name}`;
  const description = `${project.summary} A ${project.platform} site from the portfolio of ${profile.name}, WordPress and web developer.`;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/projects/${project.slug}`,
      // The image comes from ./opengraph-image.tsx (a PNG card; WebP screenshots
      // aren't accepted by every social network).
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: "Platform", value: <PlatformBadge platform={project.platform} /> },
    { label: "Built with", value: project.stack.join(", ") },
    { label: "Industry", value: project.industry },
    {
      label: "Live site",
      value: (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          {displayHost(project.url)}
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ),
    },
  ];

  return (
    <>
      <div id="top" />
      <SiteHeader onHome={false} />
      <main id="main">
        <section aria-labelledby="project-title" className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36">
          <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
          <div className="container-page">
            <Link
              href="/#projects"
              className="label-mono group -my-2 inline-flex items-center gap-2 py-2 text-mute transition-colors hover:text-paper"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              All projects
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="label-mono animate-rise text-accent">
                  {project.industry}
                  {project.location ? ` · ${project.location}` : ""}
                </p>
                <h1
                  id="project-title"
                  className="mt-4 animate-rise text-[clamp(2.5rem,6vw,4.5rem)]"
                  style={{ animationDelay: "80ms" }}
                >
                  {project.name}
                </h1>
                <p
                  className="mt-5 max-w-2xl animate-rise text-lg leading-relaxed text-mute"
                  style={{ animationDelay: "160ms" }}
                >
                  {project.summary}
                </p>
              </div>
              <div className="animate-rise lg:col-span-4 lg:justify-self-end" style={{ animationDelay: "220ms" }}>
                <ButtonLink href={project.url} target="_blank" rel="noopener noreferrer">
                  Visit live site
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </ButtonLink>
              </div>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label} className="min-w-0 bg-ink-900 p-5">
                  <dt className="label-mono text-mute">{item.label}</dt>
                  <dd className="mt-2 font-medium text-paper [overflow-wrap:anywhere]">{item.value}</dd>
                </div>
              ))}
            </dl>

            {project.role ? (
              <div className="mt-6 rounded-2xl border border-accent/25 bg-accent/[0.06] p-6">
                <h2 className="label-mono font-sans text-accent">My role</h2>
                <p className="mt-2 text-paper">{project.role}</p>
              </div>
            ) : null}
          </div>
        </section>

        <section aria-label={`Screenshots of ${project.name}`} className="pb-24">
          <div className="container-page grid items-start gap-8 lg:grid-cols-12">
            <figure className="lg:col-span-9">
              <BrowserShot
                project={project}
                preload
                sizes="(min-width: 76rem) 54rem, (min-width: 64rem) 72vw, 100vw"
                className="rounded-2xl border border-white/[0.08] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)]"
              />
              <figcaption className="label-mono mt-3 text-mute">Desktop · 1440px wide</figcaption>
            </figure>
            <figure className="mx-auto w-full max-w-[15rem] lg:col-span-3 lg:max-w-none">
              <div className="relative aspect-[390/844] overflow-hidden rounded-[2rem] border-[6px] border-ink-700 bg-ink-800 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)]">
                <Image
                  src={project.mobileThumbnail}
                  alt={`Homepage of ${project.name} on a phone`}
                  fill
                  sizes="(min-width: 64rem) 16rem, 15rem"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="label-mono mt-3 text-center text-mute lg:text-left">
                Mobile · 390px wide
              </figcaption>
            </figure>
          </div>
          <p className="container-page mt-6 text-sm text-mute">
            Screenshots of the live site. Visit it for the full experience.
          </p>
        </section>

        <nav aria-label="More projects" className="border-t border-white/[0.06]">
          <div className="container-page grid divide-y divide-white/[0.06] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <Link href={`/projects/${prev.slug}`} className="group py-10 sm:pr-8">
              <span className="label-mono inline-flex items-center gap-2 text-mute">
                <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                Previous project
              </span>
              <span className="mt-3 block font-display text-[clamp(1.375rem,2.4vw,1.875rem)] font-semibold tracking-tight transition-colors group-hover:text-accent">
                {prev.name}
              </span>
            </Link>
            <Link href={`/projects/${next.slug}`} className="group py-10 sm:pl-8 sm:text-right">
              <span className="label-mono inline-flex items-center gap-2 text-mute">
                Next project
                <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-3 block font-display text-[clamp(1.375rem,2.4vw,1.875rem)] font-semibold tracking-tight transition-colors group-hover:text-accent">
                {next.name}
              </span>
            </Link>
          </div>
        </nav>

        <section aria-labelledby="project-cta" className="border-t border-white/[0.06] py-20">
          <div className="container-page flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 id="project-cta" className="text-[clamp(1.75rem,3.2vw,2.5rem)]">
                Want a site like this for your business?
              </h2>
              <p className="mt-3 text-mute">Tell me what you need and I’ll get back to you by email.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/#contact">
                Let’s Talk
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </ButtonLink>
              <ButtonLink href={mailto} variant="secondary">
                <Mail aria-hidden="true" className="size-4" />
                Email Me
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter onHome={false} />
    </>
  );
}
