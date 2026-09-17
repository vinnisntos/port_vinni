import { useEffect } from 'react';

// Atualiza title/description/lang da página e os links de hreflang (SEO
// multi-idioma), sem depender de uma lib de head management.
export function useDocumentHead({ title, description, lang, alternates }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    if (lang) document.documentElement.lang = lang;

    (alternates || []).forEach(({ hreflang, href }) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    });
  }, [title, description, lang, alternates]);
}
