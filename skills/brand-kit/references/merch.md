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

## Photo-real merch (optional, an image generator connected)

Follow "Photo-real" in `references/applications.md`: **the disclaimer first**
(credits, 2–3 tries per piece, the tally at the end, coded stays free), then
reference mode (the real mark and wordmark as reference images, the finish
named), the check against the real files, and the overlay only as a fallback.
Ask for 4:5 portrait images (the sheet's tiles); one extra "hero" shot with
several pieces together (hoodie, tote, mug, box, tag on a stone shelf) makes a
strong top image for the sheet, if the person wants it (one more image).

| Item | Scene | Finish to name |
|---|---|---|
| tee | a person wearing a {BASE} t-shirt, the mark on the chest | screen printed in {LIGHT} |
| tee-back | a person seen from behind in a {BASE} t-shirt, the wordmark and tag lines across the back, a street at dusk | screen printed |
| hoodie | a {BASE} heavyweight hoodie, worn or laid on a stone surface, {ACCENT} drawstrings, the mark on the chest | embroidered in {LIGHT} thread |
| cap | an {INK} six-panel cap, worn or on a shelf, a {ACCENT} top button, the mark on the front | embroidered |
| beanie | a {BASE} ribbed beanie, a {LIGHT} woven label on the cuff with the mark | woven label |
| tote | a natural canvas tote, on a shoulder or against a wall, the mark (or lockup) on the front | screen printed in {INK} |
| mug | a {BASE} stoneware mug with a {ACCENT} glazed inside, in hands or on stone | debossed into the clay |
| bottle | a matte {BASE} water bottle, desk or gym bag | laser engraved / printed |
| notebook | a {BASE} hardback notebook, a {ACCENT} elastic band, on a desk with a pen | debossed |
| pin | a round enamel pin with a gold rim on a denim lapel, the mark in {LIGHT} on {BASE} enamel | hard enamel |
| sticker | a round {BASE} sticker with the mark, on a laptop lid or a bottle | vinyl print |

Give the person the coded sheet too (free, always made), so they can compare.
