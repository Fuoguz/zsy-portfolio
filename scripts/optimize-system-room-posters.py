"""Convert the four Blender renders into transparent web previews."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
for chapter in ('hero', 'eagle', 'automation', 'build'):
    source = root / 'artifacts/system-room' / f'poster-{chapter}.png'
    target = root / 'public/models' / f'system-room-{chapter}.webp'
    with Image.open(source) as image:
        image.save(target, 'WEBP', quality=85, method=6)
    print(f'{target.name}: {target.stat().st_size} bytes')
