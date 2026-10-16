import Reveal from './Reveal';

/**
 * Cabeçalho das páginas internas: título grande em duas vozes (a segunda
 * parte em tom secundário, mesma fonte) e uma descrição curta embaixo.
 */
export default function PageHeader({ title, accent, description }) {
  return (
    <header className="mb-12 md:mb-16">
      <Reveal>
        <h1 className="max-w-4xl text-5xl leading-[0.95] font-bold tracking-[-0.04em] text-foreground md:text-7xl">
          {title}
          {accent && <span className="text-muted-foreground"> {accent}</span>}
        </h1>
      </Reveal>
      {description && (
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
        </Reveal>
      )}
    </header>
  );
}
