import { useEffect } from 'react';

const SITE_URL = 'https://vinnisantos.com.br';

function setMeta(attr, key, content) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

function setJsonLd(id, data) {
  let tag = document.getElementById(id);
  if (!data) {
    tag?.remove();
    return;
  }
  if (!tag) {
    tag = document.createElement('script');
    tag.id = id;
    tag.type = 'application/ld+json';
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
}

/**
 * Aplica title, meta tags e JSON-LD específicos da rota atual.
 * `path` deve ser o caminho absoluto (ex.: "/tools/cpf") usado no canonical e og:url.
 */
export default function Seo({ title, description, path, structuredData, noindex = false }) {
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', `${SITE_URL}${path}`);
    setMeta('name', 'twitter:card', 'summary');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'robots', noindex ? 'noindex,follow' : 'index,follow');
    setCanonical(`${SITE_URL}${path}`);
    setJsonLd('page-jsonld', structuredData ?? null);
  }, [title, description, path, structuredData, noindex]);

  return null;
}
