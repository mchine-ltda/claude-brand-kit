---
name: brand-kit
description: "Coded brand kits, no image generation: a 7-tile brand moodboard (/moodboard), the logo as transparent PNG + SVG files (/logo), or the full kit (/brand-kit) = logo files + moodboard + a 10-page brand guidelines PDF + design tokens. Built in HTML/CSS/SVG and rendered with the local Chrome, in one look: near-black backdrop, rounded tiles, one loud accent that glows. Use when someone types /brand-kit, /moodboard or /logo, or asks for a moodboard, logo files, brand guidelines or a brand kit for a brand that already exists. For a brand that doesn't exist yet, use /brand-identity."
argument-hint: "[brand or project, folder, site URL, palette or notes]"
---

# brand-kit

Three outputs, one look, after a sportswear brand board. `examples/kiln/` is a
complete kit for a fictional ceramics studio made with these skills — its
`brand.json`, moodboard, brand book pages and logo files; open
`examples/kiln/moodboard.jpg` to see the target quality before starting.

| Command | Delivers |
|---|---|
| `/moodboard` | `moodboard.png` (3200 × 2000) + `moodboard.jpg` + `moodboard.html` |
| `/logo` | transparent PNGs: wordmark for dark backgrounds, wordmark for light backgrounds, monogram tile, mark alone; SVGs of the mark and monogram; `favicon.ico`; `logo.html` |
| `/brand-kit` | everything from `/logo` and `/moodboard`, plus `<slug>-brand-guidelines.pdf` (10 pages + "In use" pages of the brand on the business's products, packaging, signage and stationery), a cover PNG, `tokens.css`, `tokens.json` and a `README.md` listing the files |
| `/brand-identity` | (its own skill) interviews the person, writes the strategy, lets them pick a direction and a logo, then runs this skill |

Everything is drawn in HTML/CSS/SVG and rendered locally, so every output is
the person's to use. If they want photo-real mockups, say that needs an image
generator and stop there unless they ask.

## Files in this skill

`SKILL_DIR` below is the folder this file is in (usually `~/.claude/skills/brand-kit`).

- `templates/moodboard.html` · `logo.html` · `brandbook.html` — the three kit outputs
- `templates/items/*.html` — 17 drawn applications (box, bag, storefront, letterhead, product…) used in moodboard slots and the brand book's "In use" pages; `templates/items-gallery.html` shows any set of them as a menu
- `references/applications.md` — the item list, which items suit which business, how to draw the product, and the image-generator option
- `templates/directions.html` · `concepts.html` · `strategy.html` — used by brand-identity
- `scripts/fill.mjs <template> <brand.json> <out.html>` — fills `{{PLACEHOLDERS}}`, fails if any are left
- `scripts/render.mjs <file.html> --shot "#id=out.png" [--transparent] [--pdf out.pdf] [--scale 2]` — PNG/JPG shots and PDFs with the local Chrome
- `scripts/capture.mjs <url> <dir>` — `site-desktop.jpg` + `site-mobile.jpg` of a live site
- `scripts/palette.mjs Name=#hex …` — RGB, HSL and WCAG contrast for every pair
- `examples/kiln/brand.json` — every placeholder filled; copy it as the starting point

Run scripts as `node SKILL_DIR/scripts/<script>.mjs`. They need `playwright-core`
(installed in `SKILL_DIR` by the installer; if it is missing run
`npm install` there) and Google Chrome at its usual path, or `CHROME_PATH`.

## Step 1 · Gather the brand (every command)

Look before asking. In the current project read, when present: content files
(`brand.ts`, `site.config.*`, `package.json` name), theme tokens (`globals.css`,
Tailwind config), `icon.svg`/logo files, the fonts in use, the live URL. Then
fill a `brand.json`:

- **Name** (`BRAND`, `BRAND_UPPER`, `slug`), **city/country**, **category** (what the business does, in a few words)
- **Palette in this pattern:** a quiet base (`BASE`), a light that is **never pure white** (`LIGHT`, e.g. #f2f1ec), an ink that is **never pure black** (`INK`), and **one loud accent** (`ACCENT`) plus `ACCENT_DEEP`, the accent darkened until it reads on `LIGHT`. Give each a short name (e.g. Clay, Bisque, Char, Ember).
- **Type:** a display face (`DISPLAY_FONT`), one serif italic for a single emphasised word (`ACCENT_FONT`), a mono for labels (`MONO_FONT`). Google Fonts go in `FONT_LINKS`; licensed local files go in `assets/` and are declared in `FONT_FACES`. Note each font's licence in the brand book.
- **The mark** (`MARK_SVG`, drawn in a 32 × 32 box with `currentColor` and the accent as `fill="var(--accent)"`) and **the wordmark** (`WORDMARK_HTML`). Use the brand's real ones. If there are none, design a simple wordmark (one distinctive detail, marked up with `.acc` or `.dot-over`) and a monogram from its first letter, and say clearly that these are proposals — or suggest `/brand-identity`.
- **Headline** for the billboard: who it's for and the outcome, never an empty slogan; its last word goes in the serif italic, then the accent dot.
- Brand book words (positioning, three values, voice do/don't) **restate what the brand already says and does**. Never invent clients, numbers, reviews or history. If something is unknown, write a neutral line and list it as a placeholder in the reply.

Ask only for what can't be found and blocks the work (usually: which accent,
when there is no palette at all). Otherwise use sensible defaults, mark them
as proposals, and keep going.

Output folder: the project's `brand/` folder if it has one, else
`<cwd>/<slug>-brand-kit/`. Keep `brand.json` there so later runs reuse it.
Never overwrite an earlier kit: write into a dated subfolder or ask.

## Step 2 · Applications: what the brand appears on (/moodboard and /brand-kit)

The moodboard and the brand book show the brand on **the things this business
makes, sells and uses** — read `references/applications.md` now.

1. **Work out the business**: what it sells (a physical product? a service? a
   venue? software?), where customers meet it, and where the person said the
   brand will be seen.
2. **Propose a set**: 5 items for the moodboard slots (in slot order) and the
   extra ones for the brand book's "In use" pages, from the starting sets in
   `references/applications.md`. Lead with the product itself when there is
   one. Only two tiles are the same for everyone: the mark and the
   type + palette card.
3. **Let the person shape it** (`AskUserQuestion`): show the proposed list in
   words and ask: *Use this set · Add or remove items · Show me more options*.
   - "Add or remove": take their edits (plain text is fine).
   - "Show me more options": fill `templates/items-gallery.html` with every
     item that could fit this business (in their colours, with the product
     drawn), render it, send it, and let them pick (`multiSelect`).
   Nothing is drawn for the final boards until the list is agreed. When nobody
   is there to answer (an automated run), use the proposal and say so.
4. **Coded or photo-real?** If an image-generation tool is connected in this
   session, ask (`AskUserQuestion`): *Coded, stylised (free, every file theirs)
   · Photo-real with <tool> (product and packaging shots)*. With no tool
   connected, use coded and say photo-real is possible with an image generator.
   Follow "Photo-real" in `references/applications.md` if chosen.
5. **The product**: if it sells a physical product, draw it as `PRODUCT_SVG`
   (see "Drawing the product") or generate it — the board isn't finished
   without it.

## /moodboard

1. Do Step 2. Then set `SLOT_2` … `SLOT_6` in `brand.json` to the chosen items
   (`"SLOT_2": "{{item:storefront}}"`, …) plus the values those items use
   (`MATERIAL`, `STORE_WINDOW`, `CARD_LINE`, `PHONE_SCREEN`, `LAPTOP_SCREEN`,
   `PRODUCT_SVG`). Fill `templates/moodboard.html` with `fill.mjs`.
   - **Phone/laptop:** with a live site, run `capture.mjs <url> <folder>/assets` and use the `<img>`; otherwise the drawn screens.
   - With **a reference image**, follow its layout tile for tile.
2. Render: `render.mjs moodboard.html --shot "#board=moodboard.png" --shot "#board=moodboard.jpg"`.
3. **Look at the PNG** (Read it) before showing it. Fix, re-render, look again:
   - every slot shows its item whole and recognisable (the product reads as the product);
   - the billboard's giant mark sits in the right half, never under the headline or fine print;
   - nothing is clipped that shouldn't be (the giant mark and its dot *should* be cropped);
   - hyphenated words use non-breaking hyphens (`&#8209;`) so "30-min" never splits;
   - no hosting URLs (like `*.vercel.app`) printed on mockups;
   - every text colour reads on its tile.
4. Send the PNG and say in a line or two what each tile shows, and which items are stylised drawings.

## /logo

1. Fill `templates/logo.html`.
2. Render with `--transparent`: `#wordmark-light`, `#wordmark-dark`, `#monogram`, `#mark` → `<slug>-wordmark-light.png` etc. (2×: about 1600 px wordmarks, 1200 px squares).
3. Save `<slug>-mark.svg` and `<slug>-monogram.svg` (colours written as hex, not `var()`), and `favicon.ico` (16/32/48/64) from the monogram PNG — Python PIL: `Image.open(png).save("favicon.ico", sizes=[(16,16),(32,32),(48,48),(64,64)])`.
4. Look at the dark-letter PNG (the light one looks blank on a white viewer — expected; say so). On light backgrounds the accent uses `ACCENT_DEEP`.
5. Send the files.

## /brand-kit

1. Do `/logo` and `/moodboard` in the same folder (Step 2 decides the items for both).
2. Run `palette.mjs` on the four colours. Use its numbers for `*_RGB` and `CONTRAST_PAIRS` (the useful pairs: light on base, ink on light, ink on accent, accent on base; each `<div class="pair" style="background:…;color:…">Text <small>7.5:1 AA</small></div>`). Never estimate a ratio.
3. Fill `templates/brandbook.html`. **In use pages:** `IN_USE_PAGES` = one page per 2–3 items, every agreed item that isn't only on the moodboard, largest first:
   ```html
   <section class="page inuse"><div class="head"><span class="mono">08 · In use</span><span class="mono">{{BRAND_UPPER}}</span></div>
     <div class="grid3"><figure class="t"><figcaption>Box</figcaption>{{item:box}}</figure><figure class="t"><figcaption>Bag</figcaption>{{item:bag}}</figure><figure class="t"><figcaption>Cards</figcaption>{{item:cards}}</figure></div>
     <div class="foot"><span class="mono">The brand on what we sell</span><span class="mono pn"></span></div></section>
   ```
   (`grid3` = one big + two; `grid2` = two side by side). `TOC_FILES` = the files page number (10 + number of in-use pages, two digits). Also: `MOODBOARD_SRC` = `moodboard.png`; `PROPORTION_BAR` = four `<span style="flex:N;background:…">`, e.g. 60/25/10/5; `VOICE_DO`, `VOICE_DONT`, `FILE_LIST` = `<li>` items; `TOKENS_CSS` = the `:root` block). Render:
   `render.mjs brandbook.html --pdf <slug>-brand-guidelines.pdf --shot "#p-cover=<slug>-brand-cover.png"`
4. Write `tokens.css` and `tokens.json` (colours, fonts, radii 14/22/28, the glow) and a `README.md` listing every file.
5. Check the pages: render `--scale 1 --shot ".page:nth-of-type(N)=page-N.jpg"` for each and look; fix overflow (long names can overrun the big headings), re-render.
6. Send the PDF, the moodboard and the folder path. Name anything that is a proposal, a placeholder or a stylised drawing.

## House style

- Simple, never plain: few elements, each catchy and art-directed.
- A near-black or quiet base, one big colour, one loud accent that glows.
- Light surfaces are never pure #fff; dark ones never pure #000.
- One serif italic word per headline, closed with the accent dot.
- Show the result as an image before talking about it; keep the reply short and concrete.
