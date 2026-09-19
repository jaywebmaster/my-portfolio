"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { PLATFORMS, countByPlatform, type Platform } from "@/data/projects";
import { ProjectCard, type WorkItem } from "./ProjectCard";

type Filter = "All" | Platform;

export function WorkGrid({ projects }: { projects: WorkItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const counts = countByPlatform(projects);
  const barRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const motionOk = useRef(false);

  const tabs: { key: Filter; label: string }[] = [
    { key: "All", label: `All (${projects.length})` },
    ...PLATFORMS.map((p) => ({ key: p, label: `${p} (${counts[p]})` })),
  ];

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.platform === filter);

  // Tilt and spotlight only for mouse users who have not asked for reduced motion.
  useEffect(() => {
    motionOk.current =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Slide the pill indicator under the active tab; re-measure on resize.
  useEffect(() => {
    const bar = barRef.current;
    const pill = indicatorRef.current;
    if (!bar || !pill) return;

    const place = () => {
      const active = bar.querySelector<HTMLElement>(".filter-tab.is-active");
      if (!active) return;
      pill.style.transform = `translateX(${active.offsetLeft}px)`;
      pill.style.width = `${active.offsetWidth}px`;
      pill.style.height = `${active.offsetHeight}px`;
      bar.classList.add("has-indicator");
    };
    place();

    // Centre the active tab within the bar only; scrollIntoView would also
    // scroll the document, which jumped the page on first load.
    const active = bar.querySelector<HTMLElement>(".filter-tab.is-active");
    if (active && bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({
        left: active.offsetLeft - (bar.clientWidth - active.offsetWidth) / 2,
        behavior: "smooth",
      });
    }

    const observer = new ResizeObserver(place);
    observer.observe(bar);
    return () => observer.disconnect();
  }, [filter]);

  function onPointerMove(event: PointerEvent<HTMLUListElement>) {
    if (!motionOk.current) return;
    const card = (event.target as HTMLElement).closest<HTMLElement>(".card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
    card.style.setProperty("--ry", `${((px - 0.5) * 8).toFixed(2)}deg`);
    card.style.setProperty("--rx", `${((0.5 - py) * 8).toFixed(2)}deg`);
  }

  function onPointerOut(event: PointerEvent<HTMLUListElement>) {
    const card = (event.target as HTMLElement).closest<HTMLElement>(".card");
    if (!card || card.contains(event.relatedTarget as Node | null)) return;
    card.style.removeProperty("--rx");
    card.style.removeProperty("--ry");
  }

  return (
    <>
      <div
        ref={barRef}
        className="filter-bar"
        role="group"
        aria-label="Filter projects by platform"
      >
        <span ref={indicatorRef} className="filter-indicator" aria-hidden="true" />
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
      <ul
        className="work-grid"
        key={filter}
        onPointerMove={onPointerMove}
        onPointerOut={onPointerOut}
      >
        {visible.map((project, index) => (
          <li key={project.slug} style={{ "--i": index } as CSSProperties}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </>
  );
}
