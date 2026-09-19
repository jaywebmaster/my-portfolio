import { ImageResponse } from "next/og";
import { PLATFORMS, countByPlatform, projects } from "@/data/projects";
import { site } from "@/data/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const counts = countByPlatform(projects);

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
          background: "#0b0f14",
          color: "#e8eef4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              background: "#4ade80",
            }}
          />
          <span>{site.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            {site.tagline}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "#9aa7b4",
              maxWidth: 980,
            }}
          >
            {site.intro}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <div
            style={{
              display: "flex",
              padding: "12px 24px",
              borderRadius: 999,
              background: "#4ade80",
              color: "#06210f",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            {`${projects.length} live sites`}
          </div>
          {PLATFORMS.map((platform) => (
            <div
              key={platform}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: 24,
              }}
            >
              {`${platform} · ${counts[platform]}`}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
