/**
 * Builds public/Jayvan-Dorig-Resume.pdf from data/profile.ts and data/resume.ts,
 * the same data the website renders, so the two never disagree.
 *
 *   npm run resume:pdf
 *
 * The look is branded (accent colour, headline numbers, Hanken Grotesk like the
 * site) but the structure stays ATS-friendly: one column, real selectable text,
 * conventional section names, plain bullets, no tables, icons, photos or text in
 * images, ligatures off so words extract cleanly, and every link printed as
 * visible text. Falls back to Arial when the web font can't load.
 *
 * Requires the Playwright Chromium used by `npm run screenshots`.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { profile, socials } from "../data/profile.ts";
import {
  certifications,
  education,
  experience,
  keyFacts,
  personalProjects,
  skillGroups,
  summary,
} from "../data/resume.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "Jayvan-Dorig-Resume.pdf");

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
/** Escapes, then keeps hyphenated words on one line: a line break at the hyphen
    extracts as one run-together word ("two-way" became "twoway"). */
const txt = (s) => esc(s).replace(/[^\s|]+-[^\s|]+/g, (w) => `<span class="nb">${w}</span>`);
const bare = (url) => url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
const link = (href, text = bare(href)) => `<a href="${esc(href)}">${esc(text)}</a>`;

const contact = [
  `${esc(profile.location)} (Remote, ${esc(profile.timezone)})`,
  link(profile.phone.href, profile.phone.display),
  link(`mailto:${profile.email}`, profile.email),
];
const web = [link(profile.website), ...socials.map((s) => link(s.href))];

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(profile.name)} – Resume</title>
<meta name="author" content="${esc(profile.name)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=block" rel="stylesheet">
<style>
  @page { size: Letter; margin: 0.42in 0.55in 0.4in; }
  :root {
    --ink: #14161b;
    --body: #2a2d34;
    --mute: #5d616b;
    --rule: #e4dfd8;
    --accent: #c0531a;
    --tint: #fbf0e7;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "Hanken Grotesk", Arial, Helvetica, sans-serif;
    font-size: 9.7pt;
    line-height: 1.42;
    color: var(--body);
    /* Ligatures merge letters like "fi" into one glyph, which some parsers drop. */
    font-variant-ligatures: none;
    font-feature-settings: "liga" 0, "clig" 0;
  }
  a { color: inherit; text-decoration: none; }
  p { margin: 0; }
  .nb { white-space: nowrap; }

  header { padding-bottom: 7pt; }
  h1 { font-size: 25pt; line-height: 1.05; font-weight: 800; color: var(--ink); margin: 0; }
  .headline { font-size: 11pt; font-weight: 700; color: var(--accent); margin: 3pt 0 5pt; }
  .contact { font-size: 9pt; color: var(--mute); margin: 0 0 1pt; }
  .contact span + span::before { content: " | "; color: #b3aea7; }

  /* Headline numbers: one line of real text, styled as a strip. */
  .facts { display: flex; gap: 0; background: var(--tint); border-left: 3pt solid var(--accent); border-radius: 4pt; padding: 6pt 4pt; margin: 2pt 0 2pt; }
  .fact { flex: 1; padding: 0 8pt; font-size: 8.6pt; color: var(--mute); line-height: 1.2; }
  .fact + .fact { border-left: 0.75pt solid #ecd9c8; }
  .fact b { display: block; font-size: 15pt; font-weight: 800; color: var(--accent); line-height: 1.05; }

  /* No letter-spacing: spaced capitals extract as "E D U C A T I O N" in some parsers. */
  h2 {
    font-size: 9.6pt; font-weight: 800; text-transform: uppercase; color: var(--ink);
    margin: 13pt 0 5pt; padding-bottom: 2.5pt; border-bottom: 0.75pt solid var(--rule);
    break-after: avoid;
  }
  h2::before {
    content: ""; display: inline-block; width: 6pt; height: 6pt; margin-right: 5pt;
    background: var(--accent); border-radius: 1.5pt; vertical-align: 0.5pt;
  }
  .summary { color: var(--body); }

  ul { margin: 2pt 0 0; padding-left: 11pt; }
  li { margin: 0 0 2.2pt; padding-left: 1pt; break-inside: avoid; }
  li::marker { color: var(--accent); }

  .job { margin: 0 0 8pt; break-inside: avoid; }
  /* Dates sit inline after the role, not in a right-aligned column, so text
     extraction keeps each date next to the job or degree it belongs to. */
  .role { font-weight: 700; color: var(--ink); font-size: 9.8pt; }
  .company { color: var(--accent); }
  .sep { color: #b3aea7; font-weight: 400; }
  .date { font-weight: 500; color: var(--mute); white-space: nowrap; }

  .project b { color: var(--ink); }
  .project .url { color: var(--accent); font-weight: 500; }
  .skill { margin: 0 0 3pt; }
  .skill b { color: var(--ink); }
  .edu { margin: 0 0 3pt; }
  .edu b { color: var(--ink); }
</style>
</head>
<body>
  <header>
    <h1>${esc(profile.name)}</h1>
    <p class="headline">${esc(profile.titles.join(" | "))}</p>
    <p class="contact">${contact.map((c) => `<span>${c}</span>`).join("")}</p>
    <p class="contact">${web.map((c) => `<span>${c}</span>`).join("")}</p>
  </header>

  <div class="facts">
    ${keyFacts.map((f) => `<p class="fact"><b>${esc(f.value)}</b> ${esc(f.label)}</p>`).join("\n    ")}
  </div>

  <h2>Professional Summary</h2>
  <p class="summary">${txt(summary)}</p>

  <h2>Work Experience</h2>
  ${experience
    .map(
      (r) => `<div class="job">
    <p class="role">${esc(r.title)}<span class="sep"> | </span><span class="company">${esc(r.company)}</span><span class="sep"> | </span><span class="date">${esc(r.period)}</span></p>
    <ul>
      ${r.highlights.map((h) => `<li>${txt(h)}</li>`).join("\n      ")}
    </ul>
  </div>`,
    )
    .join("\n  ")}

  <h2>Personal Projects</h2>
  <ul>
    ${personalProjects
      .map(
        (p) =>
          `<li class="project"><b>${esc(p.name)}</b>${p.url ? ` <span class="url">(${link(p.url)})</span>` : ""}: ${txt(p.summary)}</li>`,
      )
      .join("\n    ")}
  </ul>

  <h2>Technical Skills</h2>
  ${skillGroups.map((g) => `<p class="skill"><b>${esc(g.title)}:</b> ${txt(g.items.join(", "))}</p>`).join("\n  ")}

  <h2>Education</h2>
  ${education
    .map(
      (e) =>
        `<p class="edu"><b>${esc(e.credential)}</b><span class="sep"> | </span>${esc(e.school)}<span class="sep"> | </span><span class="date">${esc(e.period)}</span></p>`,
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
  await page.setContent(html, { waitUntil: "networkidle" }).catch(() => page.setContent(html, { waitUntil: "load" }));
  const font = await page.evaluate(async () => {
    await document.fonts.ready;
    return document.fonts.check('700 12px "Hanken Grotesk"') ? "Hanken Grotesk" : "Arial (web font unavailable)";
  });
  await mkdir(path.dirname(OUT), { recursive: true });
  const pdf = await page.pdf({ path: OUT, format: "Letter", printBackground: true, preferCSSPageSize: true });
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`Wrote ${path.relative(ROOT, OUT)} (${pages} page${pages === 1 ? "" : "s"}, ${font})`);
} finally {
  await browser.close();
}
