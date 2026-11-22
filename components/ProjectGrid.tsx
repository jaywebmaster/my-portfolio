"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PLATFORMS, type Platform, type Project } from "@/data/projects";
import { PlatformBadge } from "@/components/ProjectVisuals";

type Filter = "All" | Platform;

/** Cards shown before "Show all": three full rows on desktop. */
const INITIAL_COUNT = 9;

/** Filterable grid of the non-featured client sites. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState(false);

  const filters = useMemo(() => {
    const counts = new Map<Filter, number>([["All", projects.length]]);
    for (const p of projects) counts.set(p.platform, (counts.get(p.platform) ?? 0) + 1);
    return (["All", ...PLATFORMS] as Filter[])
      .filter((f) => (counts.get(f) ?? 0) > 0)
      .map((f) => ({ id: f, count: counts.get(f) ?? 0 }));
  }, [projects]);

  const matching = filter === "All" ? projects : projects.filter((p) => p.platform === filter);
  const visible = expanded ? matching : matching.slice(0, INITIAL_COUNT);
  const hiddenCount = matching.length - visible.length;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by platform"
        className="flex flex-wrap gap-2"
      >
        {filters.map(({ id, count }) => {
          const active = id === filter;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setFilter(id);
                setExpanded(false);
              }}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                active
                  ? "border-accent bg-accent text-ink-950"
                  : "border-white/10 bg-white/[0.03] text-paper-dim hover:border-white/25 hover:text-paper"
              }`}
            >
              {id}
              <span className={`font-mono text-[0.6875rem] ${active ? "text-ink-950/70" : "text-faint"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {matching.length} {filter === "All" ? "" : `${filter} `}
        {matching.length === 1 ? "site" : "sites"}
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.slug}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-850/60 transition-[border-color,transform] duration-500 ease-out-quint hover:border-white/20 motion-safe:hover:-translate-y-1">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06] bg-ink-800">
                <Image
                  src={project.thumbnail}
                  alt=""
                  fill
                  sizes="(min-width: 64rem) 24rem, (min-width: 40rem) 45vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-out-quint group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[1.0625rem] leading-snug">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="after:absolute after:inset-0 after:rounded-2xl"
                    >
                      {project.name}
                    </Link>
                  </h3>
                  <PlatformBadge platform={project.platform} className="shrink-0" />
                </div>
                <p className="mt-1.5 text-sm text-mute">
                  {project.industry}
                  {project.location ? ` · ${project.location}` : ""}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {hiddenCount > 0 ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 text-sm font-medium text-paper transition-colors hover:border-white/25 hover:bg-white/[0.07]"
          >
            Show all {matching.length} {filter === "All" ? "" : `${filter} `}sites
            <span className="font-mono text-[0.6875rem] text-faint">+{hiddenCount}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
