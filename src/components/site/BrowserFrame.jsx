import { useRef } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, LockSimple } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

/**
 * Janela de vidro com a captura real de um sistema no ar. A barra mostra o
 * endereço verdadeiro (e leva até ele). No desktop, a janela inclina de leve
 * seguindo o cursor; os valores vivem em motion values, fora do React.
 */
export default function BrowserFrame({ src, alt, url, priority = false, tilt = false, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 120, damping: 20, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), spring);
  const active = tilt && !reduce;

  const handleMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const host = url ? new URL(url).host : null;

  return (
    <div className={cn('[perspective:1400px]', className)}>
      <m.div
        ref={ref}
        onPointerMove={active ? handleMove : undefined}
        onPointerLeave={active ? reset : undefined}
        style={active ? { rotateX, rotateY } : undefined}
        className="glass overflow-hidden rounded-[var(--radius-panel)] p-1.5 will-change-transform"
      >
        {host && (
          <div className="flex items-center gap-3 px-3 pt-1.5 pb-2.5">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-inset flex min-w-0 flex-1 items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <LockSimple className="size-3.5 shrink-0 text-primary" weight="bold" aria-hidden="true" />
              <span className="truncate">{host}</span>
              <ArrowUpRight
                className="ml-auto size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                weight="bold"
                aria-hidden="true"
              />
            </a>
          </div>
        )}
        <img
          src={src}
          alt={alt}
          width={1440}
          height={900}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="block aspect-[16/10] w-full rounded-[calc(var(--radius-panel)-6px)] object-cover object-top"
        />
      </m.div>
    </div>
  );
}
