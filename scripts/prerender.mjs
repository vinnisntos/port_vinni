#!/usr/bin/env node
// Gera um HTML estático por rota a partir do dist/index.html do Vite.
//
// O site é uma SPA: sem isso, toda rota devolve o mesmo <head> (o da home) até
// o JavaScript rodar. Buscadores que não executam JS e os leitores de link de
// WhatsApp/LinkedIn veriam sempre o título da home. Aqui cada rota ganha seu
// próprio title, description, canonical, hreflang, Open Graph e um resumo em
// <noscript>. O React continua montando a aplicação normalmente no #root.
//
// Saída: dist/<rota>.html (ex.: dist/projects.html, dist/en/about.html).
// O Nginx precisa de `try_files $uri $uri.html /index.html` — ver deploy/nginx.conf.

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homeContent } from '../src/content/home.js';
import { projectsContent } from '../src/content/projects.js';
import { aboutPt } from '../src/content/about.pt.js';
import { aboutEn } from '../src/content/about.en.js';

const SITE_URL = 'https://vinnisantos.com.br';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = (text) =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const list = (items) => `<ul>\n${items.map((item) => `        <li>${item}</li>`).join('\n')}\n      </ul>`;

function navLinks(locale) {
  const en = locale === 'en';
  return list([
    `<a href="${en ? '/en/projects' : '/projects'}">${en ? 'Architecture and projects' : 'Arquitetura e projetos'}</a>`,
    `<a href="${en ? '/en/about' : '/about'}">${en ? 'About' : 'Sobre'}</a>`,
    `<a href="/tools">${en ? 'Tools' : 'Ferramentas'}</a>`,
    '<a href="https://github.com/vinnisntos">GitHub</a>',
    '<a href="https://www.linkedin.com/in/vinnisantos">LinkedIn</a>',
  ]);
}

function homeRoute(locale) {
  const t = homeContent[locale];
  return {
    path: locale === 'en' ? '/en' : '/',
    locale,
    localized: { pt: '/', en: '/en' },
    title: t.seo.title,
    description: t.seo.description,
    body: `<p>${esc(t.subtitle)}</p>`,
  };
}

function projectsRoute(locale) {
  const t = projectsContent[locale];
  const projects = t.projects
    .map(
      (project) =>
        `<h2>${esc(project.name)} — ${esc(project.kind)}</h2>\n      <p>${esc(project.context)}</p>\n      ${list(
          project.decisions.map((d) => `<strong>${esc(d.title)}.</strong> ${esc(d.text)}`)
        )}`
    )
    .join('\n      ');
  return {
    path: locale === 'en' ? '/en/projects' : '/projects',
    locale,
    localized: { pt: '/projects', en: '/en/projects' },
    title: t.seo.title,
    description: t.seo.description,
    body: `<p>${esc(t.intro)}</p>\n      ${projects}`,
  };
}

function aboutRoute(locale) {
  const t = locale === 'en' ? aboutEn : aboutPt;
  return {
    path: locale === 'en' ? '/en/about' : '/about',
    locale,
    localized: { pt: '/about', en: '/en/about' },
    title: t.seo.title,
    description: t.seo.description,
    body: `<p>${esc(t.profile.bio)}</p>\n      <h2>${esc(t.sectionHeadings.experience)}</h2>\n      ${list(
      t.experience.map((job) => `${esc(job.role)} · ${esc(job.company)} (${esc(job.period)})`)
    )}`,
  };
}

// As páginas de ferramentas declaram o SEO direto no JSX; lemos de lá para
// não manter os mesmos textos em dois lugares.
function toolRoutes() {
  const files = [
    join(root, 'src/pages/Tools.jsx'),
    ...readdirSync(join(root, 'src/pages/tools')).map((f) => join(root, 'src/pages/tools', f)),
  ];
  return files.flatMap((file) => {
    const match = readFileSync(file, 'utf8').match(
      /<Seo\s+title="([^"]+)"\s+description="([^"]+)"\s+path="([^"]+)"/
    );
    if (!match) {
      console.warn(`prerender: <Seo> não encontrado em ${file}`);
      return [];
    }
    const [, title, description, path] = match;
    return [{ path, locale: 'pt', title, description, body: '' }];
  });
}

function render(route) {
  const en = route.locale === 'en';
  const url = `${SITE_URL}${route.path}`;
  const alternates = route.localized
    ? [
        `<link rel="alternate" hreflang="pt-BR" href="${SITE_URL}${route.localized.pt}" />`,
        `<link rel="alternate" hreflang="en-US" href="${SITE_URL}${route.localized.en}" />`,
        `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${route.localized.pt}" />`,
      ].join('\n    ')
    : '';

  const noscript = `<noscript>
      <h1>${esc(route.title)}</h1>
      <p>${esc(route.description)}</p>
      ${route.body}
      ${navLinks(route.locale)}
    </noscript>`;

  const replacements = [
    [/<html lang="[^"]*">/, `<html lang="${en ? 'en-US' : 'pt-BR'}">`],
    [/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`],
    [/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(route.description)}" />`],
    [/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`],
    [/(\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>)+/, alternates ? `\n    ${alternates}` : ''],
    [/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${en ? 'en_US' : 'pt_BR'}" />`],
    [/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(route.title)}" />`],
    [/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(route.description)}" />`],
    [/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`],
    [/<noscript>[\s\S]*?<\/noscript>/, noscript],
  ];

  return replacements.reduce((html, [pattern, value]) => {
    if (!pattern.test(html)) throw new Error(`prerender: padrão não encontrado no index.html: ${pattern}`);
    return html.replace(pattern, () => value);
  }, template);
}

const routes = [
  homeRoute('pt'),
  homeRoute('en'),
  projectsRoute('pt'),
  projectsRoute('en'),
  aboutRoute('pt'),
  aboutRoute('en'),
  ...toolRoutes(),
];

for (const route of routes) {
  const file = route.path === '/' ? join(dist, 'index.html') : join(dist, `${route.path.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(route));
}

console.log(`prerender: ${routes.length} páginas geradas em dist/`);
