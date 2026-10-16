import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import GlassCard from '../components/site/GlassCard';
import ScrambleText from '../components/site/ScrambleText';
import Seo from '../components/Seo';
import { useLocale } from '../hooks/useLocale';

const COPY = {
  pt: {
    title: 'Página não encontrada',
    text: 'A rota solicitada não existe ou foi movida.',
    cta: 'Voltar ao início',
    seoTitle: 'Página não encontrada · Vinnicius Santos',
    seoDescription: 'A página que você procura não existe ou foi movida.',
  },
  en: {
    title: 'Page not found',
    text: "The requested route doesn't exist or has been moved.",
    cta: 'Back to Home',
    seoTitle: 'Page not found · Vinnicius Santos',
    seoDescription: "The page you're looking for doesn't exist or has been moved.",
  },
};

export default function NotFound() {
  const locale = useLocale();
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
        <p aria-hidden="true" className="text-[clamp(6rem,20vw,12rem)] leading-none font-bold tracking-[-0.06em] text-primary">
          <ScrambleText text="404" duration={700} />
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">{t.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t.text}</p>
        <Button asChild size="lg" className="mt-10">
          <Link to={homeHref}>
            <ArrowLeft weight="bold" aria-hidden="true" />
            {t.cta}
          </Link>
        </Button>
      </GlassCard>
    </div>
  );
}
