# Merch: the brand on things people wear and keep

Used by `/merch-mockup`. The sheet is `templates/merch.html`; every piece is
an item in `templates/items/`, so it also works in the moodboard and the
brand book.

## The menu

| Group | Item tag | What it shows | Print / finish to name in the spec line |
|---|---|---|---|
| Apparel | `tee` | t-shirt, the mark on the chest | screen print, chest |
| Apparel | `tee-back` | t-shirt from behind: wordmark + tag lines big on the back, the mark at the neck | screen print, back |
| Apparel | `hoodie` | hoodie, the wordmark across the chest, accent drawstrings | print or embroidery, chest |
| Headwear | `cap` | six-panel cap in the ink colour, embroidered mark, accent button and brim edge | embroidery, front panel |
| Headwear | `beanie` | ribbed knit beanie, woven label with the lockup | woven label, cuff |
| Bags | `tote` | natural canvas tote, the lockup and tag lines in ink | one-colour print |
| Bags | `bag` | paper shopping bag (`light` variant) | print |
| Drinkware | `mug` | ceramic mug, the mark and an accent band | print or glaze |
| Drinkware | `bottle` | bottle with a label | label or laser engrave |
| Drinkware | `cup` | takeaway cup with a sleeve | sleeve print |
| Desk & small | `notebook` | A5 hardback, debossed mark, accent elastic band, pen | deboss / foil |
| Desk & small | `pin` | enamel pin on its backing card | hard enamel, gold rim |
| Desk & small | `sticker` | round seal sticker on kraft | vinyl die-cut |
| Desk & small | `tag` | hang tag / event pass | print |
| Desk & small | `poster` | A-size poster | print |

Something not in the menu (socks, an apron, a phone case, a jersey): draw it
the same way — an SVG garment shape in `--base` with `fill: url(#…-shade)`
for volume, the print laid on in HTML in % of the shape (see `.app-hoodie`
in `items.css`) — or generate it. Say it was drawn for this brand.

## Which ones to suggest first

Start from the business and the interview, then fill to 5–8 pieces:

- Fashion, sport, streetwear, creators: tee-back, hoodie, cap, beanie, tote, sticker
- Cafés, bakeries, food: mug, cup, tote, cap (staff), tee, sticker
- Studios, makers, shops: tote, tee, mug, notebook, pin, sticker
- Agencies, software, B2B: hoodie, tee, notebook, bottle, sticker, pin
- Events, venues, teams: tee-back, cap, tag (pass), bottle, poster, pin

## Colourways

Garments in `--base` with a `--light` print by default. For a light
colourway, write the item's markup in the tile with a style override, e.g.
`<div class="app app-hoodie studio" style="--base: var(--light); --light: var(--ink)">…</div>`
(copy the item file's markup). Caps default to `--ink`. Never print the
accent on a garment as body text; it is for details (drawstrings, a button,
a band, a stripe).

## Photo-real merch (an image generator connected)

The same method as `references/applications.md` → "Photo-real": generate the
scene **with blank surfaces and no lettering**, then lay the real print on
with `scripts/composite.py`. Same house style prompt (moody studio, soft
accent rim light, 85 mm, no text, no logos). Ask for 4:5 portrait images
(the sheet's tiles).

| Item | Scene to ask for | Blend |
|---|---|---|
| tee | a person seen from the front wearing a plain {BASE} t-shirt, blank chest, studio | multiply, opacity 0.9 |
| tee-back | a person seen from behind in a plain {BASE} t-shirt, blank upper back, a street at dusk | multiply |
| hoodie | a person in a plain {BASE} hoodie, hood down, {ACCENT} drawstrings, blank chest | multiply |
| cap | a plain {INK} six-panel cap, blank front panel, a {ACCENT} top button; worn, three-quarter view | multiply |
| beanie | a plain {BASE} ribbed beanie, a blank {LIGHT} woven label on the cuff, worn | normal |
| tote | a person carrying a plain natural canvas tote, blank front, market or street | multiply |
| mug | a plain {BASE} ceramic mug in someone's hands, blank side, morning light | normal |
| bottle | a matte {BASE} water bottle, blank side, gym bag or desk, condensation | normal |
| notebook | a plain {BASE} hardback notebook with a {ACCENT} elastic band, blank cover, on a desk with a pen | multiply |
| pin | a plain round enamel pin with a gold rim and a blank {BASE} face, on a denim jacket lapel | normal (the mark-light overlay) |
| sticker | a blank round {BASE} sticker on a laptop lid or a water bottle | normal |

Overlays come from `templates/overlays.html`: `ov-mark-light/dark`,
`ov-wordmark-*`, `ov-lockup-*`, `ov-headline-*`, `ov-tag-light`. Light
garments take the `-dark` pieces. Look at every result; regenerate warped
hands, extra letters or wrong colours.
