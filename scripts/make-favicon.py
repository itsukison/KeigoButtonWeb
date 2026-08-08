#!/usr/bin/env python3
"""Generate every browser icon from the current keycap brand artwork.

Run: python3 scripts/make-favicon.py
"""
import os

from PIL import Image


def main() -> None:
    project = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
    app = os.path.join(project, "app")
    source = os.path.join(project, "public", "brand-icon.png")
    master = Image.open(source).convert("RGBA")

    master.resize((192, 192), Image.Resampling.LANCZOS).save(
        os.path.join(app, "icon.png"), optimize=True
    )
    master.resize((180, 180), Image.Resampling.LANCZOS).save(
        os.path.join(app, "apple-icon.png"), optimize=True
    )
    master.save(
        os.path.join(app, "favicon.ico"),
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )
    print("wrote app/icon.png, app/apple-icon.png, and app/favicon.ico")


if __name__ == "__main__":
    main()
