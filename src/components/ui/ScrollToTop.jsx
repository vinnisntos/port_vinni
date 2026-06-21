import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Garante que cada troca de rota leve o usuário ao topo da página.
 * Padrão essencial em SPAs — sem isso, ao navegar entre ferramentas,
 * o scroll fica congelado no ponto anterior, prejudicando a UX.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}