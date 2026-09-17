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

export const aboutEn = {
  pageHeader: {
    tag: '[ about // dev-student ]',
    title: 'ABOUT',
    accent: 'ME',
  },

  seo: {
    title: 'Vinnicius Santos · About — Full Stack Developer',
    description:
      "Vinnicius Santos' background: IT Intern in Helpdesk/DevOps, Systems Analysis and Development student, and full stack developer with projects live in production.",
  },

  profile: {
    roleTag: 'IT Intern (Helpdesk/DevOps) · Backend Jr. Developer',
    bio: 'Systems Analysis and Development student with a solid foundation in programming logic, systems architecture, and backend development. Hands-on experience with C#, Python, and SQL databases, combined with a background in industrial and commercial environments that gave me a strong sense of business processes, logistics, and problem-solving.',
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
    skills: 'Technical Skills',
    experience: 'Professional Experience',
    education: 'Education',
    courses: 'Courses & Certifications',
    languages: 'Languages',
    stack: 'How I Built This Portfolio',
  },

  skillGroups: [
    {
      title: 'Tools & Version Control',
      items: [
        { name: 'Git', icon: FaGitAlt },
        { name: 'GitHub', icon: FaGithub },
        { name: 'Docker', icon: FaDocker },
        { name: 'CLI', icon: FaTerminal },
      ],
    },
    {
      title: 'Programming Languages',
      items: [
        { name: 'C# (.NET)', icon: TbBrandCSharp },
        { name: 'Python', icon: FaPython },
        { name: 'JavaScript', icon: FaJs },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'SQL', icon: FaDatabase },
      ],
    },
    {
      title: 'Frameworks & Web Development',
      items: [
        { name: 'ASP.NET Core (Razor Pages)', icon: SiDotnet },
        { name: 'Flask', icon: SiFlask },
        { name: 'Django', icon: SiDjango },
      ],
    },
    {
      title: 'Databases & Cloud',
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
      items: [{ name: 'UX/UI · Responsive Interfaces', icon: FaPalette }],
    },
    {
      title: 'AI & Prompt Engineering',
      items: [
        { name: 'ChatGPT, Claude AI/Claude Code, Gemini', icon: FaRobot },
      ],
    },
  ],

  experience: [
    {
      company: 'Going2',
      role: 'IT Intern — Helpdesk / DevOps',
      period: 'Jul 2026 — Present',
      bullets: [
        'Leading end-to-end development of an internal Portal (Next.js, Supabase, AWS EC2) for access control and system-catalog auditing, as part of IT governance.',
        'Actively involved in technology innovation, building and deploying internal projects that use Artificial Intelligence to streamline processes.',
        'Own core DevOps routines: managing cloud infrastructure, configuring servers (Nginx/PM2), and maintaining environments to keep applications highly available.',
        'Provide technical Helpdesk support, handling day-to-day tickets, fast incident resolution, and preventive/corrective maintenance of corporate IT infrastructure.',
      ],
    },
    {
      company: 'PendurAi',
      role: 'Full Stack Developer — POS & ERP (SaaS) for Wine Shops and Small Markets',
      period: 'In Production',
      bullets: [
        'Multi-tenant POS/ERP SaaS running in production on AWS EC2 (pendurai.vinnisantos.com.br), with per-store data isolation (tenant_id), a Super Admin panel, and licensing that automatically locks out suspended, canceled, or expired accounts.',
        'Full POS with barcode or name-based sales, keyboard shortcuts, per-table tabs, and atomic transactions (inventory + sale + ledger in a single operation).',
        'Blind cash count with hidden running balance and an immutable ledger for cash drops/top-ups, unit-conversion-aware inventory with an audit trail (Kardex), and a customer credit-tab system with per-customer limits.',
        'Recurring payment integration via the Asaas API, webhook integration with delivery platform Zé Delivery (durable queue, HMAC signature, and rate limiting), and thermal receipt printing via ESC/POS.',
        'Admin dashboard with business metrics (COGS, gross profit, ROI), built with ASP.NET Core (Razor Pages) using a layered architecture and transactional data access via Dapper/Npgsql.',
      ],
    },
    {
      company: 'Mocidade 015',
      role: 'Full Stack Developer — Bus Ticket & Reservation System',
      period: 'In Production',
      bullets: [
        'Live production system with real data at mocidade015.vinnisantos.com.br, actively used to sell and reserve bus tickets for group trips, with seat selection, waitlists, and companion management.',
        'Built with ASP.NET Core (Razor Pages), C# .NET 10, and Entity Framework Core, including batch passenger registration with complete records (ID documents, emergency contacts, group affiliation).',
        'Custom security layer: ID and phone-number validation with check digits, brute-force rate limiting, and strong password policies.',
        'CI/CD pipeline with GitHub Actions, publishing the app and automatically deploying via SSH/SCP to an AWS server with a service restart.',
      ],
    },
    {
      company: 'MarcAi',
      role: 'Full Stack Developer — Scheduling Platform (SaaS)',
      period: 'In Development',
      bullets: [
        'Building a multi-tenant scheduling application for beauty salons, with a focus on security and two-factor authentication (TOTP 2FA).',
        'Ensuring code quality through unit tests (xUnit) and containerizing the environment with Docker.',
        'Stack: C# (ASP.NET Core), Supabase, xUnit, and Docker.',
      ],
    },
    {
      company: 'Life OS',
      role: 'Full Stack Developer — Personal Management Dashboard',
      period: 'In Production',
      bullets: [
        'Full-stack application for personal task management and productivity, live at agenda.vinnisantos.com.br.',
        'Stack: Next.js 15, Tailwind CSS, and Supabase Auth, orchestrated with Docker on AWS EC2.',
      ],
    },
    {
      company: 'Independent Projects',
      role: 'Software Developer — github.com/vinnisntos',
      period: 'In Development',
      bullets: [
        'SaaS_PDV: a point-of-sale and financial management system with a multi-tenant architecture in C# .NET 10, Entity Framework Core, and SQLite, with data isolation per company and branch.',
        'botmocidade and wpp-agendamento: WhatsApp automation bots for customer service and scheduling, built in Node.js (whatsapp-web.js), with session persistence and QR-code login.',
        'Built digital catalogs and on-demand registration systems for small businesses and independent professionals.',
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
    note: 'Expected graduation: Feb 2027 — currently in the 4th (final) semester, evening program',
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
      year: 'In Progress',
    },
    { name: 'Java Fundamentals', org: 'FIAP', year: '2026' },
    { name: 'Metrology', org: 'SENAI', year: '2024' },
    {
      name: 'Object-Oriented Programming (OOP) with C#',
      org: 'Udemy',
      year: 'In Progress',
    },
  ],

  languages: [
    {
      name: 'English',
      level: 'Intermediate',
      text: 'Excellent technical reading comprehension — API docs, code, and technology terminology. Good communication and writing skills.',
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
