import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%&*+<>/';

/**
 * Texto que se "decodifica" ao carregar: cada letra passa por caracteres
 * aleatórios e trava no valor final, da esquerda para a direita.
 * Escreve direto no DOM (sem estado React). O texto real fica numa cópia
 * sr-only, então leitores de tela e buscadores nunca veem o embaralhado.
 */
export default function ScrambleText({ text, className, duration = 1100, startDelay = 150 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reduce) {
      el.textContent = text;
      return undefined;
    }

    let frame = 0;
    let start = 0;
    const chars = [...text];

    const tick = (now) => {
      if (!start) start = now + startDelay;
      const progress = Math.min(1, Math.max(0, (now - start) / duration));
      const locked = Math.floor(progress * chars.length);

      el.textContent = chars
        .map((char, i) => {
          if (char === ' ' || i < locked) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      if (progress < 1) frame = requestAnimationFrame(tick);
      else el.textContent = text;
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, reduce, duration, startDelay]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
