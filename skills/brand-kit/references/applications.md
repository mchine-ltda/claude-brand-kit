# Applications: where the brand lives

The moodboard and the brand book show the brand **on the things the business
actually makes, sells and uses**. A shoe brand shows the shoe, the box, the
bag, the store and the letterhead; an agency shows its site, a billboard and a
card; a ceramics studio shows the cup, the box it ships in, the shop window.

## The library (`templates/items/`)

Each item is drawn in code, in the brand's colours, and fits any tile.

| Item tag | What it is | Best slots |
|---|---|---|
| `billboard` | street billboard: headline left, the mark giant on the right | 2, 3 |
| `storefront` | shop front: lit fascia with the logo, glowing windows, door (`STORE_WINDOW` = a word or two on the glass) | 2, 3 |
| `material` | the wordmark pressed into a surface with a glowing seam (`MATERIAL` = knit · clay · leather · wood · paper · concrete · linen) | 3, 2 |
| `letterhead` | A4 letterhead and envelope | 2, 3 |
| `cards` | business cards, front and back (`CARD_LINE` = a contact line) | 2, 3 |
| `box` | product box / shoebox / gift box with tissue | 2, 3, 4 |
| `bag` | shopping bag (add class `light` to `.bag` for a light bag) | 4, 5, 6 |
| `tag` | hang tag / swing ticket / pass | 4 |
| `poster` | A-size poster on a wall | 4 |
| `tee` | t-shirt / staff uniform with the mark on the chest | 4 |
| `bottle` | bottle or jar with a label | 4, 5, 6 |
| `cup` | takeaway cup with a sleeve | 5, 6 |
| `mug` | mug (add class `light` to `.body` for a light mug) | 5, 6 |
| `sticker` | round seal sticker on kraft paper, the name around the edge | 5, 6 |
| `phone` | the site or app on a phone (`PHONE_SCREEN`) | 5, 4 |
| `laptop` | the site on a laptop (`LAPTOP_SCREEN`) | 2, 3 |
| `product` | **the business's own product** on a plinth (`PRODUCT_SVG`, drawn per brand) | 4, 5, 6, 2 |

Moodboard slots: 2 = wide top middle · 3 = wide top right · 4 = tall left ·
5 and 6 = narrow bottom. Tile 1 (the mark) and tile 7 (type + palette) never
change.

`PHONE_SCREEN` / `LAPTOP_SCREEN`: with a live site, an
`<img src="assets/site-mobile.jpg" alt="" />` (from `scripts/capture.mjs`);
without one, the drawn screens `{{>phone-screen.html}}` /
`{{>site-hero.html}}`.

## Starting sets by business

Propose 5 for the moodboard (in slot order 2→6) and 3–9 for the brand book's
"In use" pages. Always lead with **the product itself** when the business sells
a physical product. These are starting points — adapt to the interview
("where will the brand be seen most?").

| Business | Moodboard (slots 2–6) | Also for "In use" |
|---|---|---|
| Footwear / fashion | box · storefront · product (the shoe/garment) · bag · tag | tee, letterhead, cards, billboard |
| Ceramics / homeware / craft | storefront · box · product (the piece) · sticker · bag | material (clay), cards, poster, letterhead |
| Café / coffee / bakery | storefront · material (wood) · poster · cup · bag | mug, sticker, tee (apron), phone |
| Restaurant / bar | storefront · billboard · poster · bottle · cards | tee (staff), sticker, phone |
| Drinks / food product | billboard · box · bottle · product · sticker | bag, poster, cards |
| Beauty / salon / cosmetics | storefront · box · bottle · bag · cards | poster, tee (uniform), phone |
| Barber / grooming | storefront · material (leather) · poster · bottle · cards | tee, sticker, phone |
| Retail shop (any) | storefront · bag · box · tag · sticker | cards, letterhead, poster |
| Services / trades / clinic | billboard · letterhead · tee (uniform) · phone · cards | poster, sticker |
| Agency / studio / consultancy | billboard · material (knit/paper) · tag · phone · mug | laptop, letterhead, cards |
| App / software / online | laptop · billboard · tee · phone · sticker | poster, cards |
| Personal brand / creator | billboard · laptop · tee · phone · sticker | poster, cards |
| Events / venue | poster · billboard · tag (wristband/pass) · tee · cup | sticker, phone |

## Drawing the product (`product`)

When the business sells a thing — a shoe, a candle, a chair, a ring — draw it:

- One SVG, viewBox about 100 × 70, a side or three-quarter view; 5–15 shapes.
- Flat colour with one or two gradients for volume, a soft shadow ellipse under it.
- Brand colours where the real product would carry them (a sole, a label, a
  glaze, a strap); the mark where the real logo would sit (`<use href="#mark"/>`
  inside a scaled `<g>`).
- Simple and bold beats detailed and wrong. It is a stylised drawing; say so.
- For a second product in the same kit, write the item's markup straight into
  the slot instead of reusing `PRODUCT_SVG`:
  `<div class="app app-product"><div class="plinth"></div><div class="product"><svg …></svg></div></div>`

## Photo-real: the board that feels alive (preferred when a generator is connected)

The look to aim for is a real brand campaign board: a person **wearing** the
t-shirt, the billboard **in a real concrete underpass**, the bottle **with
condensation on it**, the box **on a doorstep**, the cup **in someone's hands**.
Coded drawings can't show people or real materials, so when an image tool is
connected (an image-generation MCP tool such as Figma's `generate_image`, or a
skill such as Higgsfield's), photo-real is the default; drawings are the
fallback. Tell the person which tool you'll use, that each image spends its
credits, and check its licence allows commercial use.

**What stays coded:** tile 1 (the mark) and tile 7 (the summary card) — they
are graphic, not photographs — and anything flat where code is sharper
(letterhead, business cards) if a photo would add nothing.

### 1 · Generate each scene without lettering

Generators garble logos and text, so ask for **blank surfaces** where the brand
goes and add the real logo afterwards. One house style for every image, in
the spirit of a sportswear campaign board:

> cinematic brand campaign photograph, dark moody studio, low-key lighting,
> soft {ACCENT name} rim light ({ACCENT hex}), subtle haze, shallow depth of
> field, 85mm lens, rich real textures, premium editorial look, **no text, no
> letters, no logos, no watermark**

Then the scene, with the brand colours as hex and the blank area named:

| Item | Scene to ask for |
|---|---|
| tee | a person seen from behind, wearing a plain {BASE} t-shirt, blank upper back, a thin {ACCENT} line on the sleeve, dark studio |
| billboard | a large blank {LIGHT} billboard in a concrete underpass, strip lights on the ceiling, wet floor reflections; for a person/product brand, the person or product on the right half of the board |
| bottle | a matte {BASE} bottle with condensation droplets, a blank label panel, a {ACCENT} rim light, on a dark surface |
| cup / mug | a takeaway cup / handmade mug in someone's hands, blank sleeve / blank side, morning light, café table |
| box | a {BASE} product box with the lid on, blank lid, on a doorstep or a wooden table, tissue paper in {LIGHT} |
| bag | a person holding a {BASE} paper shopping bag with rope handles, blank front, a street at dusk |
| tag | a blank {INK} hang tag on a cord, hanging from a folded garment in {BASE} |
| storefront | a shop front at dusk, a blank dark fascia sign above warm glowing windows, a street |
| poster | a blank poster in a frame on a textured wall, a spotlight |
| material | a macro photograph of {material} in {BASE}, a thin glowing {ACCENT} seam, blank centre |
| product | the business's own product (describe it exactly), studio, on a plinth or in use |

Generate at the slot's shape (moodboard: slots 2 and 3 about 1:1 and 4:3,
slot 4 portrait 2:3, slots 5–6 tall 9:16; brand-book tiles 16:9 or 4:3).
Look at every image (Read it); regenerate anything with stray letters, warped
hands or products, or the wrong colours. Save as `assets/photo-<item>.jpg`.

### 2 · Put the real brand onto it

1. Render the overlays: fill `templates/overlays.html` and render it (the
   command is in the file) — the mark, the wordmark, the lockup and the
   headline, in light and dark ink, as transparent PNGs in `assets/`.
2. Find the four corners of each blank surface in the photo (clockwise from
   top left, in pixels — Read the image and estimate; inset a little from the
   edges so the print has a margin).
3. Lay it on:
   `python3 SKILL_DIR/scripts/composite.py assets/photo-tee.jpg assets/ov-mark-light.png assets/photo-tee.jpg --corners 610,420 760,425 755,560 605,555 --blend multiply --opacity 0.9`
   - fabric, paper, cardboard → `--blend multiply` (takes the folds and grain)
   - printed boards, labels, lids → `--blend normal` (the scene's light is kept on top)
   - lit signs, screens → `--blend screen`
   Billboards get the headline (`ov-headline-dark.png`) on the left half and
   the lockup or mark on the right; shirts and bottles get the mark.
4. Look at the result; adjust the corners if it floats or skews wrong.

### 3 · Place the photos

In `brand.json` the slot becomes the photo:
`"SLOT_4": "<div class=\"app app-photo\"><img class=\"bg\" src=\"assets/photo-tee.jpg\" alt=\"\" /></div>"`
— the same markup works in the brand book's "In use" figures. Mix freely:
photos for scenes with people and products, coded items for flat things.
Say in the reply which images were generated, with which tool.
