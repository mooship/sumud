#!/usr/bin/env node
/**
 * Generates the PWA/manifest icon PNGs, favicon.ico, and the social share
 * (OG) image from hand-authored SVG. Run: node scripts/generate-images.mjs
 * Re-run after editing public/favicon.svg or the OG markup below.
 */
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const publicDir = path.join(rootDir, "public");

const BG = "#faf6ef";
const OLIVE = "#4b5d3a";
const OLIVE_MID = "#6f8a55";
const TERRACOTTA = "#a9432f";
const INK = "#241f1c";
const INK_MUTED = "#5b5348";

async function renderIcon(svgBuffer, size, { maskable = false } = {}) {
  // Maskable icons need generous padding: Android's adaptive-icon mask can
  // crop up to ~20% off each edge, so keep the mark inside a safe ~66% zone.
  const markScale = maskable ? 0.42 : 0.68;
  return sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([
      {
        input: await sharp(svgBuffer)
          .resize(Math.round(size * markScale), Math.round(size * markScale))
          .toBuffer(),
        gravity: "center",
      },
    ])
    .png()
    .toBuffer();
}

async function generateAppIcons() {
  const svg = await readFile(path.join(publicDir, "favicon.svg"), "utf-8");
  const svgBuffer = Buffer.from(svg);

  for (const size of [180, 192, 512]) {
    const name = size === 180 ? "apple-touch-icon.png" : `icon-${size}.png`;
    const buffer = await renderIcon(svgBuffer, size);
    await writeFile(path.join(publicDir, name), buffer);
    console.log(`Wrote public/${name}`);
  }

  const maskable512 = await renderIcon(svgBuffer, 512, { maskable: true });
  await writeFile(path.join(publicDir, "icon-maskable-512.png"), maskable512);
  console.log("Wrote public/icon-maskable-512.png");

  // favicon.ico: bundle a few small raster sizes for browsers/crawlers that
  // still fetch /favicon.ico by convention rather than following <link>.
  const icoSizes = [16, 32, 48];
  const icoBuffers = await Promise.all(
    icoSizes.map((size) => renderIcon(svgBuffer, size)),
  );
  const ico = await pngToIco(icoBuffers);
  await writeFile(path.join(publicDir, "favicon.ico"), ico);
  console.log("Wrote public/favicon.ico");
}

function ogSvg() {
  const width = 1200;
  const height = 630;
  const markScale = 5.5;
  const markX = 110;
  const markY = 130;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${BG}" />
  <rect x="0" y="0" width="14" height="${height}" fill="${TERRACOTTA}" />
  <g transform="translate(${markX} ${markY}) scale(${markScale})">
    <path d="M5 23c5-11 13-17 23-14" fill="none" stroke="${OLIVE}" stroke-width="1.3" stroke-linecap="round" />
    <path d="M5.8 21.4c0.4 1.5 0.5 2.9 0.4 3.9" fill="none" stroke="${OLIVE}" stroke-width="1" stroke-linecap="round" />
    <circle cx="6.3" cy="25.6" r="1.3" fill="${TERRACOTTA}" />
    <ellipse cx="5.1" cy="16.9" rx="3.2" ry="1.3" transform="rotate(-58 5.1 16.9)" fill="${OLIVE}" />
    <ellipse cx="14.2" cy="14.6" rx="3.2" ry="1.3" transform="rotate(-41 14.2 14.6)" fill="${OLIVE_MID}" />
    <ellipse cx="16.5" cy="6.7" rx="3.2" ry="1.3" transform="rotate(-21 16.5 6.7)" fill="${OLIVE}" />
    <ellipse cx="23.5" cy="11" rx="2.8" ry="1.2" transform="rotate(2 23.5 11)" fill="${OLIVE_MID}" />
  </g>
  <text x="110" y="430" font-family="DejaVu Serif, Georgia, serif" font-size="108" font-weight="700" fill="${INK}">Sumud</text>
  <text x="115" y="480" font-family="Liberation Sans, Arial, sans-serif" font-size="30" fill="${INK_MUTED}">The story of Palestine, before 1947 and after</text>
  <text x="990" y="90" font-family="DejaVu Serif, Georgia, serif" font-size="40" fill="${TERRACOTTA}" text-anchor="end">&#1589;&#1605;&#1608;&#1583;</text>
</svg>`;
}

async function generateOgImage() {
  await sharp(Buffer.from(ogSvg()))
    .png()
    .toFile(path.join(publicDir, "og-image.png"));
  console.log("Wrote public/og-image.png");
}

await generateAppIcons();
await generateOgImage();
