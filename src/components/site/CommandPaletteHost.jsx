import { lazy, Suspense, useEffect, useState } from 'react';
import { on } from '@/lib/events';

const CommandPalette = lazy(() => import('./CommandPalette'));

/**
 * Escuta Ctrl+K / ⌘K e o evento 'palette:open' e só então baixa a paleta
 * (cmdk + diálogo), que já monta aberta. Depois disso ela cuida dos atalhos.
 */
export default function CommandPaletteHost() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return undefined;
    const load = () => setLoaded(true);
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        load();
      }
    };
    window.addEventListener('keydown', onKey);
    const off = on('palette:open', load);
    return () => {
      window.removeEventListener('keydown', onKey);
      off();
    };
  }, [loaded]);

  if (!loaded) return null;
  return (
    <Suspense fallback={null}>
      <CommandPalette defaultOpen />
    </Suspense>
  );
}
