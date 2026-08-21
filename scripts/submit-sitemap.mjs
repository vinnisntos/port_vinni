#!/usr/bin/env node
// Envia (resubmete) o sitemap ao Google Search Console via Search Console API,
// autenticando com uma service account (JWT Bearer flow, sem dependências externas).
//
// Uso:
//   GSC_KEY_FILE=/caminho/para/service-account.json node scripts/submit-sitemap.mjs
//
// Variáveis de ambiente:
//   GSC_KEY_FILE  (obrigatória) caminho do JSON da service account
//   GSC_SITE_URL  (opcional) padrão: https://vinnisantos.com.br/
//   GSC_SITEMAP_URL (opcional) padrão: https://vinnisantos.com.br/sitemap.xml

import { readFileSync } from 'node:fs';
import { createSign } from 'node:crypto';

const SITE_URL = process.env.GSC_SITE_URL || 'https://vinnisantos.com.br/';
const SITEMAP_URL = process.env.GSC_SITEMAP_URL || 'https://vinnisantos.com.br/sitemap.xml';
const KEY_FILE = process.env.GSC_KEY_FILE;

if (!KEY_FILE) {
  console.error('Defina GSC_KEY_FILE apontando para o JSON da service account.');
  process.exit(1);
}

const { client_email, private_key } = JSON.parse(readFileSync(KEY_FILE, 'utf8'));

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(
    JSON.stringify({
      iss: client_email,
      scope: 'https://www.googleapis.com/auth/webmasters',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })
  );
  const signature = createSign('RSA-SHA256')
    .update(`${header}.${claims}`)
    .sign(private_key, 'base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  const jwt = `${header}.${claims}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Falha ao obter access token: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function submitSitemap(accessToken) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    SITE_URL
  )}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Falha ao submeter sitemap (${res.status}): ${text}`);
  }
}

try {
  const accessToken = await getAccessToken();
  await submitSitemap(accessToken);
  console.log(`Sitemap resubmetido: ${SITEMAP_URL}`);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
