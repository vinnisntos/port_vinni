#!/usr/bin/env node
// Gera public/og-image.png (1200x630) a partir de um SVG desenhado à mão,
// replicando a estética dark/purple/CLI do hero da home. Rodar de novo
// sempre que o texto ou as cores de marca mudarem:
//   node scripts/generate-og-image.mjs

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'public', 'og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="purpleText" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c084fc" />
      <stop offset="100%" stop-color="#7e22ce" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9333ea" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#9333ea" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#09090B" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" />
  <circle cx="${WIDTH / 2}" cy="${HEIGHT / 2}" r="320" fill="url(#glow)" />

  <!-- CLI status tag -->
  <rect x="80" y="96" width="392" height="36" rx="2" fill="#9333ea" fill-opacity="0.05" stroke="#a855f7" stroke-opacity="0.3" />
  <text x="98" y="120" font-family="Consolas, 'Courier New', monospace" font-size="14" letter-spacing="2" fill="#c084fc">[ status: online // session: active ]</text>

  <!-- Título -->
  <text x="78" y="300" font-family="Arial, sans-serif" font-weight="900" font-size="112" letter-spacing="-2" fill="#ffffff">VINNICIUS</text>
  <text x="78" y="410" font-family="Arial, sans-serif" font-weight="900" font-size="112" letter-spacing="-2" fill="url(#purpleText)">SANTOS</text>

  <!-- Subtítulo -->
  <text x="80" y="470" font-family="Arial, sans-serif" font-size="28" font-weight="300" fill="#a1a1aa">Full Stack Developer — Hub de Utilitários para Devs</text>

  <!-- Rodapé -->
  <line x1="80" y1="540" x2="1120" y2="540" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" />
  <text x="80" y="580" font-family="Consolas, 'Courier New', monospace" font-size="18" letter-spacing="1" fill="#7c3aed">vinnisantos.com.br</text>
  <text x="1120" y="580" font-family="Consolas, 'Courier New', monospace" font-size="14" letter-spacing="1" fill="#52525b" text-anchor="end">React · .NET · PostgreSQL</text>
</svg>
`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: WIDTH },
  font: { loadSystemFonts: true },
});
const png = resvg.render().asPng();
writeFileSync(OUT_FILE, png);
console.log(`Gerado: ${OUT_FILE} (${png.length} bytes)`);
