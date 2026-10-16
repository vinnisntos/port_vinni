import { useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Painel de vidro do site. Com `spotlight`, a borda acende sob o cursor:
 * a posição vai direto para variáveis CSS no elemento (sem estado React,
 * então nada re-renderiza enquanto o mouse se move).
 */
export default function GlassCard({
  children,
  className = '',
  spotlight = false,
  as: Tag = 'div',
  ...props
}) {
  const ref = useRef(null);

  const handlePointerMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={spotlight ? handlePointerMove : undefined}
      className={cn(
        'glass rounded-[var(--radius-panel)] p-6 md:p-8',
        spotlight && 'spotlight',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
