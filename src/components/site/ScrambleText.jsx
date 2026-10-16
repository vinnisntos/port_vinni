import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { scramble } from '@/lib/scramble';

/**
 * Texto que se "decodifica": cada letra passa por caracteres de código e
 * trava no valor final, da esquerda para a direita.
 *   trigger="mount"  roda ao carregar (nome do hero, 404)
 *   trigger="hover"  roda quando o ponteiro entra no link/botão que o contém
 * O texto real fica numa cópia sr-only, então leitores de tela e buscadores
 * nunca veem o embaralhado.
 */
export default function ScrambleText({ text, className, duration = 1100, startDelay = 150, trigger = 'mount' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return undefined;

    if (trigger === 'mount') return scramble(el, text, { duration, delay: startDelay });

    const host = el.closest('a, button') ?? el;
    let cancel = null;
    const start = () => {
      cancel?.();
      cancel = scramble(el, text, { duration: Math.min(duration, 450) });
    };
    host.addEventListener('pointerenter', start);
    host.addEventListener('focus', start);
    return () => {
      host.removeEventListener('pointerenter', start);
      host.removeEventListener('focus', start);
      cancel?.();
    };
  }, [text, reduce, duration, startDelay, trigger]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
