import {
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaTerminal,
  FaPython,
  FaDatabase,
  FaJs,
  FaPalette,
  FaRobot,
  FaServer,
  FaReact,
  FaNodeJs,
  FaAws,
  FaVial,
  FaShieldAlt,
} from 'react-icons/fa';
import {
  SiPostgresql,
  SiTypescript,
  SiDotnet,
  SiSupabase,
  SiGooglecloud,
  SiNextdotjs,
  SiTailwindcss,
  SiNginx,
  SiGithubactions,
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';

const courses = [
  {
    name: 'Introduction to Computer Science with Python (CS50P)',
    org: 'Harvard University / EdX',
    year: '2024',
  },
  {
    name: 'Introduction to Databases with SQL (CS50SQL)',
    org: 'Harvard University / EdX',
    year: '2026',
  },
  { name: 'Java Fundamentos (60h)', org: 'FIAP', year: '2026' },
  { name: 'Metrologia', org: 'SENAI', year: '2024' },
  {
    name: 'C# Completo: Programação Orientada a Objetos + Projetos (38h)',
    org: 'Udemy · Nelio Alves',
    year: '2026',
  },
  { name: 'Engenharia de Software (100h)', org: 'FIAP', year: '2026' },
  {
    name: 'Palestra Strategic Sourcing (2h)',
    org: 'JUNIP — Consultoria UNIP Júnior de Sorocaba',
    year: '2026',
  },
  {
    name: 'Palestra Liderança',
    org: 'JUNIP — Consultoria UNIP Júnior de Sorocaba',
    year: '2026',
  },
  {
    name: 'Palestra Desenvolvimento de Pessoas (2h)',
    org: 'JUNIP — Consultoria UNIP Júnior de Sorocaba',
    year: '2026',
  },
  {
    name: 'Palestra Ideias de Negócio: JUNIP (2h)',
    org: 'JUNIP — Consultoria UNIP Júnior de Sorocaba',
    year: '2026',
  },
  { name: 'Semana Tecnológica UNIP', org: 'UNIP / Even3', year: '2025' },
  {
    name: 'Santander Fala Mundo 2026 — 3ª Edição (vaga concedida)',
    org: 'Santander Open Academy',
    year: '2026',
  },
];

export const aboutPt = {
  pageHeader: {
    tag: '[ sobre // estudante-dev ]',
    title: 'SOBRE',
    accent: 'MIM',
  },

  seo: {
    title: 'Sobre Vinnicius Santos · Desenvolvedor Full Stack e Arquitetura de Soluções',
    description: `Trajetória de Vinnicius Santos (Vinnicius Gabriel Matos dos Santos): desenvolvedor full stack com foco em arquitetura de soluções, cofundador do PendurAi e estagiário de TI na Going2. ${courses.length} cursos e certificações, entre eles Harvard CS50 (Python e SQL), FIAP e SENAI.`,
  },

  profile: {
    roleTag: 'Full Stack · Arquitetura de Soluções (.NET / Next.js)',
    bio: 'Estudante de Análise e Desenvolvimento de Sistemas e estagiário de TI na Going2, onde, além do suporte, desenvolvo uma plataforma B2B interna. Construo SaaS multi-tenant com C#/.NET, Next.js e PostgreSQL, com projetos próprios em produção, entre eles o PendurAi, do qual sou cofundador. A vivência anterior em indústria, vendas e logística me deu visão de processo e de quem usa o sistema.',
    location: 'Sorocaba — SP',
    phones: [
      { display: '(15) 92002-2260', href: 'tel:+5515920022260' },
      { display: '(15) 98163-6193', href: 'tel:+5515981636193' },
    ],
  },

  resumeCta: {
    primaryLabel: 'Baixar Currículo',
    primaryFile: 'curriculo-vinnicius-santos.docx',
    primaryDownloadName: 'Vinnicius_Gabriel_Matos_dos_Santos_Curriculo.docx',
    secondaryLabel: 'Download Resume (EN)',
    secondaryFile: 'curriculo-vinnicius-santos-en.docx',
    secondaryDownloadName: 'Vinnicius_Gabriel_Matos_dos_Santos_Resume_EN.docx',
  },

  social: { github: 'GitHub', linkedin: 'LinkedIn' },

  sectionHeadings: {
    history: 'Minha História',
    workProfile: 'Como Trabalho',
    growth: 'Em evolução',
    skills: 'Competências Técnicas',
    experience: 'Experiência Profissional',
    education: 'Formação Acadêmica',
    courses: 'Cursos e Certificações',
    languages: 'Idiomas',
    stack: 'Como Construí Este Portfólio',
  },

  workProfile: {
    strengths: [
      {
        title: 'Entendo o problema antes de construir',
        text: 'Procuro quem vai usar o sistema e levanto requisitos com gestor e engenheiros, para não entregar uma solução genérica.',
      },
      {
        title: 'Entrego cedo e ajusto com feedback',
        text: 'Mostro o que construí em demonstrações para o time e trato cada apontamento de usabilidade ou regra como a próxima tarefa.',
      },
      {
        title: 'Digo o que ainda não sei',
        text: 'Quando o tema é novo, aviso, estudo e pergunto. Foi assim que, em menos de dois meses de estágio, passei do suporte para o desenvolvimento de uma plataforma interna.',
      },
      {
        title: 'Desenvolvimento assistido por IA, com direção própria',
        text: 'Uso Claude Code e Codex no dia a dia: planejo em fases, defino papéis e regras de negócio e valido o resultado contra o que foi pedido.',
      },
    ],
    growth: [
      'Testes automatizados como hábito: já presentes no MarcAi e no Life OS, ainda pendentes no PendurAi.',
      'Padrões de usabilidade em telas de gestão, como filtros, paginação e formulários mais enxutos.',
      'Estimativa de custo e dimensionamento de infraestrutura antes de recomendar um serviço.',
      'Rotina de equipe: branches, revisão de código e bibliotecas de componentes compartilhadas.',
      'Conversação em inglês.',
    ],
  },

  skillGroups: [
    {
      title: 'Linguagens de Programação',
      items: [
        { name: 'C# (.NET)', icon: TbBrandCSharp },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'JavaScript', icon: FaJs },
        { name: 'Python', icon: FaPython },
        { name: 'SQL', icon: FaDatabase },
      ],
    },
    {
      title: 'Frameworks & Desenvolvimento Web',
      items: [
        { name: 'ASP.NET Core (Razor Pages)', icon: SiDotnet },
        { name: 'Next.js (App Router)', icon: SiNextdotjs },
        { name: 'React', icon: FaReact },
        { name: 'Node.js', icon: FaNodeJs },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
      ],
    },
    {
      title: 'Banco de Dados',
      items: [
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'Supabase (Auth · RLS)', icon: SiSupabase },
        { name: 'SQL Server', icon: FaServer },
        { name: 'EF Core · Dapper · Drizzle', icon: FaDatabase },
      ],
    },
    {
      title: 'Infraestrutura & DevOps',
      items: [
        { name: 'Docker', icon: FaDocker },
        { name: 'AWS EC2', icon: FaAws },
        { name: 'Nginx', icon: SiNginx },
        { name: 'GitHub Actions (CI/CD)', icon: SiGithubactions },
        { name: 'Google Workspace · GCP', icon: SiGooglecloud },
        { name: 'Git', icon: FaGitAlt },
        { name: 'GitHub', icon: FaGithub },
        { name: 'CLI', icon: FaTerminal },
      ],
    },
    {
      title: 'Arquitetura, Segurança & Qualidade',
      items: [
        { name: 'Multi-tenancy · RBAC', icon: FaShieldAlt },
        { name: 'Autenticação · 2FA (TOTP)', icon: FaShieldAlt },
        { name: 'xUnit · Vitest', icon: FaVial },
      ],
    },
    {
      title: 'Interfaces',
      items: [{ name: 'UX/UI · Interfaces Responsivas', icon: FaPalette }],
    },
    {
      title: 'IA & Engenharia de Prompt',
      items: [
        { name: 'Claude Code, Codex, Gemini, ChatGPT', icon: FaRobot },
      ],
    },
  ],

  experience: [
    {
      company: 'Going2',
      role: 'Estagiário de TI — Suporte, Governança e Desenvolvimento',
      period: '08/2026 — Atual',
      bullets: [
        'Desenvolvimento da plataforma B2B com que a empresa entrega automação e IA aos clientes: assumi um projeto já iniciado e entreguei a visão do cliente, o hub de automações, o módulo de capacitação, o FAQ com assistente e os painéis de gestão e auditoria, além de reformular a interface.',
        'Stack da plataforma: monorepo Next.js 16, React 19 e TypeScript sobre PostgreSQL com Row Level Security por organização, Drizzle ORM, fila de jobs no próprio Postgres e CI no GitHub Actions; cuidei também do deploy em Docker/Dokploy.',
        'Levantamento de requisitos direto com o gestor e os engenheiros de soluções e demonstrações para o time de engenharia, com ciclos curtos de ajuste a partir do feedback (usabilidade, permissões e integrações).',
        'Desenvolvimento ponta a ponta do Portal de Governança de TI (Next.js 14, TypeScript e PostgreSQL): RBAC com quatro papéis, solicitação e aprovação de acessos, inventário de hardware com check-in mensal, telefonia, base de conhecimento e trilha de auditoria por triggers. Gravei também o treinamento em vídeo para os usuários.',
        'Administração de TI: contas e acessos no Google Workspace (onboarding e offboarding com backup), dispositivos corporativos, cofre de senhas e manutenção de ambientes com Docker, Nginx e PM2 em AWS EC2.',
        'Atendimento (SAC) de uma campanha promocional de alcance nacional: suporte a participantes por e-mail e WhatsApp, validação de notas fiscais e cadastro de ganhadores, seguindo o fluxo com o jurídico e os cuidados de LGPD.',
      ],
    },
    {
      company: 'PendurAi',
      role: 'Cofundador · Arquitetura e Desenvolvimento Full Stack — ERP e PDV (SaaS) para Adegas e Mercados',
      period: 'Em Produção (beta)',
      bullets: [
        'SaaS multi-tenant de PDV e ERP em produção na AWS EC2 (pendurai.vinnisantos.com.br), com isolamento de dados por loja (tenant_id), painel de SuperAdmin e licenciamento com bloqueio automático de acesso suspenso, cancelado ou expirado.',
        'PDV completo com venda por código de barras ou nome, atalhos de teclado, comandas por mesa e transação atômica (estoque + venda + ledger em uma única operação).',
        'Caixa cego com contagem sem saldo visível e ledger imutável de sangria/suprimento, estoque com fator de conversão e Kardex de auditoria, e carteira de fiado com limite de crédito por cliente.',
        'Integração de pagamentos recorrentes via API do Asaas, e-mail transacional via Resend, integração com o Zé Delivery via webhook (fila durável, assinatura HMAC e rate limiting) e impressão térmica de recibos via ESC/POS.',
        'Dashboard administrativo com métricas de negócio (CMV, lucro bruto, ROI) e relatórios exportáveis em Excel, PDF, XML e CSV, construído em ASP.NET Core (Razor Pages) com arquitetura em camadas e acesso transacional via Dapper/Npgsql.',
      ],
    },
    {
      company: 'Mocidade 015',
      role: 'Desenvolvedor Full Stack — Sistema de Passagens e Reservas',
      period: 'Em Produção',
      bullets: [
        'Sistema 100% em produção com dados reais em mocidade015.vinnisantos.com.br, usado ativamente na venda e reserva de passagens de ônibus para viagens em grupo, com seleção de assentos, lista de espera e gestão de acompanhantes.',
        'Desenvolvido em ASP.NET Core (Razor Pages) com C# .NET 10, Entity Framework Core e PostgreSQL, incluindo cadastro em lote de passageiros com dados completos (CPF, RG, contatos de emergência, congregação).',
        'Consistência e segurança: reservas em transação Serializable, que impede dois participantes no mesmo assento, validação de CPF e telefone com dígito verificador e senhas com BCrypt.',
        'Pipeline de CI/CD com GitHub Actions, publicando a aplicação e fazendo deploy automático via rsync em servidor AWS, com reinício do serviço systemd.',
      ],
    },
    {
      company: 'MarcAi',
      role: 'Desenvolvedor Full Stack — Plataforma de Agendamento (SaaS)',
      period: 'Em Desenvolvimento',
      bullets: [
        'Plataforma multi-tenant de agendamento para salões de estética: cada salão em seu subdomínio, com isolamento por tenant conferido a cada requisição e onboarding self-service.',
        'Agenda com preço e duração por profissional, conflito de horário bloqueado no próprio banco (constraint EXCLUDE no PostgreSQL) e regra de cancelamento reforçada por trigger.',
        'Superadmin com 2FA via TOTP (RFC 6238) implementado do zero e validado contra os vetores oficiais; 57 testes xUnit rodando em CI no GitHub Actions.',
        'E-mail transacional via Resend, assinatura via Asaas (implementada, ainda em validação) e deploy em Docker Compose com Caddy e TLS wildcard. Stack: ASP.NET Core (Razor Pages) e Supabase/PostgreSQL.',
      ],
    },
    {
      company: 'Life OS',
      role: 'Desenvolvedor Full Stack — Dashboard de Gestão Pessoal',
      period: 'Em Produção',
      bullets: [
        'Aplicação fullstack de rotina e produtividade, em uso diário como ferramenta pessoal em lifeos.vinnisantos.com.br, com módulos de treinos, alimentação e Kanban de estudos e trabalhos.',
        'Stack: Next.js 16 (App Router), Supabase (Postgres, Auth e RLS), Drizzle ORM, Tailwind CSS v4 e shadcn/ui, com imagem Docker gerada no GitHub Actions e servida atrás de nginx na AWS EC2.',
        'Decisões de arquitetura registradas em ADRs e regras de negócio cobertas por testes unitários (Vitest).',
      ],
    },
    {
      company: 'Projetos Independentes',
      role: 'Desenvolvedor de Software — github.com/vinnisntos',
      period: 'Em Desenvolvimento',
      bullets: [
        'Agenda Osvair (agenda.osvairsantos.com.br): agendamento online para transporte executivo, com fluxo de solicitação, orçamento e aprovação do cliente; front estático com Supabase (Auth, RLS e funções RPC), servido por nginx em AWS EC2.',
        'Lopes Vision (demonstrativo.vinnisantos.com.br): site demonstrativo de agendamento para uma ótica, em Next.js, em que o cliente escolhe serviço, dia e horário sem criar conta e recebe a confirmação na tela.',
        'BDC — Batalha das Capivaras: piloto com landing pública, ranking e sorteio de chaves ao vivo para uma batalha de rima independente, em Next.js 14, Supabase e Vercel.',
        'wpp-agendamento: SaaS multi-tenant de agendamento via WhatsApp (Baileys), com cobrança via PIX (Mercado Pago), persistência em Supabase/PostgreSQL e fluxo conversacional por máquina de estados.',
        'SaaS_PDV: sistema desktop de PDV e gestão financeira multi-tenant em C# .NET 10 (Windows Forms), Entity Framework Core e SQLite, com isolamento de dados por empresa e filial.',
        'botmocidade: bot de automação de respostas no WhatsApp (whatsapp-web.js) com comandos customizáveis e sessão persistente via QR Code — projeto open-source educacional.',
        'Landing pages para profissionais autônomos, como osvairsantos.com.br e o catálogo de uma designer de sobrancelhas, em HTML e Tailwind CSS.',
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
  ],

  education: {
    degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    school: 'Universidade Paulista (UNIP)',
    note: 'Previsão de conclusão: meados de 2027 (período noturno)',
  },

  courses,

  languages: [
    {
      name: 'Inglês',
      level: 'Intermediário',
      text: 'Leitura técnica segura de documentações, código e APIs, com escrita funcional. Conversação em desenvolvimento.',
    },
    {
      name: 'Latim',
      text: 'Conhecimento de termos e estruturas linguísticas fundamentais aplicadas à compreensão etimológica e lógica estrutural de idiomas derivados.',
    },
  ],

  stackDetails: [
    { name: 'Vite 8', desc: 'build ultra-rápido' },
    { name: 'React 19', desc: 'com hooks modernos' },
    { name: 'Tailwind CSS v4', desc: 'nativo no Vite' },
    { name: 'React Router v7', desc: 'para navegação' },
    { name: 'Validações brasileiras', desc: 'algoritmos oficiais' },
    { name: 'API ViaCEP', desc: 'busca de endereços' },
  ],
};
