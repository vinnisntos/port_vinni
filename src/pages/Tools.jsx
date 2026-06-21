import { Link } from 'react-router-dom';
import {
  FaBolt,
  FaUserSecret,
  FaShieldAlt,
  FaTerminal,
  FaCode,
  FaDatabase,
  FaArrowRight,
} from 'react-icons/fa';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import PageHeader from '../components/ui/PageHeader';

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

export default function Tools() {
  return (
    <div className="pt-24 pb-12">
      <PageHeader
        tag="[ ferramentas // utilitários ]"
        title="FERRAMENTAS"
        accent="DEV"
        description="Utilitários e validadores para desenvolvedores. Todas as ferramentas são executadas no navegador, sem envio de dados para servidores externos."
      />

      {/* Tools Grid */}
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
                <FaArrowRight
                  className="text-gray-600 group-hover:text-purple-400 transition-colors"
                  aria-hidden="true"
                />
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

      {/* CTA */}
      <div className="mt-16 text-center">
        <Card className="inline-block">
          <p className="text-muted mb-4">Precisa de mais alguma ferramenta específica?</p>
          <a
            href="https://github.com/vinnisntos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">Solicitar no GitHub</Button>
          </a>
        </Card>
      </div>
    </div>
  );
}