#!/usr/bin/env node
/**
 * brand-kit fill helper: copies a template and fills it from brand.json, then
 * lists anything left unfilled.
 *
 *   node SKILL_DIR/scripts/fill.mjs <template.html> <brand.json> <out.html>
 *
 * Three kinds of tags, resolved repeatedly (so values may contain tags):
 *   {{KEY}}          a value from brand.json (HTML allowed), e.g. {{BRAND}}
 *   {{item:name}}    an application mockup from templates/items/<name>.html,
 *                    e.g. "SLOT_2": "{{item:bag}}" in brand.json
 *   {{>file}}        a partial from templates/partials/<file>, e.g. {{>items.css}}
 *
 * brand.json is a flat object: { "BRAND": "Kiln", "ACCENT": "#ff6a3d", ... }.
 * Exits 1 if anything is left, so a half-filled board is never rendered.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [tpl, data, out] = process.argv.slice(2);
if (!tpl || !data || !out) {
  console.error("usage: fill.mjs <template.html> <brand.json> <out.html>");
  process.exit(1);
}
const templates = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "templates");
const values = JSON.parse(readFileSync(data, "utf8"));
const missingFiles = new Set();

const readPart = (dir, name) => {
  const f = path.join(templates, dir, name);
  if (!existsSync(f)) {
    missingFiles.add(`${dir}/${name}`);
    return `<!-- missing ${dir}/${name} -->`;
  }
  return readFileSync(f, "utf8");
};

let html = readFileSync(tpl, "utf8");
for (let pass = 0; pass < 6; pass++) {
  const before = html;
  html = html
    .replace(/\{\{item:([a-z0-9-]+)\}\}/g, (m, n) => readPart("items", `${n}.html`))
    .replace(/\{\{>([A-Za-z0-9._-]+)\}\}/g, (m, n) => readPart("partials", n))
    .replace(/\{\{([A-Za-z0-9_]+)\}\}/g, (m, k) => (k in values ? String(values[k]) : m));
  if (html === before) break;
}
writeFileSync(out, html);

const left = [...new Set([...html.matchAll(/\{\{([A-Za-z0-9_:>.-]+)\}\}/g)].map((m) => m[1]))];
if (left.length || missingFiles.size) {
  if (left.length) console.error(`unfilled in ${out}: ${left.join(", ")}`);
  if (missingFiles.size) console.error(`missing files: ${[...missingFiles].join(", ")}`);
  process.exit(1);
}
console.log("filled →", out);
