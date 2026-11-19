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

## Photo-real with an image generator (optional)

Only when the person chooses it **and** an image tool is connected in this
session (an image-generation MCP server or skill). Check its licence allows
commercial use and say so.

1. Generate each item **without the logo** (generators garble lettering):
   describe the object, material, setting and light, and give the palette as
   hex values ("matte box in #2b2420 with an #ff6a3d band, studio light, dark
   backdrop, no text, no logo"). Square or matching the slot's shape.
2. Save into `assets/gen-<item>.jpg` and place it with the real logo laid on
   top in CSS:
   `<div class="app app-photo"><img class="bg" src="assets/gen-box.jpg" alt="" /><svg class="logo-on mk" style="left:44%;top:30%;width:12%" viewBox="0 0 32 32"><use href="#mark"/></svg></div>`
3. Mix freely: generated photos for the product shots, coded items for flat
   things (stationery, signs, billboard) where code is sharper.
4. Look at every image before using it; regenerate anything with stray text,
   warped products or wrong colours.
