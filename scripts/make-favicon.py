#!/usr/bin/env python3
"""Generate the site favicon set from a single vector-ish definition.

Why this exists rather than exporting the App Store icon again: the App Store
icon is a pale-lavender glass tile (#c8bcfa family) whose contrast against white
is 1.75:1. At the 16px Google renders in search results it is invisible, and at
16px a 6-column keyboard is sub-pixel mush. This draws the same motif — rounded
tile + keyboard — with a hue-matched dark purple and 4 oversized keys per row so
the silhouette survives downscaling.

`app/apple-icon.png` is deliberately NOT regenerated: that one is the iOS
home-screen icon and should stay identical to the App Store artwork.

Run: python3 scripts/make-favicon.py   (writes app/icon.png and app/favicon.ico)
"""
import os

from PIL import Image, ImageDraw

# Hue-matched dark sibling of --color-brand-purple (#c8bcfa, H=252 S=86% L=86%).
# Lightness dropped to ~54% so the tile clears 5:1 against a white SERP row while
# the white keys stay ~5:1 against the tile.
TILE = (0x5B, 0x3A, 0xDE)
KEYS = (0xFF, 0xFF, 0xFF)

S = 1024  # supersample, then downscale once for clean edges
OUT = 192


def draw(size: int) -> Image.Image:
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    u = size / 192  # design units: everything below is authored at 192px

    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=44 * u, fill=TILE)

    # Keyboard: 4 + 4 + (narrow, space, narrow). Four columns is the most that
    # still reads as separate keys after the 192 -> 16 downscale.
    left, right = 28 * u, 164 * u
    top = 60 * u
    span = right - left
    gap = 9 * u
    kw = (span - 3 * gap) / 4
    kh = 20 * u
    rgap = 10 * u
    kr = 5 * u

    for row in (0, 1):
        y = top + row * (kh + rgap)
        for col in range(4):
            x = left + col * (kw + gap)
            d.rounded_rectangle([x, y, x + kw, y + kh], radius=kr, fill=KEYS)

    y = top + 2 * (kh + rgap)
    edge = kw * 0.72
    space = span - 2 * (edge + gap)
    d.rounded_rectangle([left, y, left + edge, y + kh], radius=kr, fill=KEYS)
    d.rounded_rectangle([left + edge + gap, y, left + edge + gap + space, y + kh], radius=kr, fill=KEYS)
    d.rounded_rectangle([right - edge, y, right, y + kh], radius=kr, fill=KEYS)

    return im


def main() -> None:
    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "app")
    master = draw(S)

    master.resize((OUT, OUT), Image.LANCZOS).save(os.path.join(root, "icon.png"), optimize=True)

    # Google recommends 48px or a multiple; browsers still ask for 16/32.
    ico = os.path.join(root, "favicon.ico")
    master.resize((48, 48), Image.LANCZOS).save(
        ico, sizes=[(16, 16), (32, 32), (48, 48)], append_images=[]
    )
    print("wrote app/icon.png and app/favicon.ico")


if __name__ == "__main__":
    main()
