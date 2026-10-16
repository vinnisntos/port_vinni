import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { Trophy } from '@phosphor-icons/react';
import { emit, on } from '@/lib/events';
import { announceCertificate, EGGS, foundEggs, unlock } from '@/lib/eggs';
import { useLocale } from '../../hooks/useLocale';

const MatrixRain = lazy(() => import('./MatrixRain'));

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Recado para quem abre o DevTools. Roda uma vez por carregamento.
let greeted = false;
function greetDevelopers() {
  if (greeted) return;
  greeted = true;
  const big = 'font: 700 28px/1.2 "Geist Variable", system-ui; color: #4ea8ff;';
  const body = 'font: 14px/1.6 "Geist Mono Variable", monospace; color: #93a3bc;';
  console.log('%c< vinnicius santos />', big);
  console.log(
    '%cOlá, dev curioso(a). O código está em github.com/vinnisntos/port_vinni\n' +
      'Há 6 easter eggs no site. Comece digitando `help` no terminal da home ou aperte Ctrl+K.\n' +
      'Hello, curious dev. There are 6 easter eggs here. Start with `help` in the home terminal.',
    body
  );
}

/**
 * Easter eggs globais: código Konami (modo debug), chuva de código, toasts
 * de conquista e o recado no console. Montado uma vez no App.
 */
export default function EasterEggs() {
  const locale = useLocale();
  const reduce = useReducedMotion();
  const [matrix, setMatrix] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(greetDevelopers, []);

  // Konami: ↑ ↑ ↓ ↓ ← → ← → B A
  useEffect(() => {
    let progress = 0;
    const onKey = (event) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        emit('debug:toggle', { fromKonami: true });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const offDebug = on('debug:toggle', () => {
      const active = document.documentElement.classList.toggle('debug');
      // na primeira vez, o toast é o da conquista; depois, só o estado
      if (active && unlock('konami', locale)) return;
      emit('toast', {
        title: active ? 'debug: on' : 'debug: off',
        text: active
          ? locale === 'en' ? 'Every box on the page is now outlined.' : 'Todas as caixas da página estão contornadas.'
          : locale === 'en' ? 'Back to normal.' : 'De volta ao normal.',
      });
    });
    const offMatrix = on('matrix:start', () => {
      unlock('matrix', locale);
      if (!reduce) setMatrix(true);
    });
    const offToast = on('toast', (detail) => setToast({ ...detail, id: Date.now() }));
    return () => {
      offDebug();
      offMatrix();
      offToast();
    };
  }, [locale, reduce]);

  // quem zerou os eggs antes do certificado existir também ganha o aviso
  useEffect(() => {
    if (foundEggs().length < Object.keys(EGGS).length) return undefined;
    const timer = setTimeout(() => announceCertificate(locale), 1500);
    return () => clearTimeout(timer);
  }, [locale]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), toast.duration ?? 4200);
    return () => clearTimeout(timer);
  }, [toast]);

  const stopMatrix = useCallback(() => setMatrix(false), []);

  return (
    <>
      {matrix && (
        <Suspense fallback={null}>
          <MatrixRain onDone={stopMatrix} />
        </Suspense>
      )}
      <div aria-live="polite" className="pointer-events-none fixed right-4 bottom-4 z-[80] w-[min(22rem,calc(100%-2rem))]">
        <AnimatePresence>
          {toast && (
            <m.div
              key={toast.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="glass-strong pointer-events-auto flex items-start gap-3 rounded-2xl p-4"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Trophy className="size-5" weight="duotone" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-sm font-medium text-primary">{toast.title}</p>
                <p className="mt-0.5 text-sm text-foreground/85">{toast.text}</p>
                {toast.action && (
                  <button
                    type="button"
                    onClick={() => {
                      toast.action.run();
                      setToast(null);
                    }}
                    className="mt-2 rounded-md bg-primary px-3 py-1 font-mono text-xs font-medium text-primary-foreground hover:bg-primary-hover"
                  >
                    {toast.action.label}
                  </button>
                )}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
