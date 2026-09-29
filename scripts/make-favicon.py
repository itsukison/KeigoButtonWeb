#!/usr/bin/env python3
"""Build neutral browser icons from the existing transparent keycap artwork.
Legacy icons are intentionally not regenerated. Run with a Pillow-enabled Python.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]

def main():
    source = Image.open(ROOT / "public/mac/aside/mascot.png").convert("RGBA")
    source = source.crop(source.getbbox())
    canvas = Image.new("RGBA", (256, 256), "#F1F9FC")
    source.thumbnail((216, 216), Image.Resampling.LANCZOS)
    canvas.alpha_composite(source, ((256-source.width)//2, (256-source.height)//2))
    output = ROOT / "public/icons/aside"
    output.mkdir(parents=True, exist_ok=True)
    for name, size in [("icon.png",192),("apple-icon.png",180)]:
        canvas.resize((size,size),Image.Resampling.LANCZOS).save(output/name,optimize=True)
    canvas.save(ROOT / "public/favicon.ico",format="ICO",sizes=[(16,16),(32,32),(48,48)])
    canvas.save(output/"favicon.ico",format="ICO",sizes=[(16,16),(32,32),(48,48)])

if __name__ == "__main__":
    main()
