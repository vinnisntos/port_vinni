import { Link } from 'react-router-dom';
import {
  FaCode,
  FaDatabase,
  FaTerminal,
  FaBolt,
  FaShieldAlt,
  FaUserSecret,
} from 'react-icons/fa';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Seo from '../components/Seo';
import { itemListSchema } from '../utils/seo';

const tools = [
  {
    path: '/tools/email-validator',
    title: 'Email Validator',
    description: 'Validação de e-mails com verificação de formato e domínio',
    icon: FaBolt,
    tags: ['Validação', 'Frontend'],
  },
  {
    path: '/tools/cpf',
    title: 'CPF Generator',
    description: 'Gera e valida CPFs com algoritmo oficial da Receita',
    icon: FaUserSecret,
    tags: ['Brasil', 'Validação'],
  },
  {
    path: '/tools/cnpj',
    title: 'CNPJ Generator',
    description: 'Gera e valida CNPJs com algoritmo oficial',
    icon: FaShieldAlt,
    tags: ['Brasil', 'Empresa'],
  },
  {
    path: '/tools/cep',
    title: 'CEP Finder',
    description: 'Busca endereços por CEP via ViaCEP API',
    icon: FaTerminal,
    tags: ['API', 'Brasil'],
  },
  {
    path: '/tools/phone-validator',
    title: 'Phone Validator',
    description: 'Valida telefones celulares e fixos do Brasil',
    icon: FaCode,
    tags: ['Validação', 'Mobile'],
  },
  {
    path: '/tools/fake-data',
    title: 'Fake Data Generator',
    description: 'Gera dados completos para testes: nome, email, CPF, endereço',
    icon: FaDatabase,
    tags: ['Teste', 'Generator'],
  },
];

const techStack = [
  { icon: FaCode, label: 'React 19 + TypeScript' },
  { icon: FaDatabase, label: 'C# .NET + PostgreSQL' },
  { icon: FaTerminal, label: 'Fedora Linux' },
];

export default function Home() {
  return (
    <div className="pt-24 pb-12">
      <Seo
        title="Vinnicius Santos · Full Stack Developer — Hub de Utilitários"
        description="Portfólio e hub de utilitários para desenvolvedores de Vinnicius Santos: validadores de CPF, CNPJ, e-mail, telefone, busca de CEP e gerador de dados fake."
        path="/"
        structuredData={itemListSchema({
          name: 'Ferramentas para desenvolvedores',
          items: tools.map((tool) => ({ name: tool.title, path: tool.path })),
        })}
      />
      {/* ===========================================================
          HERO
          Hierarquia:
            1. Tag CLI (status)
            2. Nome (display gigante)
            3. Subtítulo / proposta de valor
            4. CTAs principais
            5. Stack (informação de suporte)
          =========================================================== */}
      <section className="relative min-h-[80vh] flex flex-col justify-center">
        {/* Glow de fundo — atmosfera, não compete com o conteúdo */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] -z-10 rounded-full"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Lado esquerdo — identidade + CTAs */}
          <div className="lg:col-span-8">
            <span className="inline-block px-3 py-1 mb-6 border border-purple-500/30 bg-purple-500/5 text-purple-400 font-mono text-[10px] tracking-widest uppercase">
              [ status: online // session: active ]
            </span>

            <h1 className="text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase mb-6 text-white">
              VINNICIUS
              <br />
              <span className="text-gradient-purple">SANTOS</span>
            </h1>

            <p className="max-w-xl text-muted text-lg md:text-xl font-light leading-relaxed mb-8">
              Desenvolvedor Full Stack especializado em criar soluções reais.
              Este hub reúne ferramentas e utilitários para desenvolvedores.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/tools">
                <Button variant="primary" size="lg">
                  Explorar Ferramentas
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg">
                  Sobre Mim
                </Button>
              </Link>
            </div>
          </div>

          {/* Lado direito — stack como card secundário (não compete com o hero) */}
          <aside className="lg:col-span-4 pb-4" aria-label="Stack principal">
            <Card glow className="h-full">
              <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-4">
                // Stack principal
              </p>
              <ul className="space-y-4 list-none">
                {techStack.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <Icon className="text-purple-500 flex-shrink-0" aria-hidden="true" />
                    <span className="font-mono text-sm text-muted">{label}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>

        {/* Faixa inferior — info técnica discreta */}
        <div className="absolute bottom-0 left-0 right-0 hidden md:flex justify-between items-center py-8 border-t border-white/5">
          <dl className="flex gap-8">
            <div className="flex flex-col">
              <dt className="text-[10px] text-gray-600 font-mono uppercase tracking-tighter">
                Stack_Primary
              </dt>
              <dd className="text-xs text-purple-500 font-mono">React + C# .NET</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-[10px] text-gray-600 font-mono uppercase tracking-tighter">
                Database_Engine
              </dt>
              <dd className="text-xs text-purple-500 font-mono">
                PostgreSQL (Supabase)
              </dd>
            </div>
          </dl>
          <p className="text-[10px] text-gray-600 font-mono uppercase">
            Hardware: Acer_Nitro_V15 // OS: Fedora_43
          </p>
        </div>
      </section>

      {/* ===========================================================
          FERRAMENTAS
          =========================================================== */}
      <section className="mt-24">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">
            // Ferramentas Disponíveis
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-sm"
              aria-label={`Abrir ${tool.title}`}
            >
              <Card glow className="h-full">
                <div className="flex items-start justify-between mb-4">
                  <tool.icon
                    className="w-8 h-8 text-purple-500 group-hover:text-purple-400 transition-colors"
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className="text-[10px] font-mono text-gray-600 group-hover:text-purple-400 transition-colors"
                  >
                    →
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-muted mb-4">{tool.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-500/5 border border-purple-500/20 text-purple-400 text-[10px] font-mono uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}