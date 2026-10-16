import { Link } from 'react-router-dom';
import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GlassCard from '../components/site/GlassCard';
import PageHeader from '../components/site/PageHeader';
import Reveal from '../components/site/Reveal';
import Seo from '../components/Seo';
import { itemListSchema } from '../utils/seo';
import { toolsPt as tools } from '../content/tools';

export default function Tools() {
  return (
    <div className="pt-36 md:pt-44">
      <Seo
        title="Ferramentas para Desenvolvedores · Vinnicius Santos"
        description="Validadores e geradores gratuitos para devs: CPF, CNPJ, e-mail, telefone, busca de CEP e dados fake. Processamento 100% local, sem envio de dados."
        path="/tools"
        structuredData={itemListSchema({
          name: 'Ferramentas para desenvolvedores',
          items: tools.map((tool) => ({ name: tool.title, path: tool.path })),
        })}
      />
      <PageHeader
        title="Ferramentas"
        accent="para devs"
        description="Utilitários e validadores para desenvolvedores. Todas as ferramentas são executadas no navegador, sem envio de dados para servidores externos."
      />

      {/* Grade assimétrica: a primeira linha tem uma peça larga e uma estreita, a segunda inverte */}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {tools.map((tool, i) => {
          const wide = i % 4 === 0 || i % 4 === 3;
          return (
            <Reveal
              as="li"
              key={tool.path}
              delay={(i % 2) * 0.07}
              className={wide ? 'md:col-span-4' : 'md:col-span-2'}
            >
              <Link
                to={tool.path}
                aria-label={`Abrir ${tool.title}`}
                className="group block h-full rounded-[var(--radius-panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <GlassCard spotlight className="flex h-full min-h-56 flex-col justify-between gap-10">
                  <div className="flex items-start justify-between">
                    <span className="glass-inset flex size-14 items-center justify-center rounded-full text-primary transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                      <tool.icon className="size-7" weight="duotone" aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      className="size-5 text-muted-foreground transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                      weight="bold"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h2 className={wide ? 'text-3xl font-semibold tracking-tight' : 'text-2xl font-semibold tracking-tight'}>
                      {tool.title}
                    </h2>
                    <p className="mt-2 max-w-md text-base leading-relaxed text-foreground/75">{tool.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <li key={tag}>
                          <Badge variant="muted">{tag}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          );
        })}
      </ul>

      <Reveal>
        <div className="mt-24 flex flex-col items-start gap-6 md:mt-32 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-2xl leading-snug font-medium tracking-tight md:text-3xl">
            Precisa de mais alguma ferramenta específica?
          </p>
          <Button asChild size="lg" variant="secondary">
            <a href="https://github.com/vinnisntos" target="_blank" rel="noopener noreferrer">
              <GithubLogo weight="bold" aria-hidden="true" />
              Solicitar no GitHub
            </a>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
