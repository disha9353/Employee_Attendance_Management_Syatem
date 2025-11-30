// This script requires 'sharp' package to be installed
// Run: npm install sharp --save-dev (in frontend directory)

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create icon SVG content
const createIconSVG = (size) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.2}"/>
  <circle cx="${size * 0.5}" cy="${size * 0.4}" r="${size * 0.15}" fill="white" opacity="0.9"/>
  <path d="M ${size * 0.35} ${size * 0.55} L ${size * 0.5} ${size * 0.7} L ${size * 0.65} ${size * 0.55}" 
        stroke="white" stroke-width="${size * 0.03}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="${size * 0.4}" y="${size * 0.75}" width="${size * 0.2}" height="${size * 0.1}" rx="${size * 0.02}" fill="white" opacity="0.9"/>
</svg>`;
};

async function generateIcons() {
  try {
    console.log('Generating PWA icons...\n');

    // Generate 192x192 icon
    const svg192 = Buffer.from(createIconSVG(192));
    await sharp(svg192)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'icon-192.png'));
    console.log('✅ Created icon-192.png');

    // Generate 512x512 icon
    const svg512 = Buffer.from(createIconSVG(512));
    await sharp(svg512)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'icon-512.png'));
    console.log('✅ Created icon-512.png');

    console.log('\n🎉 All PWA icons generated successfully!');
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('\n❌ Error: sharp package not found!');
      console.log('\n📦 To install sharp, run:');
      console.log('   cd frontend');
      console.log('   npm install sharp --save-dev');
      console.log('\nThen run this script again.');
    } else {
      console.error('Error generating icons:', error);
    }
    process.exit(1);
  }
}

generateIcons();

