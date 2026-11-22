import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name}, ${profile.titles.join(", ")}, available for remote work worldwide`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0b0d11";
const PAPER = "#f4efe7";
const MUTE = "#9da1a9";
const ACCENT = "#f48a42";

export default async function Image() {
  // The real portrait, never a stand-in.
  const photo = await readFile(path.join(process.cwd(), "public", profile.photo.src));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const host = profile.website.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: INK, color: PAPER, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 64px 72px", width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: ACCENT,
                color: INK,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              JD
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, color: MUTE, letterSpacing: 2 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: "#5ee08f" }} />
              AVAILABLE FOR REMOTE WORK WORLDWIDE
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>{profile.name}</div>
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 26, fontSize: 40, lineHeight: 1.2, fontWeight: 600, color: "#d3cec6", maxWidth: 660 }}>
              <span>Building modern,&nbsp;</span>
              {/* Trailing space on the accent word, so a wrap never indents the next line. */}
              <span style={{ color: ACCENT }}>high-performing&nbsp;</span>
              <span>websites for businesses.</span>
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 22, color: MUTE }}>{profile.titles.join("  ·  ")}</div>
        </div>

        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              width: 340,
              height: 450,
              borderRadius: 32,
              border: `2px solid ${ACCENT}66`,
              transform: "translate(14px, 14px)",
            }}
          />
          <div style={{ display: "flex", width: 340, height: 450, borderRadius: 32, overflow: "hidden", background: ACCENT }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
            <img src={photoSrc} alt="" width={340} height={476} style={{ width: 340, height: 476, objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", bottom: 36, display: "flex", fontSize: 20, color: MUTE }}>{host}</div>
        </div>
      </div>
    ),
    size,
  );
}
