/**
 * Capture above-the-fold screenshots of every project in data/projects.ts.
 *
 *   npm run screenshots                       capture every project
 *   npm run screenshots -- hirehawk lubar     capture only these slugs
 *
 * Output: public/screenshots/{slug}.webp        (1440x900 desktop)
 *         public/screenshots/{slug}-mobile.webp (390x844 mobile)
 * Report: scripts/screenshots-report.json plus a console summary.
 *         A partial run merges into the existing report.
 *
 * Requires: npm run screenshots:install  (downloads Chromium once)
 *
 * Sites that block the bundled Chromium are retried through the locally
 * installed Google Chrome when one exists (Playwright's "chrome" channel).
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";
import { projects } from "../data/projects.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "screenshots");
const REPORT = path.join(ROOT, "scripts", "screenshots-report.json");

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, suffix: "", isMobile: false },
  mobile: { width: 390, height: 844, suffix: "-mobile", isMobile: true },
};
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
const NAV_TIMEOUT_MS = 45_000;
const SETTLE_MS = 2_000;
const ATTEMPTS = 2;
const CONCURRENCY = 3;
const BOT_WALL = /just a moment|access denied|attention required|are you a robot|captcha|forbidden/i;

// Cookie banners are hidden for the capture only. Nothing is clicked, so no
// consent is given or refused on the site owner's behalf.
const CONSENT_PATTERN = /cookie|consent|gdpr|privacy-settings|cmplz|onetrust|cybot|usercentrics|osano|termly|iubenda/i;

// Newsletter and discount popups hide the hero. Try Escape, then the first
// visible close control, most specific selector first.
const CLOSE_SELECTORS = [
  '[role="dialog"] [aria-label*="close" i]',
  '[role="dialog"] button[class*="close" i]',
  ".klaviyo-close-form",
  '[class*="popup" i] [class*="close" i]',
  '[class*="modal" i] [class*="close" i]',
  '[id*="popup" i] [class*="close" i]',
  '[aria-label*="close" i]',
];

const onlySlugs = new Set(process.argv.slice(2));
const targets = onlySlugs.size
  ? projects.filter((p) => onlySlugs.has(p.slug))
  : projects;

async function hideConsentBanners(page) {
  await page
    .evaluate((patternSource) => {
      const pattern = new RegExp(patternSource, "i");
      for (const el of document.querySelectorAll("body *")) {
        const hint = `${el.id} ${el.className}`;
        if (typeof hint !== "string" || !pattern.test(hint)) continue;
        // Fixed overlays, or shadow-DOM hosts such as #usercentrics-root whose
        // fixed layer is inside the shadow root and invisible to this query.
        const pos = getComputedStyle(el).position;
        if (pos === "fixed" || pos === "sticky" || el.shadowRoot) {
          el.style.setProperty("display", "none", "important");
        }
      }
    }, CONSENT_PATTERN.source)
    .catch(() => {});
}

async function dismissPopups(page) {
  await hideConsentBanners(page);
  await page.keyboard.press("Escape").catch(() => {});
  for (const selector of CLOSE_SELECTORS) {
    const control = page.locator(selector).first();
    const visible = await control.isVisible().catch(() => false);
    if (!visible) continue;
    await control.click({ timeout: 2_000, force: true }).catch(() => {});
    await page.waitForTimeout(600);
    return;
  }
}

async function captureOne(browser, project, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.isMobile,
    hasTouch: viewport.isMobile,
    deviceScaleFactor: 1,
    userAgent: USER_AGENT,
    locale: "en-US",
    colorScheme: "light",
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  try {
    const response = await page.goto(project.url, {
      waitUntil: "domcontentloaded",
      timeout: NAV_TIMEOUT_MS,
    });
    if (response && response.status() >= 400) {
      throw new Error(`Bot wall: HTTP ${response.status()}`);
    }
    await page
      .waitForLoadState("networkidle", { timeout: 15_000 })
      .catch(() => {});
    await page.waitForTimeout(SETTLE_MS);

    const title = await page.title();
    if (BOT_WALL.test(title)) throw new Error(`Bot wall: "${title}"`);

    await dismissPopups(page);
    // Give script-driven hero animations a moment to finish.
    await page.waitForTimeout(1_500);

    const png = await page.screenshot({
      type: "png",
      fullPage: false,
      animations: "disabled",
      caret: "hide",
    });
    const file = path.join(OUT_DIR, `${project.slug}${viewport.suffix}.webp`);
    await sharp(png).webp({ quality: 82 }).toFile(file);
    return file;
  } finally {
    await context.close();
  }
}

async function withRetry(fn) {
  let lastError;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

/** Lazily launch the installed Google Chrome; null when it is not available. */
function chromeFallback() {
  let promise;
  return {
    get() {
      promise ??= chromium
        .launch({ headless: true, channel: "chrome" })
        .catch(() => null);
      return promise;
    },
    async close() {
      const browser = promise ? await promise : null;
      if (browser) await browser.close();
    },
  };
}

async function loadExistingReport() {
  try {
    return JSON.parse(await readFile(REPORT, "utf8"));
  } catch {
    return null;
  }
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const bundled = await chromium.launch({ headless: true });
  const chrome = chromeFallback();
  const results = [];
  const queue = [...targets];

  async function captureWithFallback(project, viewport) {
    try {
      await withRetry(() => captureOne(bundled, project, viewport));
      return "chromium";
    } catch (error) {
      const fallback = await chrome.get();
      if (!fallback) throw error;
      await withRetry(() => captureOne(fallback, project, viewport));
      return "chrome";
    }
  }

  async function worker() {
    for (let project = queue.shift(); project; project = queue.shift()) {
      const result = { slug: project.slug, name: project.name, url: project.url };
      for (const [key, viewport] of Object.entries(VIEWPORTS)) {
        try {
          const engine = await captureWithFallback(project, viewport);
          result[key] = "ok";
          result[`${key}Engine`] = engine;
          console.log(`ok    ${key.padEnd(7)} ${project.slug}  (${engine})`);
        } catch (error) {
          result[key] = `failed: ${error.message.split("\n")[0]}`;
          console.log(`FAIL  ${key.padEnd(7)} ${project.slug}  ${result[key]}`);
        }
      }
      results.push(result);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await bundled.close();
  await chrome.close();

  // A partial run replaces only the slugs it captured.
  const previous = onlySlugs.size ? await loadExistingReport() : null;
  const merged = new Map(
    (previous?.results ?? []).map((r) => [r.slug, r]),
  );
  for (const r of results) merged.set(r.slug, r);
  const all = [...merged.values()].sort((a, b) => a.slug.localeCompare(b.slug));

  const failed = all.filter((r) => r.desktop !== "ok");
  const report = {
    generatedAt: new Date().toISOString(),
    captured: all.filter((r) => r.desktop === "ok").map((r) => r.slug),
    failed: failed.map((r) => ({
      slug: r.slug,
      url: r.url,
      desktop: r.desktop,
      mobile: r.mobile,
    })),
    mobileFailed: all.filter((r) => r.mobile !== "ok").map((r) => r.slug),
    results: all,
  };
  await writeFile(REPORT, JSON.stringify(report, null, 2) + "\n");

  console.log(
    `\n${report.captured.length}/${all.length} desktop screenshots captured` +
      (onlySlugs.size ? ` (${results.length} re-captured this run).` : "."),
  );
  if (failed.length) {
    console.log("Supply these manually as public/screenshots/{slug}.webp (1440x900):");
    for (const f of failed) console.log(`  - ${f.slug}  ${f.url}  ${f.desktop}`);
  }
  console.log(`Report written to ${path.relative(ROOT, REPORT)}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
