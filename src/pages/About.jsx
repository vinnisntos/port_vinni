import {
  FaGitAlt,
  FaGithub,
  FaLinkedin,
  FaDocker,
  FaTerminal,
  FaPython,
  FaDatabase,
  FaJs,
  FaPalette,
  FaRobot,
  FaServer,
  FaMicrosoft,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaLanguage,
  FaDownload,
} from 'react-icons/fa';
import {
  SiPostgresql,
  SiTypescript,
  SiDotnet,
  SiFlask,
  SiDjango,
  SiSupabase,
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';

const RESUME_URL = `${import.meta.env.BASE_URL}curriculo-vinnicius-santos.docx`;

const skillGroups = [
  {
    title: 'Ferramentas & Controle de Versão',
    items: [
      { name: 'Git', icon: FaGitAlt },
      { name: 'GitHub', icon: FaGithub },
      { name: 'Docker', icon: FaDocker },
      { name: 'CLI', icon: FaTerminal },
    ],
  },
  {
    title: 'Linguagens de Programação',
    items: [
      { name: 'C# (.NET)', icon: TbBrandCSharp },
      { name: 'Python', icon: FaPython },
      { name: 'JavaScript', icon: FaJs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'SQL', icon: FaDatabase },
    ],
  },
  {
    title: 'Frameworks & Desenvolvimento Web',
    items: [
      { name: 'ASP.NET Core (Razor Pages)', icon: SiDotnet },
      { name: 'Flask', icon: SiFlask },
      { name: 'Django', icon: SiDjango },
    ],
  },
  {
    title: 'Banco de Dados & Cloud',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'SQL Server', icon: FaServer },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Azure', icon: FaMicrosoft },
    ],
  },
  {
    title: 'Interfaces',
    items: [{ name: 'UX/UI · Interfaces Responsivas', icon: FaPalette }],
  },
  {
    title: 'IA & Engenharia de Prompt',
    items: [
      {
        name: 'ChatGPT, Claude AI/Claude Code, Gemini',
        icon: FaRobot,
      },
    ],
  },
];

const experience = [
  {
    company: 'Going2',
    role: 'Estagiário de TI — HelpDesk / DevOps',
    period: '07/2026 — Atual',
    bullets: [
      'Estágio em modelo híbrido, com 1 dia por semana presencial na empresa e restante remoto.',
      'Controle de acesso de usuários: criação, alteração e desativação de contas (AD/Azure AD e sistemas internos), seguindo processo de onboarding e offboarding.',
      'Gestão de grupos e permissões de acesso a sistemas, pastas e aplicações, aplicando o princípio de menor privilégio.',
      'Reset de senhas, desbloqueio de contas e validação de identidade do solicitante antes de conceder ou revogar acessos.',
      'Suporte a chamados de helpdesk (acesso a VPN, e-mail corporativo e estações de trabalho) e apoio em rotinas básicas de DevOps, como monitoramento de infraestrutura e documentação de processos.',
    ],
  },
  {
    company: 'PendurAi',
    role: 'Desenvolvedor Full Stack — SaaS de Gestão para Adegas e Mercados',
    period: 'Beta — Fase de Testes',
    bullets: [
      'SaaS multi-tenant de PDV e ERP, com isolamento de dados por loja (tenant_id), painel de SuperAdmin e licenciamento com bloqueio automático de acesso suspenso, cancelado ou expirado.',
      'PDV completo com venda por código de barras ou nome, atalhos de teclado, comandas por mesa e transação atômica (estoque + venda + ledger em uma única operação).',
      'Caixa cego com contagem sem saldo visível e ledger imutável de sangria/suprimento, estoque com fator de conversão e Kardex de auditoria, e carteira de fiado com limite de crédito por cliente.',
      'Integração com o Zé Delivery via webhook (fila durável, assinatura HMAC e rate limiting) e impressão térmica de recibos via ESC/POS.',
      'Dashboard administrativo com métricas de negócio (CMV, lucro bruto, ROI), construído em ASP.NET Core (Razor Pages) com arquitetura em camadas e acesso transacional via Dapper/Npgsql.',
    ],
  },
  {
    company: 'Mocidade 015',
    role: 'Desenvolvedor Full Stack — Sistema de Passagens e Reservas',
    period: 'Em Produção',
    bullets: [
      'Sistema 100% em produção com dados reais em mocidade015.vinnisantos.com.br, usado ativamente na venda e reserva de passagens de ônibus para viagens em grupo, com seleção de assentos, lista de espera e gestão de acompanhantes.',
      'Desenvolvido em ASP.NET Core (Razor Pages) com C# .NET 10 e Entity Framework Core, incluindo cadastro em lote de passageiros com dados completos (CPF, RG, contatos de emergência, congregação).',
      'Camada de segurança própria: validação de CPF e telefone com dígito verificador, rate limiting contra força bruta e políticas de senha forte.',
      'Pipeline de CI/CD com GitHub Actions, publicando a aplicação e realizando deploy automático via SSH/SCP em servidor AWS com reinício do serviço.',
    ],
  },
  {
    company: 'Projetos Independentes',
    role: 'Desenvolvedor de Software — github.com/vinnisntos',
    period: 'Em Desenvolvimento',
    bullets: [
      'SaaS_PDV: sistema de PDV e gestão financeira com arquitetura multi-tenant em C# .NET 10, Entity Framework Core e SQLite, com isolamento de dados por empresa e filial.',
      'botmocidade e wpp-agendamento: bots de automação de atendimento e agendamento via WhatsApp em Node.js (whatsapp-web.js), com persistência de sessão e conexão via QR Code.',
      'Desenvolvimento de catálogos digitais e sistemas de cadastro sob demanda para pequenos negócios e clientes autônomos.',
    ],
  },
  {
    company: 'D.S.S. Distribuidora',
    role: 'Auxiliar de Vendas Externas Júnior',
    period: '11/2024 — 03/2026',
    bullets: [
      'Atuação direta no modelo de negócios B2B, com atendimento consultivo, cobrança e negociação com clientes corporativos.',
      'Responsável pela inteligência de roteirização e logística bruta, otimizando o fluxo de entregas e distribuição de mercadorias.',
      'Controle e manuseio de valores financeiros, com auditoria diária de fluxos de caixa operacionais.',
      'Manutenção corretiva e preventiva de equipamentos refrigerados de alta rotatividade.',
    ],
  },
  {
    company: 'MDA Do Brasil — Indústria e Comércio',
    role: 'Alimentador de Linha de Produção',
    period: '01/2024 — 03/2024',
    bullets: [
      'Inspeção visual e controle de qualidade rigoroso de peças usinadas de alta precisão.',
      'Monitoramento constante de sistemas de fluidos refrigerantes e manutenção preventiva/corretiva de maquinários industriais.',
      'Gestão de resíduos e organização de zonas críticas de produção seguindo normas de segurança e eficiência.',
    ],
  },
];

const courses = [
  {
    name: 'Introduction to Computer Science with Python (CS50P)',
    org: 'Harvard University / EdX',
    year: '2024',
  },
  {
    name: 'Introduction to Databases with SQL (CS50SQL)',
    org: 'Harvard University / EdX',
    year: 'Em andamento',
  },
  { name: 'Java Fundamentos', org: 'FIAP', year: '2026' },
  { name: 'Metrologia', org: 'SENAI', year: '2024' },
  {
    name: 'Programação Orientada a Objetos (POO) com C#',
    org: 'Udemy',
    year: 'Em andamento',
  },
];

const stackDetails = [
  { name: 'Vite 8', desc: 'build ultra-rápido' },
  { name: 'React 19', desc: 'com hooks modernos' },
  { name: 'Tailwind CSS v4', desc: 'nativo no Vite' },
  { name: 'React Router v7', desc: 'para navegação' },
  { name: 'Validações brasileiras', desc: 'algoritmos oficiais' },
  { name: 'API ViaCEP', desc: 'busca de endereços' },
];

export default function About() {
  return (
    <div className="pt-24 pb-12">
      <PageHeader tag="[ sobre // estudante-dev ]" title="SOBRE" accent="MIM" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card de perfil — sticky em telas grandes */}
        <aside className="lg:col-span-1" aria-label="Resumo do perfil">
          <Card glow className="sticky top-28">
            <div className="flex flex-col items-center text-center">
              <div
                aria-hidden="true"
                className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(139,92,246,0.3)]"
              >
                <span className="text-4xl font-black text-white">VS</span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">
                Vinnicius Santos
              </h2>
              <p className="text-gray-500 text-xs mb-3">
                Vinnicius Gabriel Matos dos Santos
              </p>
              <p className="text-purple-400 font-mono text-sm mb-4">
                Estagiário TI (HelpDesk/DevOps) · Backend Jr.
              </p>

              <p className="text-muted text-sm leading-relaxed mb-6">
                Estudante de Análise e Desenvolvimento de Sistemas com base
                sólida em lógica de programação, arquitetura de sistemas e
                foco em backend. Experiência prática com C#, Python e bancos
                SQL, somada à vivência em ambientes industriais e comerciais
                que trouxe forte visão de processos de negócio, logística e
                resolução de problemas.
              </p>

              <dl className="w-full space-y-2 mb-6 text-left">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <FaMapMarkerAlt
                    className="text-purple-500 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <dd>Sorocaba — SP</dd>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <FaPhoneAlt
                    className="text-purple-500 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <dd>
                    <a
                      href="tel:+5515920022260"
                      className="hover:text-purple-400 transition-colors"
                    >
                      (15) 92002-2260
                    </a>{' '}
                    ·{' '}
                    <a
                      href="tel:+5515981636193"
                      className="hover:text-purple-400 transition-colors"
                    >
                      (15) 98163-6193
                    </a>
                  </dd>
                </div>
              </dl>

              <Button
                as="a"
                href={RESUME_URL}
                download="Vinnicius_Gabriel_Matos_dos_Santos_Curriculo.docx"
                variant="primary"
                size="md"
                className="w-full mb-3"
              >
                <FaDownload aria-hidden="true" /> Baixar Currículo
              </Button>

              <div className="flex gap-3">
                <a
                  href="https://github.com/vinnisntos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all text-xs font-mono uppercase inline-flex items-center gap-2"
                >
                  <FaGithub aria-hidden="true" /> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/vinnisantos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all text-xs font-mono uppercase inline-flex items-center gap-2"
                >
                  <FaLinkedin aria-hidden="true" /> LinkedIn
                </a>
              </div>
            </div>
          </Card>
        </aside>

        {/* Conteúdo */}
        <div className="lg:col-span-2 space-y-8">
          {/* Minha História */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-purple-500" aria-hidden="true">//</span>
              Minha História
            </h3>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Antes de entrar para a área de tecnologia, passei por
                ambientes industriais e comerciais bem exigentes — de linha
                de produção a vendas B2B, passando por logística, controle
                financeiro e atendimento consultivo a clientes corporativos.
                Essa vivência me deu uma visão prática de processos de
                negócio e resolução de problemas que levo comigo para o
                desenvolvimento de software.
              </p>
              <p>
                Hoje sou estudante de{' '}
                <span className="text-purple-400">
                  Análise e Desenvolvimento de Sistemas
                </span>{' '}
                na UNIP e atuo como estagiário de TI em HelpDesk/DevOps na
                Going2, enquanto mantenho projetos próprios de
                backend/fullstack. Tenho experiência prática criando
                soluções e automações com{' '}
                <span className="text-purple-400">C#</span>,{' '}
                <span className="text-purple-400">Python</span> e bancos de
                dados SQL, além de estar me aprofundando em JavaScript/
                TypeScript e boas práticas de UX/UI.
              </p>
              <p>
                Este portfólio foi construído com{' '}
                <span className="text-purple-400">React 19</span> e{' '}
                <span className="text-purple-400">Tailwind CSS v4</span> como
                forma de colocar em prática o que venho estudando — cada
                ferramenta aqui presente foi desenvolvida para demonstrar
                habilidades reais e resolver necessidades práticas de
                desenvolvedores.
              </p>
            </div>
          </Card>

          {/* Competências Técnicas */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-purple-500" aria-hidden="true">//</span>
              Competências Técnicas
            </h3>
            <div className="space-y-6">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h4 className="text-[11px] font-mono text-gray-500 uppercase tracking-widest mb-3">
                    {group.title}
                  </h4>
                  <ul className="flex flex-wrap gap-2 list-none">
                    {group.items.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-lg text-sm text-white"
                      >
                        <skill.icon
                          className="text-purple-400 flex-shrink-0"
                          aria-hidden="true"
                        />
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* Experiência Profissional */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <FaBriefcase className="text-purple-500" aria-hidden="true" />
              Experiência Profissional
            </h3>
            <ol className="space-y-6 list-none">
              {experience.map((job) => (
                <li
                  key={job.company}
                  className="border-l-2 border-purple-500/30 pl-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <h4 className="text-white font-semibold">
                      {job.role}{' '}
                      <span className="text-purple-400 font-normal">
                        · {job.company}
                      </span>
                    </h4>
                    <span className="text-xs text-gray-500 font-mono whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5 list-none">
                    {job.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-sm text-muted leading-relaxed flex gap-2"
                      >
                        <span className="text-purple-500 flex-shrink-0" aria-hidden="true">
                          →
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Card>

          {/* Formação Acadêmica */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <FaGraduationCap className="text-purple-500" aria-hidden="true" />
              Formação Acadêmica
            </h3>
            <div>
              <h4 className="text-white font-semibold">
                Tecnólogo em Análise e Desenvolvimento de Sistemas
              </h4>
              <p className="text-purple-400 text-sm mb-1">
                Universidade Paulista (UNIP)
              </p>
              <p className="text-sm text-muted">
                Previsão de conclusão: fev/2027 — cursando o 4º semestre
                (último) (período noturno)
              </p>
            </div>
          </Card>

          {/* Cursos e Certificações */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <FaCertificate className="text-purple-500" aria-hidden="true" />
              Cursos e Certificações
            </h3>
            <ul className="space-y-3 list-none">
              {courses.map((course) => (
                <li
                  key={course.name}
                  className="flex items-start justify-between gap-4 pb-3 border-b border-white/5 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm text-white">{course.name}</p>
                    <p className="text-xs text-gray-500">{course.org}</p>
                  </div>
                  <span className="text-xs text-purple-400 font-mono whitespace-nowrap">
                    {course.year}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Idiomas */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <FaLanguage className="text-purple-500" aria-hidden="true" />
              Idiomas
            </h3>
            <ul className="space-y-3 list-none">
              <li>
                <span className="text-white font-semibold">Inglês</span>
                <span className="text-purple-400 text-xs font-mono ml-2 uppercase">
                  Intermediário
                </span>
                <p className="text-sm text-muted leading-relaxed mt-1">
                  Excelente compreensão de leitura técnica, documentações de
                  APIs, código e termos de tecnologia. Boa capacidade de
                  comunicação e escrita.
                </p>
              </li>
              <li>
                <span className="text-white font-semibold">Latim</span>
                <p className="text-sm text-muted leading-relaxed mt-1">
                  Conhecimento de termos e estruturas linguísticas
                  fundamentais aplicadas à compreensão etimológica e lógica
                  estrutural de idiomas derivados.
                </p>
              </li>
            </ul>
          </Card>

          {/* Como construí */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-purple-500" aria-hidden="true">//</span>
              Como Construí Este Portfólio
            </h3>
            <ul className="space-y-3 text-muted text-sm list-none">
              {stackDetails.map((item) => (
                <li key={item.name} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                  />
                  <span>
                    <span className="text-white font-mono">{item.name}</span>{' '}
                    {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
