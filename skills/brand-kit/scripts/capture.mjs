#!/usr/bin/env node
/**
 * brand-kit capture helper: screenshots a live website at desktop and phone
 * size, for the laptop/phone mockups on the moodboard.
 *
 *   node ~/.claude/skills/brand-kit/scripts/capture.mjs <url> <out-dir>
 *
 * Writes <out-dir>/site-desktop.jpg (1440x900 @2x) and site-mobile.jpg
 * (390x844 @3x). Reduced motion is on, so intro animations don't blur the shot.
 */
import { chromium } from "playwright-core";
import { existsSync, mkdirSync } from "node:fs";

const [url, out] = process.argv.slice(2);
if (!url || !out) {
  console.error("usage: capture.mjs <url> <out-dir>");
  process.exit(1);
}
mkdirSync(out, { recursive: true });
const executablePath = [process.env.CHROME_PATH, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome"]
  .filter(Boolean)
  .find((p) => existsSync(p));
const browser = await chromium.launch({ executablePath });
for (const s of [
  { name: "site-desktop.jpg", viewport: { width: 1440, height: 900 }, scale: 2, mobile: false },
  { name: "site-mobile.jpg", viewport: { width: 390, height: 844 }, scale: 3, mobile: true },
]) {
  const ctx = await browser.newContext({ viewport: s.viewport, deviceScaleFactor: s.scale, isMobile: s.mobile, hasTouch: s.mobile, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}/${s.name}`, type: "jpeg", quality: 90 });
  await ctx.close();
  console.log("captured", s.name);
}
await browser.close();
