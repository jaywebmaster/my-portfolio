import Image from "next/image";
import type { Platform, Project } from "@/data/projects";
import { displayHost } from "@/data/projects";

/** Subtle per-platform dot so the grid scans quickly without a rainbow of badges. */
const platformDot: Record<Platform, string> = {
  WordPress: "bg-[#7ea6ff]",
  Shopify: "bg-[#9fd25a]",
  Webflow: "bg-[#9a8cff]",
  "Next.js": "bg-paper",
};

export function PlatformBadge({ platform, className = "" }: { platform: Platform; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.75rem] font-medium text-paper-dim ${className}`}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${platformDot[platform]}`} />
      {platform}
    </span>
  );
}

/** A screenshot inside a minimal browser window. */
export function BrowserShot({
  project,
  sizes,
  preload = false,
  className = "",
  imageClassName = "",
}: {
  project: Project;
  sizes: string;
  preload?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={`overflow-hidden bg-ink-800 ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.06] bg-ink-850 px-3.5">
        <span aria-hidden="true" className="size-2 rounded-full bg-white/15" />
        <span aria-hidden="true" className="size-2 rounded-full bg-white/15" />
        <span aria-hidden="true" className="size-2 rounded-full bg-white/15" />
        <span className="ml-3 truncate rounded-md bg-white/[0.04] px-2.5 py-0.5 font-mono text-[0.6875rem] text-mute">
          {displayHost(project.url)}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={`Homepage of ${project.name}`}
          fill
          sizes={sizes}
          preload={preload}
          className={`object-cover object-top ${imageClassName}`}
        />
      </div>
    </div>
  );
}
