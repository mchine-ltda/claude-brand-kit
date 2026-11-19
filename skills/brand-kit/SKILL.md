---
name: brand-kit
description: "Brand kits drawn in code, photo-real when an image generator is connected: a 7-tile brand moodboard (/moodboard), the logo as transparent PNG + SVG files (/logo), or the full kit (/brand-kit) = logo files + moodboard + a 10-page brand guidelines PDF + design tokens, and merch mockups (/merch-mockup). Built in HTML/CSS/SVG and rendered with the local Chrome, in one look: near-black backdrop, rounded tiles, one loud accent that glows. Use when someone types /brand-kit, /moodboard, /logo or /merch-mockup, or asks for a moodboard, logo files, brand guidelines or a brand kit for a brand that already exists. For a brand that doesn't exist yet, use /brand-identity."
argument-hint: "[brand or project, folder, site URL, palette or notes]"
---

# brand-kit

Four outputs, one look, after a sportswear brand board. `examples/kiln/` is a
complete kit for a fictional ceramics studio made with these skills — its
`brand.json`, moodboard, brand book pages and logo files; open
`examples/kiln/moodboard.jpg` to see the target quality before starting.

| Command | Delivers |
|---|---|
| `/moodboard` | `moodboard.png` (3200 × 2000) + `moodboard.jpg` + `moodboard.html` |
| `/logo` | transparent PNGs: wordmark for dark backgrounds, wordmark for light backgrounds, monogram tile, mark alone; SVGs of the mark and monogram; `favicon.ico`; `logo.html` |
| `/brand-kit` | everything from `/logo` and `/moodboard`, plus `<slug>-brand-guidelines.pdf` (10 pages + "In use" pages of the brand on the business's products, packaging, signage and stationery), a cover PNG, `tokens.css`, `tokens.json` and a `README.md` listing the files |
| `/merch-mockup` | the brand on the merch the person picks (tees, hoodies, caps, totes, mugs…): `merch-mockups.png` sheet, one PNG per piece in `merch/`, the print files in `merch/print/` — coded, or photo-real with a connected image generator |
| `/brand-identity` | (its own skill) interviews the person, writes the strategy, lets them pick a direction and a logo, then runs this skill |

Everything is drawn in HTML/CSS/SVG and rendered locally, so every output is
the person's to use. **The coded path is complete and 100% free.**
Photo-real mockups are optional and need an image generator the person
connects: offer them where this file says to, always with the disclaimer in
`references/applications.md` (credits, more than one try, a tally at the
end), and never generate without their yes.

## Files in this skill

`SKILL_DIR` below is the folder this file is in (usually `~/.claude/skills/brand-kit`).

- `templates/moodboard.html` · `logo.html` · `brandbook.html` — the three kit outputs
- `templates/items/*.html` — 24 drawn applications (box, bag, storefront, letterhead, product, hoodie, cap, tote…) used in moodboard slots and the brand book's "In use" pages; `templates/items-gallery.html` shows any set of them as a menu
- `templates/merch.html` — the merch sheet for /merch-mockup; `references/merch.md` — the merch menu, what to suggest, colourways and photo-real scenes
- `references/applications.md` — the item list, which items suit which business, how to draw the product, and the image-generator option
- `templates/directions.html` · `concepts.html` · `strategy.html` — used by brand-identity
- `scripts/fill.mjs <template> <brand.json> <out.html>` — fills `{{PLACEHOLDERS}}`, fails if any are left
- `scripts/render.mjs <file.html> --shot "#id=out.png" [--transparent] [--pdf out.pdf] [--scale 2]` — PNG/JPG shots and PDFs with the local Chrome
- `scripts/capture.mjs <url> <dir>` — `site-desktop.jpg` + `site-mobile.jpg` of a live site
- `scripts/palette.mjs Name=#hex …` — RGB, HSL and WCAG contrast for every pair
- `scripts/composite.py photo overlay out --corners …` — lays the logo/headline onto a generated photo in perspective (needs Pillow); `templates/overlays.html` renders those transparent pieces
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
   one. Two tiles are the same for everyone, always: the mark and the
   summary card (category, type and palette — `item:summary`). Never drop them.
3. **Let the person shape it** (`AskUserQuestion`): show the proposed list in
   words and ask: *Use this set · Add or remove items · Show me more options*.
   - "Add or remove": take their edits (plain text is fine).
   - "Show me more options": fill `templates/items-gallery.html` with every
     item that could fit this business (in their colours, with the product
     drawn), render it, send it, and let them pick (`multiSelect`).
   Nothing is drawn for the final boards until the list is agreed. When nobody
   is there to answer (an automated run), use the proposal and say so.
4. **Coded or photo-real?** Coded is the default and free. Photo-real
   (the mark embroidered on a real hoodie, debossed in a mug, a billboard in
   a real street) needs an image generator. Look for one in this session (an
   MCP tool like `generate_image`, or a skill like Higgsfield's).
   - None connected: make it coded, and say in one line that connecting an
     image generator would make it photo-real (optional, uses that tool's
     credits).
   - One connected: ask (`AskUserQuestion`): *Coded, stylised (free) ·
     Photo-real with <tool> (better results; uses your <tool> credits, can
     take 2–3 tries per piece)*. If they pick photo-real, give **the
     disclaimer** from `references/applications.md` → "Photo-real" and get
     a second, explicit yes before the first image. Then follow that
     section: reference mode (the real mark and wordmark as reference images,
     exact colours and finish in the prompt), check every image against the
     real files, overlay only as a fallback, and end with the tally.
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

## /merch-mockup

The brand on merch. Read `references/merch.md` first.

1. **Gather the brand assets.** Look for a kit this skill already made: the
   project's `brand/` folder or `<slug>-brand-kit/` (its `brand.json`, the
   logo PNGs/SVGs, `tokens.css`). Tell the person in one line what you found
   ("Using kiln-brand: the mark, the wordmark, Clay/Bisque/Char/Ember, Space
   Grotesk"). If there is no kit, do "Step 1 · Gather the brand" (or suggest
   `/brand-identity` when there is no brand yet). Write into
   `<kit folder>/merch/` (a dated subfolder if one exists already).
2. **Ask what merch** (`AskUserQuestion`, `multiSelect`, before drawing
   anything). Suggest first what suits the business (`references/merch.md` →
   "Which ones to suggest first"), and mark those "(Suggested)". Up to four
   questions of up to four options each, by group:
   *Apparel* (t-shirt chest · t-shirt back print · hoodie · cap/beanie),
   *Bags & drinkware* (canvas tote · mug · water bottle · takeaway cup),
   *Desk & small things* (notebook · enamel pin · stickers · hang tag/pass),
   and a last one: *Show me all of them drawn first · No, that's the list*.
   "Other" takes anything else (socks, an apron…: draw or generate it).
   "Show me all drawn": fill `templates/items-gallery.html` with every merch
   item, render, send it, ask again.
3. **Code or image generator?** Always ask before generating
   (`AskUserQuestion`):
   *Image generator — photo-real (Recommended for the best results)* — the
   mark embroidered on a real hoodie, a cap on a head, a tote on a shoulder;
   uses that tool's credits, and a piece can take 2–3 tries ·
   *Code — stylised, like the rest of the kit (100% free, instant)*.
   Look for an image tool in this session first (an MCP tool such as
   `generate_image`, or a skill such as Higgsfield's) and name it in the
   option. If there is none and they pick the generator, say how to connect
   one (an image-generation MCP server or skill, then start a new session) and
   offer to make the coded sheet meanwhile.
   If they pick the generator, give **the disclaimer** from
   `references/applications.md` → "Photo-real" with the real numbers (N
   pieces → N images, up to about 3N tries), check the tool's licence allows
   commercial use, and get a second, explicit yes before the first image.
4. **Make it.**
   - *Coded:* in a copy of `brand.json` set `MERCH_NOTE` ("Coded mockups ·
     stylised") and `MERCH_TILES`, one tile per piece in the order chosen:
     `<figure class="t" id="m-hoodie"><figcaption>Hoodie</figcaption>{{item:hoodie}}<p class="spec">Heavyweight hoodie · Clay · chest print</p></figure>`.
     The summary card (type & palette) closes the sheet by itself — it is
     always there. Fill `templates/merch.html`.
   - *Photo-real:* make the coded sheet first (free, so they always have
     it), then follow "Photo-real merch" in `references/merch.md`: render
     the overlays, generate each piece in reference mode with the real mark
     as the reference image, check each against the real files (retry at
     most 3 times, then fall back to the overlay or the coded piece), and
     keep the tally; then the tile is
     `<figure class="t" id="m-hoodie"><figcaption>Hoodie</figcaption><div class="app app-photo"><img class="bg" src="merch/photo-hoodie.jpg" alt="" /></div><p class="spec">…</p></figure>`
     and `MERCH_NOTE` names the tool ("Photographs made with …").
     Mixing is fine (photo for worn pieces, code for a pin).
5. **Render** the sheet and every piece:
   `render.mjs merch.html --scale 2 --shot "#board=merch-mockups.png" --shot "#board=merch-mockups.jpg" --shot "#m-hoodie=merch/hoodie.png" …`
6. **Print files** in `merch/print/`: fill and render `templates/overlays.html`
   (transparent mark, wordmark, lockup, tag lines, light and dark ink, at
   `--scale 4`) and copy the SVG mark/monogram. Name which file goes on which
   piece in `merch/README.md` (e.g. hoodie chest → `ov-wordmark-light.png`,
   about 25 cm wide; cap front → `<slug>-mark.svg`, 6 cm, embroidery).
7. **Look** at the sheet (Read it): every piece whole and recognisable, the
   print centred and readable, nothing clipped, no stray letters in photos.
   Fix and re-render. Then send the sheet, list the files, and say which
   pieces are stylised drawings or generated photos. After photo-real, end
   with the tally: images generated, with which tool, and which pieces took
   more than one try.

## House style

- Simple, never plain: few elements, each catchy and art-directed.
- A near-black or quiet base, one big colour, one loud accent that glows.
- Light surfaces are never pure #fff; dark ones never pure #000.
- One serif italic word per headline, closed with the accent dot.
- Show the result as an image in the chat (Read it, then send it) before talking about it; keep the reply short and concrete.
- Never open working files or previews in the person's browser pane — boards are 1600 px wide and look oversized there. Render, check, and send the image.
