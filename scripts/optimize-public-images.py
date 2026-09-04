from pathlib import Path
from PIL import Image

TARGETS = (
    "wechat-growth-01.png",
    "wechat-growth-02.png",
    "memory-museum-01.png",
    "memory-museum-02.png",
)

asset_dir = Path("public/assets")
for filename in TARGETS:
    source = asset_dir / filename
    destination = source.with_suffix(".webp")
    with Image.open(source) as image:
        image.save(destination, "WEBP", quality=88, method=6)
    print(f"{source} -> {destination} ({destination.stat().st_size} bytes)")
