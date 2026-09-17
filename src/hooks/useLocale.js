import { useLocation } from 'react-router-dom';

// Rotas que possuem versão traduzida, espelhada em /en/...
// Páginas fora deste mapa (Ferramentas e suas subpáginas) só existem em PT.
const LOCALIZED_ROUTES = {
  '/': { pt: '/', en: '/en' },
  '/about': { pt: '/about', en: '/en/about' },
};

export function useLocale() {
  const { pathname } = useLocation();
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'pt';
}

// Dado o pathname atual, devolve o caminho equivalente no idioma alvo.
// Páginas sem versão traduzida caem na home do idioma alvo.
export function getLocalizedPath(pathname, targetLocale) {
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  const canonical = isEn ? (pathname === '/en' ? '/' : pathname.slice(3)) : pathname;
  const mapped = LOCALIZED_ROUTES[canonical];
  if (mapped) return mapped[targetLocale];
  return targetLocale === 'en' ? '/en' : '/';
}
