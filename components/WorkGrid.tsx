"use client";

import { useState, type CSSProperties } from "react";
import { PLATFORMS, countByPlatform, type Platform } from "@/data/projects";
import { ProjectCard, type WorkItem } from "./ProjectCard";

type Filter = "All" | Platform;

export function WorkGrid({ projects }: { projects: WorkItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const counts = countByPlatform(projects);

  const tabs: { key: Filter; label: string }[] = [
    { key: "All", label: `All (${projects.length})` },
    ...PLATFORMS.map((p) => ({ key: p, label: `${p} (${counts[p]})` })),
  ];

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.platform === filter);

  return (
    <>
      <div
        className="filter-bar"
        role="group"
        aria-label="Filter projects by platform"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`filter-tab${filter === tab.key ? " is-active" : ""}`}
            aria-pressed={filter === tab.key}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="visually-hidden" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
      </p>

      {/* Keyed by filter so the cards remount and replay their staggered entrance. */}
      <ul className="work-grid" key={filter}>
        {visible.map((project, index) => (
          <li key={project.slug} style={{ "--i": index } as CSSProperties}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </>
  );
}
