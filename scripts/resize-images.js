const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SIZES = [400, 800, 1200];
const INPUT_DIR = path.join(__dirname, '../images');
const OUTPUT_DIR = path.join(__dirname, '../images');

async function resizeImages() {
    // Find all tree-*.webp files
    const files = fs.readdirSync(INPUT_DIR).filter(f =>
        f.match(/^tree-\d+\.webp$/)
    );

    console.log(`Found ${files.length} tree images to process\n`);

    for (const file of files) {
        const inputPath = path.join(INPUT_DIR, file);
        const baseName = path.basename(file, '.webp');

        console.log(`Processing ${file}...`);

        for (const width of SIZES) {
            const outputFile = `${baseName}-${width}w.webp`;
            const outputPath = path.join(OUTPUT_DIR, outputFile);

            // Skip if already exists
            if (fs.existsSync(outputPath)) {
                console.log(`  ✓ ${outputFile} (exists)`);
                continue;
            }

            try {
                await sharp(inputPath)
                    .resize(width, null, {
                        withoutEnlargement: true,
                        fit: 'inside'
                    })
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                const stats = fs.statSync(outputPath);
                const sizeKB = Math.round(stats.size / 1024);
                console.log(`  ✓ ${outputFile} (${sizeKB} KB)`);
            } catch (err) {
                console.error(`  ✗ ${outputFile}: ${err.message}`);
            }
        }
        console.log('');
    }

    console.log('Done! Now update index.html with srcset attributes.');
}

resizeImages().catch(console.error);
