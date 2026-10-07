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
  { name: 'Java Fundamentals (60h)', org: 'FIAP', year: '2026' },
  { name: 'Metrology', org: 'SENAI', year: '2024' },
  {
    name: 'Complete C#: Object-Oriented Programming + Projects (38h)',
    org: 'Udemy · Nelio Alves',
    year: '2026',
  },
  { name: 'Software Engineering (100h)', org: 'FIAP', year: '2026' },
  {
    name: 'Strategic Sourcing Talk (2h)',
    org: 'JUNIP — UNIP Junior Consulting, Sorocaba',
    year: '2026',
  },
  {
    name: 'Leadership Talk',
    org: 'JUNIP — UNIP Junior Consulting, Sorocaba',
    year: '2026',
  },
  {
    name: 'People Development Talk (2h)',
    org: 'JUNIP — UNIP Junior Consulting, Sorocaba',
    year: '2026',
  },
  {
    name: 'Business Ideas Talk: JUNIP (2h)',
    org: 'JUNIP — UNIP Junior Consulting, Sorocaba',
    year: '2026',
  },
  { name: 'UNIP Technology Week', org: 'UNIP / Even3', year: '2025' },
  {
    name: 'Santander Fala Mundo 2026 — 3rd Edition (place awarded)',
    org: 'Santander Open Academy',
    year: '2026',
  },
];

export const aboutEn = {
  pageHeader: {
    tag: '[ about // dev-student ]',
    title: 'ABOUT',
    accent: 'ME',
  },

  seo: {
    title: 'About Vinnicius Santos · Full Stack Developer & Solution Architecture',
    description: `Background of Vinnicius Santos (Vinnicius Gabriel Matos dos Santos): full stack developer focused on solution architecture, co-founder of PendurAi, and IT Intern at Going2. ${courses.length} courses and certifications, including Harvard CS50 (Python and SQL), FIAP, and SENAI.`,
  },

  profile: {
    roleTag: 'Full Stack · Solution Architecture (.NET / Next.js)',
    bio: 'Systems Analysis and Development student and IT Intern at Going2, where, alongside support work, I build an internal B2B platform. I develop multi-tenant SaaS with C#/.NET, Next.js, and PostgreSQL, with my own projects live in production, including PendurAi, which I co-founded. A previous background in manufacturing, sales, and logistics gave me a practical sense of business processes and of the people who use the system.',
    location: 'Sorocaba, SP — Brazil',
    phones: [
      { display: '+55 15 92002-2260', href: 'tel:+5515920022260' },
      { display: '+55 15 98163-6193', href: 'tel:+5515981636193' },
    ],
  },

  resumeCta: {
    primaryLabel: 'Download Resume',
    primaryFile: 'curriculo-vinnicius-santos-en.docx',
    primaryDownloadName: 'Vinnicius_Gabriel_Matos_dos_Santos_Resume_EN.docx',
    secondaryLabel: 'Baixar Currículo (PT-BR)',
    secondaryFile: 'curriculo-vinnicius-santos.docx',
    secondaryDownloadName: 'Vinnicius_Gabriel_Matos_dos_Santos_Curriculo.docx',
  },

  social: { github: 'GitHub', linkedin: 'LinkedIn' },

  sectionHeadings: {
    history: 'My Story',
    workProfile: 'How I Work',
    growth: 'Still improving',
    skills: 'Technical Skills',
    experience: 'Professional Experience',
    education: 'Education',
    courses: 'Courses & Certifications',
    languages: 'Languages',
    stack: 'How I Built This Portfolio',
  },

  workProfile: {
    strengths: [
      {
        title: 'I understand the problem before building',
        text: 'I go to the people who will use the system and gather requirements with managers and engineers, so I do not ship a generic solution.',
      },
      {
        title: 'I ship early and adjust from feedback',
        text: 'I demo what I built to the team and treat every usability or business-rule note as the next task.',
      },
      {
        title: 'I say what I do not know yet',
        text: 'When a topic is new, I say so, study it, and ask. That is how, in under two months as an intern, I moved from support work to building an internal platform.',
      },
      {
        title: 'AI-assisted development, with my own direction',
        text: 'I use Claude Code and Codex daily: I plan in phases, define roles and business rules, and check the result against what was asked.',
      },
    ],
    growth: [
      'Automated testing as a habit: already in place on MarcAi and Life OS, still pending on PendurAi.',
      'Usability patterns for admin screens, such as filters, pagination, and leaner forms.',
      'Estimating cost and sizing infrastructure before recommending a service.',
      'Team routines: branching, code review, and shared component libraries.',
      'Spoken English.',
    ],
  },

  skillGroups: [
    {
      title: 'Programming Languages',
      items: [
        { name: 'C# (.NET)', icon: TbBrandCSharp },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'JavaScript', icon: FaJs },
        { name: 'Python', icon: FaPython },
        { name: 'SQL', icon: FaDatabase },
      ],
    },
    {
      title: 'Frameworks & Web Development',
      items: [
        { name: 'ASP.NET Core (Razor Pages)', icon: SiDotnet },
        { name: 'Next.js (App Router)', icon: SiNextdotjs },
        { name: 'React', icon: FaReact },
        { name: 'Node.js', icon: FaNodeJs },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
      ],
    },
    {
      title: 'Databases',
      items: [
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'Supabase (Auth · RLS)', icon: SiSupabase },
        { name: 'SQL Server', icon: FaServer },
        { name: 'EF Core · Dapper · Drizzle', icon: FaDatabase },
      ],
    },
    {
      title: 'Infrastructure & DevOps',
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
      title: 'Architecture, Security & Quality',
      items: [
        { name: 'Multi-tenancy · RBAC', icon: FaShieldAlt },
        { name: 'Authentication · 2FA (TOTP)', icon: FaShieldAlt },
        { name: 'xUnit · Vitest', icon: FaVial },
      ],
    },
    {
      title: 'Interfaces',
      items: [{ name: 'UX/UI · Responsive Interfaces', icon: FaPalette }],
    },
    {
      title: 'AI & Prompt Engineering',
      items: [
        { name: 'Claude Code, Codex, Gemini, ChatGPT', icon: FaRobot },
      ],
    },
  ],

  experience: [
    {
      company: 'Going2',
      role: 'IT Intern — Support, Governance & Development',
      period: 'Aug 2026 — Present',
      bullets: [
        'Developing the B2B platform the company uses to deliver automation and AI to its clients: I took over a project already under way and delivered the client view, the automation hub, the training module, the FAQ with an assistant, and the management and audit panels, and reworked the interface.',
        'Platform stack: a Next.js 16, React 19, and TypeScript monorepo on PostgreSQL with per-organization Row Level Security, Drizzle ORM, a job queue inside Postgres itself, and CI on GitHub Actions; I also handled its Docker/Dokploy deployment.',
        'Gathering requirements directly with my manager and the solutions engineers, and demoing to the engineering team, with short adjustment cycles driven by their feedback (usability, permissions, and integrations).',
        'End-to-end development of the IT Governance Portal (Next.js 14, TypeScript, and PostgreSQL): RBAC with four roles, access requests and approvals, hardware inventory with monthly check-ins, telephony, a knowledge base, and a trigger-based audit trail. I also recorded the video training for its users.',
        'IT administration: Google Workspace accounts and access (onboarding and offboarding with backups), company devices, the password vault, and environment upkeep with Docker, Nginx, and PM2 on AWS EC2.',
        'Customer service for a nationwide promotional campaign: supporting participants by email and WhatsApp, validating receipts, and registering winners, following the workflow with the legal team and data-protection (LGPD) requirements.',
      ],
    },
    {
      company: 'PendurAi',
      role: 'Co-Founder · Architecture & Full Stack Development — POS & ERP (SaaS) for Wine Shops and Small Markets',
      period: 'In Production (beta)',
      bullets: [
        'Multi-tenant POS/ERP SaaS running in production on AWS EC2 (pendurai.vinnisantos.com.br), with per-store data isolation (tenant_id), a Super Admin panel, and licensing that automatically locks out suspended, canceled, or expired accounts.',
        'Full POS with barcode or name-based sales, keyboard shortcuts, per-table tabs, and atomic transactions (inventory + sale + ledger in a single operation).',
        'Blind cash count with hidden running balance and an immutable ledger for cash drops/top-ups, unit-conversion-aware inventory with an audit trail (Kardex), and a customer credit-tab system with per-customer limits.',
        'Recurring payment integration via the Asaas API, transactional email via Resend, webhook integration with delivery platform Zé Delivery (durable queue, HMAC signature, and rate limiting), and thermal receipt printing via ESC/POS.',
        'Admin dashboard with business metrics (COGS, gross profit, ROI) and reports exportable to Excel, PDF, XML, and CSV, built with ASP.NET Core (Razor Pages) using a layered architecture and transactional data access via Dapper/Npgsql.',
      ],
    },
    {
      company: 'Mocidade 015',
      role: 'Full Stack Developer — Bus Ticket & Reservation System',
      period: 'In Production',
      bullets: [
        'Live production system with real data at mocidade015.vinnisantos.com.br, actively used to sell and reserve bus tickets for group trips, with seat selection, waitlists, and companion management.',
        'Built with ASP.NET Core (Razor Pages), C# .NET 10, Entity Framework Core, and PostgreSQL, including batch passenger registration with complete records (ID documents, emergency contacts, group affiliation).',
        'Consistency and security: reservations run in Serializable transactions, which prevents two participants from getting the same seat, plus ID and phone-number validation with check digits and BCrypt-hashed passwords.',
        'CI/CD pipeline with GitHub Actions, publishing the app and automatically deploying via rsync to an AWS server, with a systemd service restart.',
      ],
    },
    {
      company: 'MarcAi',
      role: 'Full Stack Developer — Scheduling Platform (SaaS)',
      period: 'In Development',
      bullets: [
        'Multi-tenant scheduling platform for beauty salons: each salon on its own subdomain, with tenant isolation checked on every request and self-service onboarding.',
        'Scheduling with per-professional price and duration, time conflicts blocked in the database itself (a PostgreSQL EXCLUDE constraint), and a cancellation rule enforced by a trigger.',
        'Super admin with TOTP 2FA (RFC 6238) implemented from scratch and validated against the official test vectors; 57 xUnit tests running in CI on GitHub Actions.',
        'Transactional email via Resend, subscriptions via Asaas (implemented, still being validated), and deployment with Docker Compose and Caddy with wildcard TLS. Stack: ASP.NET Core (Razor Pages) and Supabase/PostgreSQL.',
      ],
    },
    {
      company: 'Life OS',
      role: 'Full Stack Developer — Personal Management Dashboard',
      period: 'In Production',
      bullets: [
        'Full-stack routine and productivity application, in daily personal use at lifeos.vinnisantos.com.br, with modules for workouts, nutrition, and a Kanban board for studies and work.',
        'Stack: Next.js 16 (App Router), Supabase (Postgres, Auth, and RLS), Drizzle ORM, Tailwind CSS v4, and shadcn/ui, with the Docker image built on GitHub Actions and served behind nginx on AWS EC2.',
        'Architecture decisions recorded as ADRs and business rules covered by unit tests (Vitest).',
      ],
    },
    {
      company: 'Independent Projects',
      role: 'Software Developer — github.com/vinnisntos',
      period: 'In Development',
      bullets: [
        'Agenda Osvair (agenda.osvairsantos.com.br): online booking for an executive transport service, with a request, quote, and customer-approval flow; static front end on Supabase (Auth, RLS, and RPC functions), served by nginx on AWS EC2.',
        'Lopes Vision (demonstrativo.vinnisantos.com.br): a demo booking site for an optician, built with Next.js, where customers pick a service, day, and time without creating an account and get on-screen confirmation.',
        'BDC — Batalha das Capivaras: a pilot with a public landing page, ranking, and live bracket draw for an independent rap battle, built with Next.js 14, Supabase, and Vercel.',
        'wpp-agendamento: a multi-tenant WhatsApp scheduling SaaS (built on Baileys), with PIX billing via Mercado Pago, Supabase/PostgreSQL persistence, and a state-machine-driven conversational flow.',
        'SaaS_PDV: a multi-tenant desktop point-of-sale and financial management system in C# .NET 10 (Windows Forms), Entity Framework Core, and SQLite, with data isolation per company and branch.',
        'botmocidade: a WhatsApp auto-reply bot (whatsapp-web.js) with customizable commands and persistent QR-code login sessions — an open-source educational project.',
        'Landing pages for independent professionals, such as osvairsantos.com.br and a catalog for an eyebrow designer, in HTML and Tailwind CSS.',
      ],
    },
    {
      company: 'D.S.S. Distribuidora',
      role: 'Junior External Sales Assistant',
      period: 'Nov 2024 — Mar 2026',
      bullets: [
        'Worked directly in a B2B business model, handling consultative customer service, billing, and negotiation with corporate clients.',
        'Responsible for route-planning intelligence and ground logistics, optimizing delivery flow and merchandise distribution.',
        'Handled financial transactions and cash, with daily audits of operational cash flow.',
        'Performed corrective and preventive maintenance on high-turnover refrigeration equipment.',
      ],
    },
    {
      company: 'MDA Do Brasil — Indústria e Comércio',
      role: 'Production Line Operator',
      period: 'Jan 2024 — Mar 2024',
      bullets: [
        'Performed visual inspection and strict quality control of high-precision machined parts.',
        'Continuously monitored refrigerant fluid systems and performed preventive/corrective maintenance on industrial machinery.',
        'Managed waste disposal and organized critical production zones following safety and efficiency standards.',
      ],
    },
  ],

  education: {
    degree: 'Associate Degree in Systems Analysis and Development',
    school: 'Universidade Paulista (UNIP)',
    note: 'Expected graduation: mid-2027 (evening program)',
  },

  courses,

  languages: [
    {
      name: 'English',
      level: 'Intermediate',
      text: 'Confident technical reading of documentation, code, and APIs, with functional writing. Spoken English still developing.',
    },
    {
      name: 'Latin',
      text: 'Knowledge of fundamental linguistic structures and terms, applied to the etymological and structural understanding of derived languages.',
    },
  ],

  stackDetails: [
    { name: 'Vite 8', desc: 'ultra-fast build tool' },
    { name: 'React 19', desc: 'with modern hooks' },
    { name: 'Tailwind CSS v4', desc: 'native in Vite' },
    { name: 'React Router v7', desc: 'for navigation' },
    { name: 'Brazilian document validation', desc: 'official government algorithms' },
    { name: 'ViaCEP API', desc: 'address lookup' },
  ],
};
