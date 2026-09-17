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
  FaMicrosoft,
} from 'react-icons/fa';
import {
  SiPostgresql,
  SiTypescript,
  SiDotnet,
  SiFlask,
  SiDjango,
  SiSupabase,
  SiGooglecloud,
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';

export const aboutPt = {
  pageHeader: {
    tag: '[ sobre // estudante-dev ]',
    title: 'SOBRE',
    accent: 'MIM',
  },

  seo: {
    title: 'Vinnicius Santos · Sobre — Full Stack Developer',
    description:
      'Conheça a trajetória de Vinnicius Santos: estagiário de TI em HelpDesk/DevOps, estudante de ADS e desenvolvedor full stack com projetos em produção.',
  },

  profile: {
    roleTag: 'Estagiário TI (HelpDesk/DevOps) · Backend Jr.',
    bio: 'Estudante de Análise e Desenvolvimento de Sistemas com base sólida em lógica de programação, arquitetura de sistemas e foco em backend. Experiência prática com C#, Python e bancos SQL, somada à vivência em ambientes industriais e comerciais que trouxe forte visão de processos de negócio, logística e resolução de problemas.',
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
    skills: 'Competências Técnicas',
    experience: 'Experiência Profissional',
    education: 'Formação Acadêmica',
    courses: 'Cursos e Certificações',
    languages: 'Idiomas',
    stack: 'Como Construí Este Portfólio',
  },

  skillGroups: [
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
        { name: 'Google Cloud (Console/CLI)', icon: SiGooglecloud },
      ],
    },
    {
      title: 'Interfaces',
      items: [{ name: 'UX/UI · Interfaces Responsivas', icon: FaPalette }],
    },
    {
      title: 'IA & Engenharia de Prompt',
      items: [
        { name: 'ChatGPT, Claude AI/Claude Code, Gemini', icon: FaRobot },
      ],
    },
  ],

  experience: [
    {
      company: 'Going2',
      role: 'Estagiário de TI — HelpDesk / DevOps',
      period: '07/2026 — Atual',
      bullets: [
        'Gestão de TI e governança, responsável pelo desenvolvimento ponta a ponta de um Portal interno (Next.js, Supabase, AWS EC2) para controle de acessos e auditoria do catálogo de sistemas.',
        'Automação e inovação tecnológica, participando ativamente da criação e implementação de projetos internos utilizando Inteligência Artificial para otimização de processos.',
        'Responsável pelas rotinas de DevOps, atuando no gerenciamento de infraestrutura em nuvem, configuração de servidores (Nginx/PM2) e manutenção de ambientes para garantir a alta disponibilidade das aplicações.',
        'Suporte técnico de HelpDesk, realizando atendimento contínuo, resolução ágil de incidentes e manutenção preventiva e corretiva da infraestrutura tecnológica corporativa.',
      ],
    },
    {
      company: 'PendurAi',
      role: 'Desenvolvedor Full Stack — ERP e PDV (SaaS) para Adegas e Mercados',
      period: 'Em Produção',
      bullets: [
        'SaaS multi-tenant de PDV e ERP em produção na AWS EC2 (pendurai.vinnisantos.com.br), com isolamento de dados por loja (tenant_id), painel de SuperAdmin e licenciamento com bloqueio automático de acesso suspenso, cancelado ou expirado.',
        'PDV completo com venda por código de barras ou nome, atalhos de teclado, comandas por mesa e transação atômica (estoque + venda + ledger em uma única operação).',
        'Caixa cego com contagem sem saldo visível e ledger imutável de sangria/suprimento, estoque com fator de conversão e Kardex de auditoria, e carteira de fiado com limite de crédito por cliente.',
        'Integração de pagamentos recorrentes via API do Asaas, integração com o Zé Delivery via webhook (fila durável, assinatura HMAC e rate limiting) e impressão térmica de recibos via ESC/POS.',
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
      company: 'MarcAi',
      role: 'Desenvolvedor Full Stack — Plataforma de Agendamento (SaaS)',
      period: 'Em Desenvolvimento',
      bullets: [
        'Construção de aplicação multi-tenant voltada para salões de estética, com foco em segurança e autenticação de dois fatores (TOTP 2FA).',
        'Garantia de qualidade de código através de testes unitários (xUnit) e conteinerização do ambiente com Docker.',
        'Stack: C# (ASP.NET Core), Supabase, xUnit e Docker.',
      ],
    },
    {
      company: 'Life OS',
      role: 'Desenvolvedor Full Stack — Dashboard de Gestão Pessoal',
      period: 'Em Produção',
      bullets: [
        'Aplicação fullstack para gerenciamento pessoal e produtividade, disponível em agenda.vinnisantos.com.br.',
        'Stack: Next.js 15, Tailwind CSS e Supabase Auth, orquestrado com Docker na AWS EC2.',
      ],
    },
    {
      company: 'Projetos Independentes',
      role: 'Desenvolvedor de Software — github.com/vinnisntos',
      period: 'Em Desenvolvimento',
      bullets: [
        'SaaS_PDV: sistema de PDV e gestão financeira com arquitetura multi-tenant em C# .NET 10, Entity Framework Core e SQLite, com isolamento de dados por empresa e filial.',
        'wpp-agendamento: SaaS multi-tenant de agendamento via WhatsApp (Baileys), com cobrança via PIX (Mercado Pago), persistência em Supabase/PostgreSQL e fluxo conversacional por máquina de estados.',
        'botmocidade: bot de automação de respostas no WhatsApp (whatsapp-web.js) com comandos customizáveis e sessão persistente via QR Code — projeto open-source educacional.',
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
  ],

  education: {
    degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    school: 'Universidade Paulista (UNIP)',
    note: 'Previsão de conclusão: fev/2027 — cursando o 4º semestre (último) (período noturno)',
  },

  courses: [
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
  ],

  languages: [
    {
      name: 'Inglês',
      level: 'Intermediário',
      text: 'Excelente compreensão de leitura técnica, documentações de APIs, código e termos de tecnologia. Boa capacidade de comunicação e escrita.',
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
