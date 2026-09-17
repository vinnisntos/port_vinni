import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useLocale } from '../hooks/useLocale';

const COPY = {
  pt: {
    tag: '[ error // 404 ]',
    titleMain: 'PÁGINA',
    titleAccent: 'NÃO ENCONTRADA',
    text: 'A rota solicitada não existe ou foi movida.',
    cta: 'Voltar ao início',
  },
  en: {
    tag: '[ error // 404 ]',
    titleMain: 'PAGE',
    titleAccent: 'NOT FOUND',
    text: "The requested route doesn't exist or has been moved.",
    cta: 'Back to Home',
  },
};

export default function NotFound() {
  const locale = useLocale();
  const t = COPY[locale];
  const homeHref = locale === 'en' ? '/en' : '/';

  return (
    <div className="pt-24 pb-12 max-w-2xl mx-auto text-center">
      <span className="inline-block px-3 py-1 mb-4 border border-purple-500/30 bg-purple-500/5 text-purple-400 font-mono text-[10px] tracking-widest uppercase">
        {t.tag}
      </span>
      <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
        {t.titleMain} <span className="text-purple-500">{t.titleAccent}</span>
      </h1>
      <p className="text-muted mb-8">{t.text}</p>
      <Card className="inline-block">
        <Link to={homeHref}>
          <Button variant="primary">{t.cta}</Button>
        </Link>
      </Card>
    </div>
  );
}
