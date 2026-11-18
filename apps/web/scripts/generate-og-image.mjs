#!/usr/bin/env node
/**
 * One-off generator for the social share image at public/og-image.jpg.
 *
 * Usage (from repo root):
 *   NODE_PATH=/path/to/node_modules node apps/web/scripts/generate-og-image.mjs
 *
 * Requires `sharp` on NODE_PATH or as a local install. Sharp is intentionally
 * not added as an app runtime dependency — regenerate only when the portrait
 * or brand copy changes.
 */
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { writeFileSync, statSync } from "node:fs";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");
const portraitPath = join(webRoot, "public", "jan-1-8.jpg");
const outPath = join(webRoot, "public", "og-image.jpg");

const WIDTH = 1200;
const HEIGHT = 630;
const PHOTO_WIDTH = 520;
const textPanelWidth = WIDTH - PHOTO_WIDTH;

// Site light theme (variant-3) tokens from global.css
const PAGE = "#f6f1e7";
const INK = "#282d35";
const MUTED = "#6d716f";
const ACCENT = "#365f8c";
const LINE = "rgba(58, 66, 80, 0.18)";
const ACCENT_2 = "#d8c7a0";

const backgroundSvg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0" stroke="${LINE}" stroke-width="1"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${PAGE}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${PAGE}" stop-opacity="0.55"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="${PAGE}"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect x="0" y="0" width="${textPanelWidth}" height="${HEIGHT}" fill="${PAGE}" opacity="0.72"/>
  <rect x="${textPanelWidth - 72}" y="0" width="72" height="${HEIGHT}" fill="url(#fade)"/>
  <rect x="0" y="0" width="10" height="${HEIGHT}" fill="${ACCENT}"/>
  <rect x="${textPanelWidth - 1}" y="0" width="2" height="${HEIGHT}" fill="${ACCENT_2}" opacity="0.85"/>
</svg>`);

const textSvg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${textPanelWidth}" height="${HEIGHT}" viewBox="0 0 ${textPanelWidth} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .mono {
      font-family: Inter, "DejaVu Sans", "Noto Sans", sans-serif;
      font-weight: 800;
      font-size: 18px;
      letter-spacing: 0.14em;
      fill: ${MUTED};
    }
    .name {
      font-family: Inter, "DejaVu Sans", "Noto Sans", sans-serif;
      font-weight: 800;
      font-size: 64px;
      letter-spacing: -0.05em;
      fill: ${INK};
    }
    .role {
      font-family: Inter, "DejaVu Sans", "Noto Sans", sans-serif;
      font-weight: 700;
      font-size: 28px;
      letter-spacing: -0.02em;
      fill: ${ACCENT};
    }
    .site {
      font-family: Inter, "DejaVu Sans", "Noto Sans", sans-serif;
      font-weight: 600;
      font-size: 24px;
      fill: ${MUTED};
    }
    .badge {
      font-family: Inter, "DejaVu Sans", "Noto Sans", sans-serif;
      font-weight: 800;
      font-size: 22px;
      letter-spacing: -0.08em;
      fill: ${PAGE};
    }
  </style>
  <circle cx="88" cy="168" r="30" fill="${INK}"/>
  <text x="88" y="176" text-anchor="middle" class="badge">JH</text>
  <text x="56" y="250" class="mono">PORTFOLIO</text>
  <text x="56" y="330" class="name">Jan Härkönen</text>
  <text x="56" y="390" class="role">Senior Full Stack Developer · Helsinki</text>
  <text x="56" y="450" class="site">janharkonen.fi</text>
  <rect x="56" y="478" width="72" height="6" rx="1" fill="${ACCENT_2}"/>
</svg>`);

const edgeFade = await sharp({
  create: {
    width: 48,
    height: HEIGHT,
    channels: 4,
    background: { r: 246, g: 241, b: 231, alpha: 0 },
  },
})
  .composite([
    {
      input: Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="48" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${PAGE}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${PAGE}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="48" height="${HEIGHT}" fill="url(#g)"/>
</svg>`),
    },
  ])
  .png()
  .toBuffer();

const portrait = await sharp(portraitPath)
  .resize(PHOTO_WIDTH, HEIGHT, {
    fit: "cover",
    // Match site hero focus (object-[center_28%]): keep face in frame.
    position: "north",
  })
  .toBuffer();

const output = await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 3,
    background: PAGE,
  },
})
  .composite([
    { input: backgroundSvg, top: 0, left: 0 },
    { input: portrait, top: 0, left: textPanelWidth },
    { input: textSvg, top: 0, left: 0 },
    { input: edgeFade, top: 0, left: textPanelWidth - 24 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toBuffer();

writeFileSync(outPath, output);

const meta = await sharp(output).metadata();
console.log(
  JSON.stringify(
    {
      path: outPath,
      bytes: statSync(outPath).size,
      width: meta.width,
      height: meta.height,
      format: meta.format,
    },
    null,
    2,
  ),
);
