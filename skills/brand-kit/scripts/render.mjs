#!/usr/bin/env node
/**
 * brand-kit render helper: turns an HTML file into PNG/JPEG shots of chosen
 * elements, or a PDF of the whole page, with the Chrome already on this Mac.
 *
 *   node ~/.claude/skills/brand-kit/scripts/render.mjs <file.html> [options]
 *
 *   --shot "#selector=out.png"   screenshot one element (repeatable)
 *   --scale 2                    device pixel ratio (default 2)
 *   --transparent                keep transparent backgrounds (logos)
 *   --viewport 1600x1000         page size (default 1600x1000)
 *   --pdf out.pdf                print the page to PDF (page size = viewport)
 *   --jpeg-quality 88            for .jpg/.jpeg outputs
 *
 * Output paths are relative to the HTML file's folder. Fonts and images load
 * before anything is captured. Set CHROME_PATH to use another browser.
 */
import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
// the HTML file is the first argument that is neither a flag nor a flag's value
let file;
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("--")) {
    if (args[i] !== "--transparent") i++;
    continue;
  }
  file ??= args[i];
}
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const shots = args.flatMap((a, i) => (a === "--shot" ? [args[i + 1]] : []));
const scale = Number(opt("scale", "2"));
const [vw, vh] = opt("viewport", "1600x1000").split("x").map(Number);
const pdf = opt("pdf", null);
const quality = Number(opt("jpeg-quality", "88"));
const transparent = args.includes("--transparent");

if (!file || !existsSync(file)) {
  console.error("usage: render.mjs <file.html> --shot '#id=out.png' [--pdf out.pdf] [--scale 2] [--transparent]");
  process.exit(1);
}

const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chrome found. Install Google Chrome or set CHROME_PATH.");
  process.exit(1);
}

const abs = path.resolve(file);
const dir = path.dirname(abs);
const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: vw, height: vh }, deviceScaleFactor: scale });
await page.goto(`file://${abs}`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r))))));
await page.waitForTimeout(400);

for (const s of shots) {
  const [sel, out] = s.split("=");
  const target = path.resolve(dir, out);
  const jpeg = /\.jpe?g$/i.test(out);
  await page.locator(sel).first().screenshot({
    path: target,
    type: jpeg ? "jpeg" : "png",
    ...(jpeg ? { quality } : { omitBackground: transparent }),
  });
  console.log("shot", sel, "→", target);
}

if (pdf) {
  const target = path.resolve(dir, pdf);
  await page.emulateMedia({ media: "print" });
  await page.pdf({ path: target, width: `${vw}px`, height: `${vh}px`, printBackground: true, preferCSSPageSize: true });
  console.log("pdf →", target);
}

await browser.close();
