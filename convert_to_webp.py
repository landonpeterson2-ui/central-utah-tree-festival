#!/usr/bin/env python3
"""
Convert JPEG/PNG images to WebP format
"""
import os
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("PIL/Pillow not installed. Installing...")
    import subprocess
    subprocess.check_call(['python', '-m', 'pip', 'install', 'Pillow'])
    from PIL import Image

def convert_to_webp(input_path, output_path, quality=85):
    """Convert an image to WebP format"""
    try:
        img = Image.open(input_path)
        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background

        img.save(output_path, 'WebP', quality=quality, method=6)

        # Get file sizes
        original_size = os.path.getsize(input_path) / 1024 / 1024  # MB
        webp_size = os.path.getsize(output_path) / 1024 / 1024  # MB
        savings = ((original_size - webp_size) / original_size) * 100

        print(f"✓ {os.path.basename(input_path)}: {original_size:.2f}MB → {webp_size:.2f}MB ({savings:.1f}% smaller)")
        return True
    except Exception as e:
        print(f"✗ Error converting {input_path}: {e}")
        return False

def main():
    images_dir = Path('images')
    if not images_dir.exists():
        print(f"Error: {images_dir} directory not found")
        return

    # Find all JPEG and PNG files
    image_extensions = ['*.jpg', '*.jpeg', '*.JPG', '*.JPEG', '*.png', '*.PNG']
    image_files = []
    for ext in image_extensions:
        image_files.extend(images_dir.glob(ext))

    if not image_files:
        print("No images found to convert")
        return

    print(f"Found {len(image_files)} images to convert\n")

    converted = 0
    for img_path in image_files:
        # Create output path with .webp extension
        output_path = img_path.with_suffix('.webp')

        # Skip if already converted
        if output_path.exists():
            print(f"⊘ {img_path.name}: WebP version already exists, skipping")
            continue

        if convert_to_webp(img_path, output_path):
            converted += 1

    print(f"\n✓ Converted {converted} images to WebP format")

if __name__ == '__main__':
    main()
