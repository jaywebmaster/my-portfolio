import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { displayHost, getProject, projects } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project from the portfolio of Jayvan Dorig";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const INK = "#0b0d11";
const PAPER = "#f4efe7";
const MUTE = "#9da1a9";
const ACCENT = "#f48a42";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const name = project?.name ?? profile.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: INK,
          color: PAPER,
          fontFamily: "sans-serif",
          borderTop: `10px solid ${ACCENT}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: ACCENT, letterSpacing: 3 }}>
          {(project ? `${project.industry}${project.location ? ` · ${project.location}` : ""}` : "Portfolio").toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>{name}</div>
          {project ? (
            <div style={{ marginTop: 28, fontSize: 34, lineHeight: 1.3, color: "#d3cec6", maxWidth: 1000 }}>
              {project.summary}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: MUTE }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: ACCENT,
                color: INK,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              JD
            </div>
            <span>
              {profile.name} · {profile.titles[0]}
            </span>
          </div>
          {project ? (
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ border: "1px solid #ffffff33", borderRadius: 999, padding: "8px 20px" }}>{project.platform}</span>
              <span style={{ padding: "8px 0" }}>{displayHost(project.url)}</span>
            </div>
          ) : null}
        </div>
      </div>
    ),
    size,
  );
}
