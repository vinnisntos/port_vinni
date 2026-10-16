import { Link } from 'react-router-dom';
import { ArrowUpRight, GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import { useLocale } from '../../hooks/useLocale';
import Reveal from './Reveal';
import StatusBar from './StatusBar';

const COPY = {
  pt: {
    lead: 'Aberto a vagas de desenvolvimento full stack e a conversas sobre arquitetura.',
    contact: 'Falar no LinkedIn',
    navLabel: 'Links do rodapé',
    rights: 'Todos os direitos reservados.',
    built: 'Feito com React 19, Tailwind v4 e shadcn/ui.',
    links: { projects: 'Projetos', tools: 'Ferramentas', about: 'Sobre' },
  },
  en: {
    lead: 'Open to full stack development roles and conversations about architecture.',
    contact: 'Message me on LinkedIn',
    navLabel: 'Footer links',
    rights: 'All rights reserved.',
    built: 'Built with React 19, Tailwind v4 and shadcn/ui.',
    links: { projects: 'Projects', tools: 'Tools', about: 'About' },
  },
};

export default function Footer() {
  const year = new Date().getFullYear();
  const locale = useLocale();
  const t = COPY[locale];
  const en = locale === 'en';

  return (
    <footer className="relative mt-32 overflow-hidden px-4 pb-8 md:mt-48 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-2xl leading-snug font-medium tracking-tight text-foreground md:text-3xl">
            {t.lead}
          </p>
          <a
            href="https://www.linkedin.com/in/vinnisantos"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-base font-medium text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[transform,background-color] duration-300 hover:-translate-y-px hover:bg-primary-hover active:scale-[0.97]"
          >
            <LinkedinLogo className="size-5" weight="fill" aria-hidden="true" />
            {t.contact}
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              weight="bold"
              aria-hidden="true"
            />
          </a>
        </Reveal>

        <p
          aria-hidden="true"
          className="mt-16 text-[clamp(3.2rem,13.5vw,13rem)] leading-[0.82] font-black tracking-[-0.055em] text-white/[0.06] select-none md:mt-24"
        >
          Vinnicius Santos
        </p>

        <div className="mt-8 flex flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <nav aria-label={t.navLabel} className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to={en ? '/en/projects' : '/projects'} className="hover:text-foreground">
              {t.links.projects}
            </Link>
            <Link to="/tools" className="hover:text-foreground">
              {t.links.tools}
            </Link>
            <Link to={en ? '/en/about' : '/about'} className="hover:text-foreground">
              {t.links.about}
            </Link>
            <a
              href="https://github.com/vinnisntos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground"
            >
              <GithubLogo className="size-4" weight="bold" aria-hidden="true" /> GitHub
            </a>
          </nav>
          <div className="flex flex-col gap-1 md:items-end">
            <p>
              © {year} Vinni Santos Dev. {t.rights}
            </p>
            <p className="text-muted-foreground/80">{t.built}</p>
          </div>
        </div>

        <StatusBar locale={locale} />
      </div>
    </footer>
  );
}
