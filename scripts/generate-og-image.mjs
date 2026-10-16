#!/usr/bin/env node
// Gera public/og-image.png (1200x630) a partir de um SVG desenhado à mão,
// replicando a estética do hero da home (azul-marinho, acento azul elétrico,
// prompt de shell e o arquivo "sobre" ao lado). Rodar de novo sempre que o
// texto ou as cores de marca mudarem:
//   node scripts/generate-og-image.mjs

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'public', 'og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;
const MONO = "Consolas, 'Cascadia Code', 'Courier New', monospace";
const SANS = "'Segoe UI', Arial, sans-serif";

// Linhas do "sobre.ts" no painel da direita: [texto, cor]
const CODE = [
  [['// quem escreveu este site', '#7486a3']],
  [['const ', '#4ea8ff'], ['vinnicius', '#c9e4ff'], [' = {', '#7d8ca6']],
  [['  foco: ', '#7d8ca6'], ['"arquitetura"', '#8be3ff'], [',', '#7d8ca6']],
  [['  stack: [', '#7d8ca6'], ['".NET"', '#8be3ff'], [', ', '#7d8ca6'], ['"Next.js"', '#8be3ff'], ['],', '#7d8ca6']],
  [['  db: ', '#7d8ca6'], ['"PostgreSQL"', '#8be3ff'], [',', '#7d8ca6']],
  [['  emProducao: ', '#7d8ca6'], ['3', '#ffbf75'], [',', '#7d8ca6']],
  [['  disponivel: ', '#7d8ca6'], ['true', '#4ea8ff']],
  [['};', '#7d8ca6']],
];

const codeLines = CODE.map((parts, i) => {
  const spans = parts.map(([text, color]) => `<tspan fill="${color}">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</tspan>`).join('');
  return `<text x="742" y="${236 + i * 34}" font-family="${MONO}" font-size="19" xml:space="preserve">${spans}</text>
  <text x="716" y="${236 + i * 34}" font-family="${MONO}" font-size="16" fill="#3f4d66" text-anchor="end">${i + 1}</text>`;
}).join('\n  ');

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glowA" cx="15%" cy="0%" r="70%">
      <stop offset="0%" stop-color="#1d4ed8" stop-opacity="0.75" />
      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowB" cx="100%" cy="70%" r="60%">
      <stop offset="0%" stop-color="#0891b2" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#0891b2" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#04070f" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowA)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowB)" />

  <!-- Prompt -->
  <text x="80" y="150" font-family="${MONO}" font-size="24" xml:space="preserve"><tspan fill="#8be3ff">~/vinnicius</tspan><tspan fill="#4ea8ff"> $ </tspan><tspan fill="#93a3bc">whoami</tspan></text>

  <!-- Nome -->
  <text x="74" y="272" font-family="${SANS}" font-weight="800" font-size="104" letter-spacing="-4" fill="#e4ecf7">Vinnicius</text>
  <text x="74" y="372" font-family="${SANS}" font-weight="800" font-size="104" letter-spacing="-4" fill="#e4ecf7">Santos</text>
  <rect x="408" y="296" width="10" height="74" fill="#4ea8ff" />

  <!-- Subtítulo -->
  <text x="80" y="440" font-family="${SANS}" font-size="27" fill="#c3cfe0">Full stack · arquitetura de soluções</text>
  <text x="80" y="478" font-family="${SANS}" font-size="27" fill="#93a3bc">SaaS multi-tenant: .NET, Next.js, Postgres</text>

  <!-- Painel do editor -->
  <rect x="680" y="150" width="440" height="356" rx="22" fill="#0a1120" fill-opacity="0.78" stroke="#ffffff" stroke-opacity="0.1" />
  <text x="712" y="190" font-family="${MONO}" font-size="16" fill="#e4ecf7">sobre.ts</text>
  <rect x="704" y="200" width="88" height="3" rx="1.5" fill="#4ea8ff" />
  ${codeLines}

  <!-- Rodapé -->
  <text x="80" y="566" font-family="${MONO}" font-size="22" fill="#4ea8ff">vinnisantos.com.br</text>
  <text x="1120" y="566" font-family="${MONO}" font-size="18" fill="#7486a3" text-anchor="end">Ctrl+K · terminal · easter eggs</text>
</svg>
`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: WIDTH },
  font: { loadSystemFonts: true },
});
const png = resvg.render().asPng();
writeFileSync(OUT_FILE, png);
console.log(`Gerado: ${OUT_FILE} (${png.length} bytes)`);
