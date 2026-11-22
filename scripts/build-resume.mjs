/**
 * Builds public/Jayvan-Dorig-Resume.pdf from data/profile.ts and data/resume.ts,
 * the same data the website renders, so the two never disagree.
 *
 *   npm run resume:pdf
 *
 * The layout is deliberately ATS-friendly: one column, real selectable text in
 * a standard font, conventional section names, plain bullets, no tables, icons,
 * photos or text in images, and every link printed as visible text.
 *
 * Requires the Playwright Chromium used by `npm run screenshots`.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { profile, socials } from "../data/profile.ts";
import { certifications, education, experience, skillGroups, summary } from "../data/resume.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "Jayvan-Dorig-Resume.pdf");

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const bare = (url) => url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

const links = [
  { href: profile.website, text: bare(profile.website) },
  ...socials.map((s) => ({ href: s.href, text: bare(s.href) })),
];

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(profile.name)} – Resume</title>
<meta name="author" content="${esc(profile.name)}">
<style>
  @page { size: Letter; margin: 0.5in 0.65in; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 9.75pt; line-height: 1.36; color: #111; }
  a { color: #111; text-decoration: none; }
  h1 { font-size: 20pt; margin: 0; letter-spacing: 0.3pt; }
  .headline { font-size: 11pt; font-weight: bold; color: #333; margin: 3pt 0 6pt; }
  .contact { margin: 0; font-size: 9.75pt; color: #222; }
  .contact span + span::before { content: " | "; color: #777; }
  /* No letter-spacing: spaced capitals extract as "E D U C A T I O N" in some parsers. */
  h2 { font-size: 10.25pt; text-transform: uppercase; margin: 11pt 0 4pt; padding-bottom: 2pt; border-bottom: 1pt solid #111; }
  p { margin: 0 0 3pt; }
  ul { margin: 2pt 0 0; padding-left: 14pt; }
  li { margin: 0 0 1.6pt; }
  .skill { margin: 0 0 2pt; }
  .skill b { font-weight: bold; }
  .job { margin: 0 0 7pt; break-inside: avoid; }
  /* Dates sit inline after the role, not in a right-aligned column, so text
     extraction keeps each date next to the job or degree it belongs to. */
  .role { font-weight: bold; margin: 0; }
  .date { font-weight: normal; white-space: nowrap; color: #333; }
  .edu { margin: 0 0 5pt; break-inside: avoid; }
</style>
</head>
<body>
  <header>
    <h1>${esc(profile.name)}</h1>
    <p class="headline">${esc(profile.titles.join(" | "))}</p>
    <p class="contact">
      <span>${esc(profile.location)} (Remote, ${esc(profile.timezone)})</span>
      <span><a href="${esc(profile.phone.href)}">${esc(profile.phone.display)}</a></span>
      <span><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></span>
    </p>
    <p class="contact">
      ${links.map((l) => `<span><a href="${esc(l.href)}">${esc(l.text)}</a></span>`).join("\n      ")}
    </p>
  </header>

  <h2>Professional Summary</h2>
  <p>${esc(summary)}</p>

  <h2>Technical Skills</h2>
  ${skillGroups.map((g) => `<p class="skill"><b>${esc(g.title)}:</b> ${esc(g.items.join(", "))}</p>`).join("\n  ")}

  <h2>Work Experience</h2>
  ${experience
    .map(
      (r) => `<div class="job">
    <p class="role">${esc(r.title)} | ${esc(r.company)} <span class="date">| ${esc(r.period)}</span></p>
    <ul>
      ${r.highlights.map((h) => `<li>${esc(h)}</li>`).join("\n      ")}
    </ul>
  </div>`,
    )
    .join("\n  ")}

  <h2>Education</h2>
  ${education
    .map(
      (e) => `<div class="edu">
    <p class="role">${esc(e.credential)} <span class="date">| ${esc(e.period)}</span></p>
    <div>${esc(e.school)}</div>
  </div>`,
    )
    .join("\n  ")}
  ${
    certifications.length
      ? `<h2>Certifications</h2>
  <ul>${certifications.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>`
      : ""
  }
</body>
</html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await mkdir(path.dirname(OUT), { recursive: true });
  await page.pdf({ path: OUT, format: "Letter", printBackground: true, preferCSSPageSize: true });
  console.log(`Wrote ${path.relative(ROOT, OUT)}`);
} finally {
  await browser.close();
}
