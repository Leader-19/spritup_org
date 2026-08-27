import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

const icons = [
  { svg: 'icon-192.svg', png: 'icon-192.png', size: 192 },
  { svg: 'icon-512.svg', png: 'icon-512.png', size: 512 },
  { svg: 'icon-maskable-512.svg', png: 'icon-maskable-512.png', size: 512 },
];

async function generatePngIcons() {
  console.log('Generating PNG icons from SVGs...\n');

  for (const icon of icons) {
    const svgPath = join(publicDir, icon.svg);
    const pngPath = join(publicDir, icon.png);

    try {
      await sharp(svgPath)
        .resize(icon.size, icon.size)
        .png({
          quality: 100,
          compressionLevel: 9,
        })
        .toFile(pngPath);

      console.log(`✅ Created ${icon.png} (${icon.size}x${icon.size})`);
    } catch (error) {
      console.error(`❌ Failed to create ${icon.png}:`, error.message);
    }
  }

  console.log('\nDone!');
}

generatePngIcons();
