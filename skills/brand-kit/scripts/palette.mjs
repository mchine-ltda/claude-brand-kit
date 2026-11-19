#!/usr/bin/env node
/**
 * brand-kit palette helper: RGB, HSL and WCAG contrast for a palette, so the
 * brand book quotes real numbers.
 *
 *   node ~/.claude/skills/brand-kit/scripts/palette.mjs Smoke=#4d4d4d Chalk=#f2f1ec Ink=#1c1c1c Lime=#c8ff32
 *
 * Prints each colour's RGB/HSL and every text-on-background pair with its
 * ratio and the WCAG level it reaches (AA normal 4.5, AA large 3, AAA 7).
 * Add --json for machine-readable output.
 */
const args = process.argv.slice(2).filter((a) => a !== "--json");
const json = process.argv.includes("--json");
const colours = args.map((a) => {
  const [name, hex] = a.includes("=") ? a.split("=") : [a, a];
  return { name, hex: hex.toLowerCase() };
});
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lum = (h) => {
  const c = rgb(h).map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const hsl = (h) => {
  const [r, g, b] = rgb(h).map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const hh = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [Math.round(hh * 60), Math.round(s * 100), Math.round(l * 100)];
};
const level = (r) => (r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA large" : "fail");

const out = {
  colours: colours.map((c) => ({ ...c, rgb: rgb(c.hex), hsl: hsl(c.hex) })),
  pairs: colours.flatMap((fg) => colours.filter((bg) => bg !== fg).map((bg) => {
    const r = ratio(fg.hex, bg.hex);
    return { text: fg.name, on: bg.name, ratio: Math.round(r * 100) / 100, level: level(r) };
  })),
};
if (json) console.log(JSON.stringify(out, null, 2));
else {
  for (const c of out.colours) console.log(`${c.name.padEnd(12)} ${c.hex}  rgb(${c.rgb.join(", ")})  hsl(${c.hsl[0]} ${c.hsl[1]}% ${c.hsl[2]}%)`);
  console.log("");
  for (const p of out.pairs) console.log(`${p.text.padEnd(10)} on ${p.on.padEnd(10)} ${String(p.ratio).padStart(5)}:1  ${p.level}`);
}
