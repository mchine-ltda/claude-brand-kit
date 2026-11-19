#!/usr/bin/env node
/**
 * brand-kit fill helper: copies a template and replaces its {{PLACEHOLDERS}}
 * from a JSON file, then lists any placeholder left unfilled.
 *
 *   node ~/.claude/skills/brand-kit/scripts/fill.mjs <template.html> <brand.json> <out.html>
 *
 * brand.json is a flat object: { "BRAND": "Kiln", "ACCENT": "#ff6a3d", ... }.
 * Values are inserted as-is (HTML allowed). Exits 1 if anything is left, so
 * a half-filled board is never rendered by mistake.
 */
import { readFileSync, writeFileSync } from "node:fs";

const [tpl, data, out] = process.argv.slice(2);
if (!tpl || !data || !out) {
  console.error("usage: fill.mjs <template.html> <brand.json> <out.html>");
  process.exit(1);
}
const values = JSON.parse(readFileSync(data, "utf8"));
const html = readFileSync(tpl, "utf8").replace(/\{\{([A-Za-z0-9_]+)\}\}/g, (m, k) => (k in values ? String(values[k]) : m));
writeFileSync(out, html);
const left = [...new Set([...html.matchAll(/\{\{([A-Za-z0-9_]+)\}\}/g)].map((m) => m[1]))];
if (left.length) {
  console.error(`unfilled in ${out}: ${left.join(", ")}`);
  process.exit(1);
}
console.log("filled →", out);
