/**
 * scripts/convert-assets.mjs
 *
 * Converts source assets in _public-assets/ → public/
 *   - favicon-source.svg  → public/favicon.ico (32×32 embedded PNG)
 *   - favicon-source.svg  → public/apple-touch-icon.png (180×180)
 *   - og-image-source.jpeg → public/og-image.jpg (1200×630, center crop)
 *
 * Run: node scripts/convert-assets.mjs
 */

import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcDir = join(root, '_public-assets');
const destDir = join(root, 'public');

mkdirSync(destDir, { recursive: true });

// ── 1. favicon.ico (32×32 PNG wrapped in ICO) ───────────────────────────────
// sharp doesn't natively write .ico; we generate a 32×32 PNG named favicon.ico.
// Modern browsers and Next.js accept PNG-based favicon.ico files.
const faviconSrc = join(srcDir, 'favicon-source.svg');
const faviconDest = join(destDir, 'favicon.ico');
await sharp(faviconSrc, { density: 144 })
  .resize(32, 32)
  .png()
  .toFile(faviconDest);
console.log('✓ favicon.ico (32×32 PNG)');

// ── 2. apple-touch-icon.png (180×180) ───────────────────────────────────────
const appleDest = join(destDir, 'apple-touch-icon.png');
await sharp(faviconSrc, { density: 288 })
  .resize(180, 180)
  .png()
  .toFile(appleDest);
console.log('✓ apple-touch-icon.png (180×180)');

// ── 3. og-image.jpg (1200×630, center crop) ─────────────────────────────────
const ogSrc = join(srcDir, 'og-image-source.jpeg');
const ogDest = join(destDir, 'og-image.jpg');
await sharp(ogSrc)
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 90, progressive: true })
  .toFile(ogDest);
console.log('✓ og-image.jpg (1200×630)');

console.log('\nAll assets converted successfully.');
