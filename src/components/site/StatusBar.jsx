import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { CheckCircle, GitBranch, Trophy } from '@phosphor-icons/react';
import { BUILD } from '@/lib/build';
import { on, emit } from '@/lib/events';
import { EGGS, foundEggs } from '@/lib/eggs';

const REPO = 'https://github.com/vinnisntos/port_vinni';

/**
 * Barra de status do rodapé, no estilo do VS Code, com dados reais: branch e
 * commit do build, "linha" atual pela rolagem e os easter eggs encontrados.
 */
export default function StatusBar({ locale }) {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [found, setFound] = useState(() => foundEggs().length);
  const total = Object.keys(EGGS).length;
  const en = locale === 'en';

  // atualiza o "Ln" direto no DOM, sem re-render a cada frame de rolagem
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (lineRef.current) lineRef.current.textContent = String(Math.max(1, Math.round(p * 1000)));
  });

  useEffect(() => on('eggs:change', (list) => setFound(list.length)), []);

  return (
    <div className="glass-inset mt-10 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 rounded-full px-4 py-2 font-mono text-xs text-muted-foreground">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        <a href={`${REPO}/commit/${BUILD.sha}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground">
          <GitBranch className="size-3.5 text-primary" weight="bold" aria-hidden="true" />
          {BUILD.branch}
          <span className="text-[var(--syntax-comment)]">@{BUILD.sha}</span>
        </a>
        <span className="flex items-center gap-1.5">
          <CheckCircle className="size-3.5 text-primary" weight="fill" aria-hidden="true" />
          {en ? 'build passing' : 'build ok'}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        <span>
          Ln <span ref={lineRef}>1</span>, Col 1
        </span>
        <span className="hidden sm:inline">UTF-8</span>
        <button
          type="button"
          onClick={() => emit('palette:open')}
          className="flex items-center gap-1.5 hover:text-foreground"
          aria-label={en ? `${found} of ${total} easter eggs found. Open the command palette` : `${found} de ${total} easter eggs encontrados. Abrir a paleta de comandos`}
        >
          <Trophy className="size-3.5 text-primary" weight="duotone" aria-hidden="true" />
          {found}/{total} easter eggs
        </button>
      </div>
    </div>
  );
}
