import { useEffect, useRef } from 'react';

// Glifos de código em vez de katakana: a "matriz" aqui é feita de sintaxe.
const GLYPHS = '01{}[]<>=/;:$#&|!?*+-_()'.split('');

/**
 * Chuva de código em tela cheia, em azul, por ~6s. Canvas fixo por cima de
 * tudo, sem eventos de ponteiro; chama onDone ao terminar o fade.
 */
export default function MatrixRain({ onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 16;
    let w = 0;
    let h = 0;
    let drops = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from({ length: Math.ceil(w / size) }, () => Math.random() * -40);
    };
    resize();
    window.addEventListener('resize', resize);

    const started = performance.now();
    const DURATION = 6000;
    let frame;
    let last = 0;

    const draw = (now) => {
      frame = requestAnimationFrame(draw);
      if (now - last < 40) return; // ~25 fps basta para o efeito
      last = now;
      const elapsed = now - started;
      canvas.style.opacity = elapsed > DURATION - 900 ? String(Math.max(0, (DURATION - elapsed) / 900)) : '1';

      // apaga o quadro anterior aos poucos (rastro) sem escurecer a página por trás
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      ctx.font = `${size - 2}px "Geist Mono Variable", monospace`;
      drops.forEach((y, i) => {
        const char = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        ctx.fillStyle = Math.random() > 0.96 ? '#e4ecf7' : '#4ea8ff';
        ctx.fillText(char, i * size, y * size);
        drops[i] = y * size > h && Math.random() > 0.975 ? 0 : y + 1;
      });

      if (elapsed > DURATION) {
        cancelAnimationFrame(frame);
        onDone?.();
      }
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [onDone]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]" />;
}
