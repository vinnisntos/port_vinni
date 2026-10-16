import { m, useReducedMotion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Entrada ao rolar: sobe 24px com opacidade, uma vez, quando a peça entra
 * na tela. `delay` em passos de ~70ms dá a ordem título → texto → imagem.
 * Com movimento reduzido, o conteúdo aparece direto, sem deslocamento.
 */
export default function Reveal({ children, delay = 0, y = 24, as = 'div', className, ...props }) {
  const reduce = useReducedMotion();
  const Comp = m[as] ?? m.div;

  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}
