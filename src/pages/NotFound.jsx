import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <div className="pt-24 pb-12 max-w-2xl mx-auto text-center">
      <Seo
        title="Página não encontrada · Vinnicius Santos"
        description="A página que você procura não existe ou foi movida."
        path="/404"
        noindex
      />
      <span className="inline-block px-3 py-1 mb-4 border border-purple-500/30 bg-purple-500/5 text-purple-400 font-mono text-[10px] tracking-widest uppercase">
        [ error // 404 ]
      </span>
      <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
        PÁGINA <span className="text-purple-500">NÃO ENCONTRADA</span>
      </h1>
      <p className="text-muted mb-8">
        A rota solicitada não existe ou foi movida.
      </p>
      <Card className="inline-block">
        <Link to="/">
          <Button variant="primary">Voltar ao início</Button>
        </Link>
      </Card>
    </div>
  );
}