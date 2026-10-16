const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%&*+<>/{}';

/**
 * Embaralha o texto de um elemento e o resolve da esquerda para a direita.
 * Escreve direto no DOM (sem estado React). Devolve uma função que cancela
 * e restaura o texto final.
 */
export function scramble(el, text, { duration = 900, delay = 0 } = {}) {
  let frame = 0;
  let start = 0;
  const chars = [...text];

  const tick = (now) => {
    if (!start) start = now + delay;
    const progress = Math.min(1, Math.max(0, (now - start) / duration));
    const locked = Math.floor(progress * chars.length);
    el.textContent = chars
      .map((char, i) => (char === ' ' || i < locked ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
      .join('');
    if (progress < 1) frame = requestAnimationFrame(tick);
    else el.textContent = text;
  };

  frame = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(frame);
    el.textContent = text;
  };
}
