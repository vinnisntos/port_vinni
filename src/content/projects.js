// Estudos de caso: cada projeto lista as decisões de arquitetura tomadas,
// o motivo e o custo assumido. O conteúdo vem dos READMEs e ADRs dos repositórios.

const GITHUB = 'https://github.com/vinnisntos';

export const projectsContent = {
  pt: {
    pageHeader: {
      tag: '[ arquitetura // decisões ]',
      title: 'ARQUITETURA &',
      accent: 'PROJETOS',
      description:
        'Como cada sistema foi desenhado: a decisão tomada, o motivo e o custo assumido.',
    },
    seo: {
      title: 'Arquitetura e Projetos · Vinnicius Santos — Decisões de arquitetura em SaaS multi-tenant',
      description:
        'Estudos de caso de Vinnicius Santos: decisões de arquitetura, segurança e deploy em SaaS multi-tenant com C#/.NET, Next.js e PostgreSQL, com os trade-offs de cada escolha.',
    },
    intro:
      'Arquitetura, para mim, é a soma das decisões que ficam caras de mudar depois. Por isso registro o que escolhi, por que escolhi e o que deixei de lado em cada projeto, incluindo a dívida técnica que assumi de propósito.',
    labels: {
      context: 'Contexto',
      decisions: 'Decisões de arquitetura',
      debt: 'Dívida assumida',
      site: 'Ver no ar',
      repo: 'Repositório',
    },
    principlesTitle: 'Como eu decido',
    principles: [
      {
        title: 'Regra crítica mora no banco',
        text: 'Conflito de horário, assento duplicado e trilha de auditoria são garantidos por constraint, trigger ou nível de isolamento, e não só pelo código da aplicação.',
      },
      {
        title: 'Isolamento por tenant é explícito',
        text: 'Toda consulta carrega o tenant, e a sessão é conferida contra o tenant da requisição. Quando o isolamento depende da aplicação, eu registro isso como dívida.',
      },
      {
        title: 'O custo entra na decisão',
        text: 'Prefiro o que cabe na operação de um time pequeno: fila no próprio banco, um servidor atrás de proxy reverso e integrações pagas adiadas até fazerem sentido.',
      },
      {
        title: 'Decisão registrada',
        text: 'ADRs e READMEs dizem o que foi escolhido e o que ficou pendente, para que a próxima pessoa entenda o motivo antes de mudar.',
      },
    ],
    projects: [
      {
        name: 'PendurAi',
        kind: 'PDV e ERP SaaS multi-tenant para adegas e mercados',
        role: 'Cofundador · arquitetura e desenvolvimento',
        status: 'Em produção (beta)',
        stack: ['C# / .NET 10', 'ASP.NET Core Razor Pages', 'PostgreSQL', 'Dapper', 'AWS EC2'],
        context:
          'Sistema de frente de caixa e retaguarda vendido para várias lojas, com cobrança recorrente por loja.',
        decisions: [
          {
            title: 'Schema único com isolamento por tenant_id',
            text: 'Todas as lojas compartilham o mesmo schema, e o tenant é aplicado em toda consulta por um provedor de tenant. Reduz custo e simplifica a operação; em troca, o isolamento depende da disciplina da aplicação.',
          },
          {
            title: 'Dapper e Npgsql no caminho transacional',
            text: 'A venda grava estoque, venda e ledger em uma única transação atômica, então escolhi controle direto de SQL e transação. O cliente REST do Supabase ficou restrito à autenticação.',
          },
          {
            title: 'Ledger imutável e caixa cego',
            text: 'Sangria e suprimento só entram como lançamentos novos, e o operador conta o caixa sem ver o saldo esperado. A quebra de caixa aparece sozinha, sem depender de confiança.',
          },
          {
            title: 'Webhooks com fila durável',
            text: 'Pedidos do Zé Delivery entram em fila e são processados por um serviço em segundo plano, com assinatura HMAC e rate limiting. Um pico ou uma falha não derruba o PDV nem perde pedido.',
          },
          {
            title: 'Licença controlada pelo pagamento',
            text: 'O webhook do Asaas atualiza o status da licença, e o login é bloqueado quando ela está suspensa, cancelada ou expirada.',
          },
        ],
        debt: 'Testes automatizados ainda pendentes. Emissão fiscal (NFC-e) e pagamento integrado no PDV foram adiados de propósito, pelo custo das APIs de terceiros.',
        links: {
          site: 'https://pendurai.vinnisantos.com.br',
          repo: `${GITHUB}/PendurAi`,
        },
      },
      {
        name: 'MarcAi',
        kind: 'Plataforma SaaS de agendamento para salões de estética',
        role: 'Arquitetura e desenvolvimento',
        status: 'Em desenvolvimento',
        stack: ['C# / .NET 10', 'ASP.NET Core Razor Pages', 'Supabase / PostgreSQL', 'xUnit', 'Docker', 'Caddy'],
        context:
          'Uma única aplicação atende vários salões, cada um com subdomínio, equipe, agenda e financeiro próprios.',
        decisions: [
          {
            title: 'Tenant resolvido pelo subdomínio',
            text: 'Um middleware resolve o salão pela URL e guarda o resultado em cache por 60 segundos. O cookie de sessão é restrito ao host e carrega o tenant, conferido contra a URL a cada requisição.',
          },
          {
            title: 'Conflito de horário bloqueado no banco',
            text: 'Uma constraint EXCLUDE no PostgreSQL impede dois agendamentos sobrepostos, e um trigger reforça a regra de cancelamento. A validação em C# existe, mas não é a última barreira.',
          },
          {
            title: '2FA via TOTP implementado do zero',
            text: 'O algoritmo da RFC 6238 foi escrito sem pacote externo e validado contra os vetores oficiais da RFC, para entender e testar o que protege o painel do superadmin.',
          },
          {
            title: 'TLS wildcard por desafio DNS-01',
            text: 'Como cada salão tem um subdomínio, o certificado precisa ser wildcard, e o desafio HTTP-01 não cobre esse caso. O Caddy emite o certificado via DNS.',
          },
        ],
        debt: 'O isolamento entre tenants é garantido na aplicação, não por RLS: o backend usa a service key, que ignora as policies. Os serviços em segundo plano assumem uma única instância, sem lock distribuído.',
        links: { repo: `${GITHUB}/AndressaLeite` },
      },
      {
        name: 'Portal de Governança de TI',
        kind: 'Sistema interno de acessos, hardware, telefonia e conhecimento',
        role: 'Desenvolvimento ponta a ponta (Going2)',
        status: 'Uso interno',
        stack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Zod', 'Tailwind CSS'],
        context:
          'Centraliza solicitações de acesso, inventário, linhas corporativas e políticas que antes ficavam em planilhas.',
        decisions: [
          {
            title: 'A aplicação é o único cliente do banco',
            text: 'A primeira versão usava Row Level Security no Supabase. Migrei para um Postgres próprio, com a autorização explícita no código em cada leitura e escrita, para não depender de plataforma de terceiros.',
          },
          {
            title: 'Defesa em profundidade com triggers',
            text: 'Campos imutáveis após a criação, bloqueio de autoescalonamento de privilégio e motivo obrigatório em toda recusa são garantidos pelo banco.',
          },
          {
            title: 'Auditoria escrita só por trigger',
            text: 'Toda escrita relevante gera log por trigger, e nenhum código de aplicação grava na trilha diretamente.',
          },
          {
            title: 'Sessão própria e revogável',
            text: 'Token opaco em cookie HttpOnly, Secure e SameSite=Strict, validado contra uma tabela de sessões. Desativar uma conta derruba o acesso na hora.',
          },
        ],
        debt: null,
        links: {},
      },
      {
        name: 'Mocidade 015',
        kind: 'Reserva de assentos em ônibus para viagens em grupo',
        role: 'Arquitetura e desenvolvimento',
        status: 'Em produção',
        stack: ['C# / .NET 10', 'ASP.NET Core Razor Pages', 'EF Core', 'PostgreSQL', 'GitHub Actions'],
        context:
          'Participantes escolhem o ônibus pelo terminal de saída e marcam o assento em um mapa, com lista de espera.',
        decisions: [
          {
            title: 'Reserva em transação Serializable',
            text: 'Reservar, cancelar e atribuir vaga rodam no nível de isolamento mais alto, o que impede dois participantes de ficarem com o mesmo assento.',
          },
          {
            title: 'Segredos fora do repositório',
            text: 'A connection string nunca fica no arquivo de configuração: vem de variável de ambiente ou de user secrets.',
          },
          {
            title: 'Deploy automático a cada push',
            text: 'O GitHub Actions publica a aplicação, envia os arquivos por rsync e reinicia o serviço systemd. Um Dockerfile cobre a execução em container.',
          },
        ],
        debt: 'O schema é mantido direto no banco, sem migrações versionadas. O serviço de rate limiting existe, mas ainda não é aplicado ao login e ao cadastro.',
        links: {
          site: 'https://mocidade015.vinnisantos.com.br',
          repo: `${GITHUB}/MocidadeApp`,
        },
      },
      {
        name: 'Life OS',
        kind: 'Painel pessoal de rotina, treinos, alimentação e estudos',
        role: 'Arquitetura e desenvolvimento',
        status: 'Em produção',
        stack: ['Next.js 16', 'TypeScript', 'Supabase (Postgres, Auth, RLS)', 'Drizzle ORM', 'Docker'],
        context:
          'Ferramenta de uso diário, com contas individuais e documentação de arquitetura versionada junto do código.',
        decisions: [
          {
            title: 'Decisões registradas em ADRs',
            text: 'Escolha de stack, modelo de autenticação e estratégia de build estão em Architecture Decision Records no repositório.',
          },
          {
            title: 'Build fora do servidor',
            text: 'A imagem Docker é gerada no GitHub Actions, e não na EC2, para não disputar memória e CPU com as aplicações em produção.',
          },
          {
            title: 'Row Level Security por usuário',
            text: 'Os dados são isolados por policies no Postgres, e o site institucional é a única parte pública.',
          },
        ],
        debt: null,
        links: {
          site: 'https://lifeos.vinnisantos.com.br',
          repo: `${GITHUB}/app-vinnicius`,
        },
      },
      {
        name: 'Agenda Osvair',
        kind: 'Agendamento online para transporte executivo',
        role: 'Arquitetura e desenvolvimento',
        status: 'Em produção',
        stack: ['HTML + JavaScript', 'Supabase (Auth, RLS, RPC)', 'Tailwind CSS', 'nginx', 'AWS EC2'],
        context:
          'O cliente solicita um horário, recebe o orçamento e aprova antes de a corrida entrar na agenda.',
        decisions: [
          {
            title: 'Sem servidor de aplicação',
            text: 'O front estático fala direto com o Supabase, protegido por RLS. O deploy é cópia de arquivos, e o custo de operação é mínimo.',
          },
          {
            title: 'Regras de negócio em funções do banco',
            text: 'Como não há backend próprio, as regras ficam em funções RPC do Postgres, e não no navegador.',
          },
          {
            title: 'WhatsApp por link universal',
            text: 'O orçamento segue por link wa.me, sem custo de API de mensageria.',
          },
        ],
        debt: null,
        links: { site: 'https://agenda.osvairsantos.com.br' },
      },
    ],
  },

  en: {
    pageHeader: {
      tag: '[ architecture // decisions ]',
      title: 'ARCHITECTURE &',
      accent: 'PROJECTS',
      description:
        'How each system was designed: the decision made, the reason, and the cost accepted.',
    },
    seo: {
      title: 'Architecture & Projects · Vinnicius Santos — Architecture decisions in multi-tenant SaaS',
      description:
        'Case studies by Vinnicius Santos: architecture, security, and deployment decisions in multi-tenant SaaS built with C#/.NET, Next.js, and PostgreSQL, with the trade-offs behind each choice.',
    },
    intro:
      'To me, architecture is the set of decisions that become expensive to change later. So for each project I record what I chose, why I chose it, and what I left out, including the technical debt I took on deliberately.',
    labels: {
      context: 'Context',
      decisions: 'Architecture decisions',
      debt: 'Accepted debt',
      site: 'See it live',
      repo: 'Repository',
    },
    principlesTitle: 'How I decide',
    principles: [
      {
        title: 'Critical rules live in the database',
        text: 'Scheduling conflicts, duplicate seats, and audit trails are enforced by constraints, triggers, or isolation levels, not only by application code.',
      },
      {
        title: 'Tenant isolation is explicit',
        text: 'Every query carries the tenant, and the session is checked against the tenant of the request. When isolation depends on the application, I record it as debt.',
      },
      {
        title: 'Cost is part of the decision',
        text: 'I prefer what a small team can operate: a queue inside the database, one server behind a reverse proxy, and paid integrations postponed until they make sense.',
      },
      {
        title: 'Decisions are written down',
        text: 'ADRs and READMEs say what was chosen and what is still pending, so the next person understands the reason before changing it.',
      },
    ],
    projects: [
      {
        name: 'PendurAi',
        kind: 'Multi-tenant POS and ERP SaaS for wine shops and small markets',
        role: 'Co-founder · architecture and development',
        status: 'In production (beta)',
        stack: ['C# / .NET 10', 'ASP.NET Core Razor Pages', 'PostgreSQL', 'Dapper', 'AWS EC2'],
        context:
          'A point-of-sale and back-office system sold to multiple stores, with recurring billing per store.',
        decisions: [
          {
            title: 'Single schema with tenant_id isolation',
            text: 'All stores share one schema, and the tenant is applied to every query through a tenant provider. It lowers cost and simplifies operations; in exchange, isolation depends on application discipline.',
          },
          {
            title: 'Dapper and Npgsql on the transactional path',
            text: 'A sale writes inventory, sale, and ledger in one atomic transaction, so I chose direct control over SQL and transactions. The Supabase REST client is limited to authentication.',
          },
          {
            title: 'Immutable ledger and blind cash count',
            text: 'Cash drops and top-ups only enter as new entries, and the operator counts the drawer without seeing the expected balance. Shortages surface on their own, without relying on trust.',
          },
          {
            title: 'Webhooks behind a durable queue',
            text: 'Delivery orders enter a queue and are processed by a background service, with HMAC signatures and rate limiting. A spike or failure neither takes the POS down nor loses an order.',
          },
          {
            title: 'Licensing driven by payment',
            text: 'The payment provider webhook updates the license status, and login is blocked when it is suspended, canceled, or expired.',
          },
        ],
        debt: 'Automated tests are still pending. Fiscal invoicing and in-POS payment integration were postponed on purpose because of third-party API costs.',
        links: {
          site: 'https://pendurai.vinnisantos.com.br',
          repo: `${GITHUB}/PendurAi`,
        },
      },
      {
        name: 'MarcAi',
        kind: 'Scheduling SaaS platform for beauty salons',
        role: 'Architecture and development',
        status: 'In development',
        stack: ['C# / .NET 10', 'ASP.NET Core Razor Pages', 'Supabase / PostgreSQL', 'xUnit', 'Docker', 'Caddy'],
        context:
          'One application serves many salons, each with its own subdomain, team, schedule, and finances.',
        decisions: [
          {
            title: 'Tenant resolved from the subdomain',
            text: 'A middleware resolves the salon from the URL and caches the result for 60 seconds. The session cookie is host-scoped and carries the tenant, checked against the URL on every request.',
          },
          {
            title: 'Scheduling conflicts blocked in the database',
            text: 'A PostgreSQL EXCLUDE constraint prevents overlapping appointments, and a trigger enforces the cancellation rule. The C# validation exists, but it is not the last line of defense.',
          },
          {
            title: 'TOTP 2FA implemented from scratch',
            text: 'The RFC 6238 algorithm was written without an external package and validated against the official RFC test vectors, to understand and test what protects the super admin panel.',
          },
          {
            title: 'Wildcard TLS through the DNS-01 challenge',
            text: 'Since each salon has a subdomain, the certificate must be a wildcard, which the HTTP-01 challenge does not cover. Caddy issues the certificate through DNS.',
          },
        ],
        debt: 'Tenant isolation is enforced in the application, not by RLS: the backend uses the service key, which bypasses policies. Background services assume a single instance, with no distributed lock.',
        links: { repo: `${GITHUB}/AndressaLeite` },
      },
      {
        name: 'IT Governance Portal',
        kind: 'Internal system for access, hardware, telephony, and knowledge',
        role: 'End-to-end development (Going2)',
        status: 'Internal use',
        stack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Zod', 'Tailwind CSS'],
        context:
          'Centralizes access requests, inventory, company phone lines, and policies that used to live in spreadsheets.',
        decisions: [
          {
            title: 'The application is the only database client',
            text: 'The first version used Row Level Security on Supabase. I migrated to a dedicated Postgres, with authorization made explicit in code on every read and write, to avoid depending on a third-party platform.',
          },
          {
            title: 'Defense in depth with triggers',
            text: 'Fields that are immutable after creation, blocked self-escalation of privilege, and a mandatory reason on every rejection are enforced by the database.',
          },
          {
            title: 'Audit trail written only by triggers',
            text: 'Every relevant write produces a log entry through a trigger, and no application code writes to the trail directly.',
          },
          {
            title: 'Own, revocable sessions',
            text: 'An opaque token in an HttpOnly, Secure, SameSite=Strict cookie, validated against a sessions table. Deactivating an account cuts access immediately.',
          },
        ],
        debt: null,
        links: {},
      },
      {
        name: 'Mocidade 015',
        kind: 'Bus seat reservations for group trips',
        role: 'Architecture and development',
        status: 'In production',
        stack: ['C# / .NET 10', 'ASP.NET Core Razor Pages', 'EF Core', 'PostgreSQL', 'GitHub Actions'],
        context:
          'Participants pick a bus by departure terminal and choose a seat on a map, with a waitlist.',
        decisions: [
          {
            title: 'Reservations in Serializable transactions',
            text: 'Reserving, canceling, and assigning seats run at the highest isolation level, which prevents two participants from getting the same seat.',
          },
          {
            title: 'Secrets kept out of the repository',
            text: 'The connection string never sits in the configuration file: it comes from an environment variable or user secrets.',
          },
          {
            title: 'Automatic deployment on every push',
            text: 'GitHub Actions publishes the app, ships the files via rsync, and restarts the systemd service. A Dockerfile covers running it in a container.',
          },
        ],
        debt: 'The schema is maintained directly in the database, without versioned migrations. The rate-limiting service exists but is not yet applied to login and sign-up.',
        links: {
          site: 'https://mocidade015.vinnisantos.com.br',
          repo: `${GITHUB}/MocidadeApp`,
        },
      },
      {
        name: 'Life OS',
        kind: 'Personal dashboard for routine, workouts, nutrition, and studies',
        role: 'Architecture and development',
        status: 'In production',
        stack: ['Next.js 16', 'TypeScript', 'Supabase (Postgres, Auth, RLS)', 'Drizzle ORM', 'Docker'],
        context:
          'A daily-use tool with individual accounts and architecture documentation versioned alongside the code.',
        decisions: [
          {
            title: 'Decisions recorded as ADRs',
            text: 'Stack choice, authentication model, and build strategy are captured as Architecture Decision Records in the repository.',
          },
          {
            title: 'Builds happen off the server',
            text: 'The Docker image is built on GitHub Actions rather than on the EC2 instance, so builds do not compete for memory and CPU with production apps.',
          },
          {
            title: 'Per-user Row Level Security',
            text: 'Data is isolated by Postgres policies, and the marketing site is the only public part.',
          },
        ],
        debt: null,
        links: {
          site: 'https://lifeos.vinnisantos.com.br',
          repo: `${GITHUB}/app-vinnicius`,
        },
      },
      {
        name: 'Agenda Osvair',
        kind: 'Online booking for an executive transport service',
        role: 'Architecture and development',
        status: 'In production',
        stack: ['HTML + JavaScript', 'Supabase (Auth, RLS, RPC)', 'Tailwind CSS', 'nginx', 'AWS EC2'],
        context:
          'The customer requests a time slot, receives a quote, and approves it before the ride enters the schedule.',
        decisions: [
          {
            title: 'No application server',
            text: 'The static front end talks directly to Supabase, protected by RLS. Deployment is a file copy, and operating cost is minimal.',
          },
          {
            title: 'Business rules in database functions',
            text: 'With no backend of its own, the rules live in Postgres RPC functions rather than in the browser.',
          },
          {
            title: 'WhatsApp through a universal link',
            text: 'The quote goes out through a wa.me link, with no messaging API cost.',
          },
        ],
        debt: null,
        links: { site: 'https://agenda.osvairsantos.com.br' },
      },
    ],
  },
};
