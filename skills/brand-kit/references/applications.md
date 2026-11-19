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

## Photo-real: the board that feels alive (optional)

Photo-real is **optional**. The coded path is complete and 100% free; never
push the person towards a generator, and never generate without their yes.

The look to aim for is a real brand campaign: the mark **embroidered** on a
hoodie, **debossed** in a mug, **printed** on a canvas tote, the box with its
lid on a stone shelf, the billboard in a real underpass, warm light, real
textures. Coded drawings can't show people, fabric or real materials;
photographs can.

### The disclaimer (say it every time, before anything is generated)

Whenever photo-real is offered or chosen, tell the person in plain words,
before the first image (adapt the tool name and numbers):

> **Before we use photo-real:** each image is made by <tool> and uses your
> credits on <tool>, not on this skill. Image models don't get it right every
> time, so a piece can take **2–3 tries** before the logo, colours and letters
> match your brand; every try costs credits. I'll make **N images** (about
> **N–3N tries** at most) and tell you exactly how many I used. You can stop at
> any point and keep the coded version, which is free. This skill never charges
> anything itself.

Then ask for an explicit yes (`AskUserQuestion`: *Go ahead with photo-real ·
Keep it coded (free)*). If the tool shows a price or a credit count, quote it;
never guess one. Also check that the tool's licence allows commercial use and
say so (some free plans don't).

Keep a tally while generating, and **end every photo-real reply with it**:
"Generated 7 images with <tool> for 5 pieces (2 pieces took a second try).
Coded versions are in the folder too, free." Never retry more than 3 times
for one piece without asking; after 3 misses, offer the overlay fallback or
the coded piece.

### 1 · Give the generator the real brand (reference mode, the default)

The generator renders the logo itself (embroidered, printed, debossed,
glowing), so it looks part of the object. It gets the brand from the kit,
never from its own guess:

1. **References:** render the overlays (`templates/overlays.html`, command in
   the file) and pass as reference images: `ov-mark-*.png` for the mark, and
   `ov-wordmark-*.png` / `ov-lockup-*.png` whenever letters must appear. Use
   the tool's image-reference input (e.g. `--image` on Higgsfield; the
   reference/edit input on other MCP tools). If the tool takes no reference
   images, use "2 · Overlay" below instead.
2. **Prompt:** name everything exactly, and say it is the attached logo:
   > cinematic brand campaign photograph, {scene}. The logo is EXACTLY the
   > attached mark{ and wordmark}, unchanged in shape and proportions,
   > {finish: embroidered in {LIGHT name} thread / screen printed in {INK} /
   > debossed into the clay / foil stamped}. Colours: {BASE name} {BASE},
   > {LIGHT name} {LIGHT}, {ACCENT name} {ACCENT} for small details only.
   > {If letters appear: the wordmark reads exactly "{wordmark text}" in the
   > attached lettering, lowercase/uppercase as attached.} Warm low-key
   > studio light, soft {ACCENT name} rim light, shallow depth of field, 85mm,
   > rich real textures (fabric weave, clay grain, stone). No other text, no
   > other logos, no watermark.
3. **Prefer the mark over letters.** Models copy a simple mark far more
   reliably than a wordmark in a given font. Put the wordmark only where it
   matters (a box lid, a tag, a billboard), and use the mark elsewhere.
4. **Check every image (Read it) against the real files** before keeping it:
   - the mark's shape and proportions match `ov-mark-*.png`;
   - any letters spell the name exactly, in the right case and font style;
   - the colours are the brand's (no new accent, no pure white or black);
   - no extra text, logos, warped hands or melted objects.
   If it fails: retry once with the problem named in the prompt ("the arch
   was too narrow; keep the attached proportions"). If letters keep failing,
   generate that piece without letters and lay the wordmark on with
   "2 · Overlay". Count every try in the tally.

### 2 · Overlay (the fallback): a blank scene + the real logo laid on in code

For tools without image references, or for lettering a model keeps getting
wrong. Ask for **blank surfaces** where the brand goes (same style prompt,
"no text, no letters, no logos"), then lay the real overlay on:

1. Find the four corners of each blank surface in the photo (clockwise from
   top left, in pixels; Read the image and estimate; inset a little).
2. `python3 SKILL_DIR/scripts/composite.py assets/photo-tee.jpg assets/ov-mark-light.png assets/photo-tee.jpg --corners 610,420 760,425 755,560 605,555 --blend multiply --opacity 0.9`
   - fabric, paper, cardboard → `--blend multiply` (takes the folds and grain)
   - printed boards, labels, lids → `--blend normal`
   - lit signs, screens → `--blend screen`
3. Look at the result; adjust the corners if it floats or skews wrong.
   Flat overlays look printed, never embroidered or debossed, so say so.

### Scenes per item

| Item | Scene to ask for |
|---|---|
| tee | a person wearing a {BASE} t-shirt, the mark on the chest (or a person from behind, the back print), dark studio |
| billboard | a large {LIGHT} billboard in a concrete underpass, strip lights, wet floor reflections, the headline left and the mark right |
| bottle | a matte {BASE} bottle with condensation droplets, the label with the mark, a {ACCENT} rim light |
| cup / mug | a takeaway cup / handmade mug in someone's hands, the mark on the sleeve / debossed in the side, morning light |
| box | a {BASE} product box with the lid on, the mark (and wordmark) on the lid, on a stone shelf or a doorstep, tissue in {LIGHT} |
| bag | a person holding a {BASE} paper shopping bag with rope handles, the lockup on the front, a street at dusk |
| tag | a {ACCENT} or {INK} hang tag on a cord with the mark, hanging from a folded garment |
| storefront | a shop front at dusk, the lockup on a dark fascia above warm glowing windows |
| poster | a poster in a frame on a textured wall, a spotlight, the headline and the mark |
| material | a macro photograph of {material} in {BASE}, the mark pressed into it, a thin glowing {ACCENT} seam |
| product | the business's own product (describe it exactly) with the mark where the real one sits, studio or in use |

Generate at the slot's shape (moodboard: slots 2 and 3 about 1:1 and 4:3,
slot 4 portrait 2:3, slots 5–6 tall 9:16; brand-book tiles 16:9 or 4:3).
Save as `assets/photo-<item>.jpg`. One "hero" scene with several pieces
together (hoodie, tote, mug, box and tag on a stone shelf) also makes a strong
cover for the brand book or the merch sheet; count it as one image.

### Placing the photos

In `brand.json` the slot becomes the photo:
`"SLOT_4": "<div class=\"app app-photo\"><img class=\"bg\" src=\"assets/photo-tee.jpg\" alt=\"\" /></div>"`
— the same markup works in the brand book's "In use" figures and the merch
sheet. Mix freely: photos for scenes with people and products, coded items for
flat things. Tiles 1 (the mark) and 7 (the summary card) always stay coded.
Keep the coded version of every piece in the folder too.
