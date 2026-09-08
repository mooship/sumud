#!/usr/bin/env node
/**
 * Generates the PWA/manifest icon PNGs and the social share (OG) image from
 * hand-authored SVG. Run: node scripts/generate-images.mjs
 * Re-run after editing public/favicon.svg or the OG markup below.
 */
import sharp from "sharp";
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

async function generateAppIcons() {
  const svg = await readFile(path.join(publicDir, "favicon.svg"), "utf-8");
  const svgBuffer = Buffer.from(svg);

  for (const size of [180, 192, 512]) {
    const name = size === 180 ? "apple-touch-icon.png" : `icon-${size}.png`;
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: BG,
      },
    })
      .composite([
        {
          input: await sharp(svgBuffer)
            .resize(Math.round(size * 0.68), Math.round(size * 0.68))
            .toBuffer(),
          gravity: "center",
        },
      ])
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Wrote public/${name}`);
  }
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
    <path d="M16 27c-1-6.5 1.5-11.5 6-15" fill="none" stroke="${OLIVE}" stroke-width="1.8" stroke-linecap="round" />
    <ellipse cx="19.5" cy="9.5" rx="3.6" ry="2" transform="rotate(-40 19.5 9.5)" fill="${OLIVE}" />
    <ellipse cx="15.2" cy="14.6" rx="3.8" ry="2.1" transform="rotate(-35 15.2 14.6)" fill="${OLIVE_MID}" />
    <ellipse cx="12" cy="20.4" rx="3.6" ry="2" transform="rotate(-25 12 20.4)" fill="${OLIVE}" />
    <circle cx="16" cy="27.4" r="1.6" fill="${TERRACOTTA}" />
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
