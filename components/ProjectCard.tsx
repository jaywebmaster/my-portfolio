import Image from "next/image";
import { platformKey, type Project } from "@/data/projects";

/** A project plus a build-time flag saying whether its screenshot exists. */
export type WorkItem = Project & { hasThumbnail: boolean };

export function ProjectCard({ project }: { project: WorkItem }) {
  const { name, url, platform, thumbnail, hasThumbnail } = project;
  const badgeClass = `badge badge-${platformKey(platform)}`;
  const domain = new URL(url).hostname.replace(/^www\./, "");

  return (
    <a className="card" href={url} target="_blank" rel="noopener noreferrer">
      <span className="card-spot" aria-hidden="true" />
      <div className="card-media">
        {hasThumbnail ? (
          <Image
            className="card-img"
            src={thumbnail}
            alt=""
            width={1440}
            height={900}
            sizes="(min-width: 1400px) 300px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            loading="lazy"
          />
        ) : (
          <div className="card-placeholder" aria-hidden="true">
            <span className="card-placeholder-mark">{name.charAt(0)}</span>
            <span className="card-placeholder-name">{name}</span>
            <span className={badgeClass}>{platform}</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <span className={badgeClass}>{platform}</span>
        <span className="card-domain">{domain}</span>
        <span className="card-visit">
          Visit site
          <span className="visually-hidden"> (opens in a new tab)</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M2 12 12 2M5 2h7v7" />
          </svg>
        </span>
      </div>
    </a>
  );
}
