import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, MagnifyingGlass } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { emit } from '@/lib/events';
import GlassCard from '../components/site/GlassCard';
import ScrambleText from '../components/site/ScrambleText';
import Seo from '../components/Seo';
import { useLocale } from '../hooks/useLocale';

const COPY = {
  pt: {
    title: 'Página não encontrada',
    text: 'A rota solicitada não existe ou foi movida.',
    cta: 'Voltar ao início',
    search: 'Buscar no site',
    error: 'RouteNotFoundError: nenhuma rota corresponde a',
    you: 'você (navegador)',
    seoTitle: 'Página não encontrada · Vinnicius Santos',
    seoDescription: 'A página que você procura não existe ou foi movida.',
  },
  en: {
    title: 'Page not found',
    text: "The requested route doesn't exist or has been moved.",
    cta: 'Back to Home',
    search: 'Search the site',
    error: 'RouteNotFoundError: no route matches',
    you: 'you (browser)',
    seoTitle: 'Page not found · Vinnicius Santos',
    seoDescription: "The page you're looking for doesn't exist or has been moved.",
  },
};

export default function NotFound() {
  const locale = useLocale();
  const { pathname } = useLocation();
  const t = COPY[locale];
  const homeHref = locale === 'en' ? '/en' : '/';

  return (
    <div className="flex min-h-[80dvh] items-center pt-32 pb-12">
      <Seo
        title={t.seoTitle}
        description={t.seoDescription}
        path={locale === 'en' ? '/en/404' : '/404'}
        lang={locale === 'en' ? 'en-US' : 'pt-BR'}
        noindex
      />
      <GlassCard className="w-full max-w-3xl p-8 md:p-14">
        <p aria-hidden="true" className="font-mono text-[clamp(6rem,20vw,12rem)] leading-none font-bold tracking-[-0.06em] text-primary">
          <ScrambleText text="404" duration={700} />
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">{t.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t.text}</p>

        {/* O "stack trace" da rota que não existe */}
        <pre className="glass-inset mt-8 overflow-x-auto rounded-xl p-5 font-mono text-sm leading-relaxed">
          <span className="text-destructive">
            {t.error} <span className="text-[var(--syntax-string)]">&quot;{pathname}&quot;</span>
          </span>
          {'\n'}
          <span className="text-[var(--syntax-comment)]">{'    at '}</span>
          <span className="text-[var(--syntax-fn)]">Router.resolve</span>
          <span className="text-[var(--syntax-comment)]"> (App.jsx:404:1)</span>
          {'\n'}
          <span className="text-[var(--syntax-comment)]">{'    at '}</span>
          <span className="text-[var(--syntax-fn)]">Portfolio.render</span>
          <span className="text-[var(--syntax-comment)]"> (vinnisantos.com.br)</span>
          {'\n'}
          <span className="text-[var(--syntax-comment)]">{'    at '}</span>
          <span className="text-[var(--syntax-fn)]">{t.you}</span>
        </pre>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to={homeHref}>
              <ArrowLeft weight="bold" aria-hidden="true" />
              {t.cta}
            </Link>
          </Button>
          <Button size="lg" variant="secondary" onClick={() => emit('palette:open')}>
            <MagnifyingGlass weight="bold" aria-hidden="true" />
            {t.search}
            <kbd className="rounded-full bg-white/8 px-2 py-0.5 font-mono text-xs">Ctrl K</kbd>
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
