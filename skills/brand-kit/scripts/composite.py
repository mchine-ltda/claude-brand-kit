#!/usr/bin/env python3
"""
brand-kit composite helper: lays a transparent PNG (the logo, a headline, a
label) onto a photo in perspective, so it looks printed, stitched or lit on
the real surface — a billboard panel, a t-shirt, a bottle, a box lid.

  python3 SKILL_DIR/scripts/composite.py photo.jpg overlay.png out.jpg \
      --corners 412,180 980,210 970,560 405,520 [--blend multiply] [--opacity 0.92] [--fit contain]

--corners   the four corners of the surface in the photo, clockwise from top
            left, in pixels (or fractions 0–1 of the photo's width/height).
            The overlay is stretched onto that quadrilateral.
--fit       contain (default): keep the overlay's proportions, centred in the
            quad; stretch: fill the quad exactly.
--blend     normal (printed, opaque) · multiply (printed into fabric/paper,
            takes on the folds and shadows) · screen (lit, glowing signs)
--opacity   0–1, default 1. Fabric prints look real at about 0.85–0.92.
--shade     0–1: re-applies the photo's light and shadow on top of the
            overlay (default 0.35 for normal, 0 otherwise) so it sits in the scene.

Needs Pillow (pip install pillow). Runs any number of times on the same photo:
use the output as the next input to add a second overlay.
"""
import argparse
from PIL import Image, ImageChops, ImageFilter


def solve(a, b):
    """Gaussian elimination for the 8x8 perspective system."""
    n = len(b)
    m = [row[:] + [b[i]] for i, row in enumerate(a)]
    for c in range(n):
        p = max(range(c, n), key=lambda r: abs(m[r][c]))
        m[c], m[p] = m[p], m[c]
        for r in range(n):
            if r != c and m[c][c]:
                f = m[r][c] / m[c][c]
                m[r] = [x - f * y for x, y in zip(m[r], m[c])]
    return [m[i][n] / m[i][i] for i in range(n)]


def coeffs(dst, src):
    """PIL's PERSPECTIVE maps output (dst) pixels back to input (src) pixels."""
    a, b = [], []
    for (x, y), (u, v) in zip(dst, src):
        a.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.append(u)
        a.append([0, 0, 0, x, y, 1, -v * x, -v * y]); b.append(v)
    return solve(a, b)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("photo"); ap.add_argument("overlay"); ap.add_argument("out")
    ap.add_argument("--corners", nargs=4, required=True)
    ap.add_argument("--blend", default="normal", choices=["normal", "multiply", "screen"])
    ap.add_argument("--opacity", type=float, default=1.0)
    ap.add_argument("--fit", default="contain", choices=["contain", "stretch"])
    ap.add_argument("--shade", type=float, default=None)
    o = ap.parse_args()

    photo = Image.open(o.photo).convert("RGB")
    W, H = photo.size
    pts = []
    for c in o.corners:
        x, y = (float(v) for v in c.split(","))
        pts.append((x * W if x <= 1 else x, y * H if y <= 1 else y))

    ov = Image.open(o.overlay).convert("RGBA")
    ov = ov.crop(ov.getbbox() or (0, 0, *ov.size))
    if o.fit == "contain":
        # pad the overlay to the quad's average aspect so it isn't squashed
        qw = (abs(pts[1][0] - pts[0][0]) + abs(pts[2][0] - pts[3][0])) / 2
        qh = (abs(pts[3][1] - pts[0][1]) + abs(pts[2][1] - pts[1][1])) / 2
        target = qw / max(qh, 1)
        w, h = ov.size
        if w / h > target:
            nh = int(w / target); pad = Image.new("RGBA", (w, nh)); pad.paste(ov, (0, (nh - h) // 2)); ov = pad
        else:
            nw = int(h * target); pad = Image.new("RGBA", (nw, h)); pad.paste(ov, ((nw - w) // 2, 0)); ov = pad
    w, h = ov.size
    src = [(0, 0), (w, 0), (w, h), (0, h)]
    warped = ov.transform((W, H), Image.PERSPECTIVE, coeffs(pts, src), Image.BICUBIC)
    alpha = warped.split()[3].point(lambda a: int(a * o.opacity))
    rgb = warped.convert("RGB")

    if o.blend == "multiply":
        rgb = ImageChops.multiply(photo, rgb)
    elif o.blend == "screen":
        rgb = ImageChops.screen(photo, rgb)
    else:
        shade = 0.35 if o.shade is None else o.shade
        if shade > 0:
            # keep the scene's light: darken the overlay where the photo is dark
            lum = photo.convert("L").filter(ImageFilter.GaussianBlur(2))
            lit = ImageChops.multiply(rgb, Image.merge("RGB", [lum.point(lambda v: min(255, int(v * 1.6)))] * 3))
            rgb = Image.blend(rgb, lit, shade)

    out = Image.composite(rgb, photo, alpha)
    out.save(o.out, quality=92)
    print("composited →", o.out)


if __name__ == "__main__":
    main()
