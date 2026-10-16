import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Garante que cada troca de rota leve o usuário ao topo da página.
 * Padrão essencial em SPAs: sem isso, ao navegar entre ferramentas,
 * o scroll fica congelado no ponto anterior, prejudicando a UX.
 * Se a URL tiver âncora (/projects#pendurai), rola até o elemento. Como as
 * páginas internas são carregadas sob demanda, espera o elemento aparecer
 * no DOM (até 3s) antes de desistir.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return undefined;
    }

    const id = decodeURIComponent(hash.slice(1));
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
      return Boolean(target);
    };

    if (scrollToTarget()) return undefined;

    window.scrollTo({ top: 0, behavior: 'instant' });
    const observer = new MutationObserver(() => {
      if (scrollToTarget()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = setTimeout(() => observer.disconnect(), 3000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [pathname, hash]);

  return null;
}
