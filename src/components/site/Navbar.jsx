import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { GithubLogo, List } from '@phosphor-icons/react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useLocale, getLocalizedPath } from '../../hooks/useLocale';

const COPY = {
  pt: {
    nav: 'Navegação principal',
    homeLink: 'Página inicial: Santos Dev',
    github: 'GitHub de Vinnicius Santos (abre em nova aba)',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    menu: 'Menu',
    langSwitcher: 'Selecionar idioma',
    links: { home: 'Home', projects: 'Projetos', tools: 'Ferramentas', about: 'Sobre' },
  },
  en: {
    nav: 'Main navigation',
    homeLink: 'Homepage: Santos Dev',
    github: 'Vinnicius Santos on GitHub (opens in new tab)',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
    langSwitcher: 'Select language',
    links: { home: 'Home', projects: 'Projects', tools: 'Tools', about: 'About' },
  },
};

function LanguageSwitcher({ locale, pathname, label, onNavigate, className = '' }) {
  const options = [
    { code: 'pt', short: 'PT', name: 'Português' },
    { code: 'en', short: 'EN', name: 'English (US)' },
  ];

  return (
    <div
      role="group"
      aria-label={label}
      className={cn('glass-inset flex items-center rounded-full p-0.5', className)}
    >
      {options.map((option) => {
        const active = locale === option.code;
        return (
          <Link
            key={option.code}
            to={getLocalizedPath(pathname, option.code)}
            onClick={onNavigate}
            aria-current={active ? 'true' : undefined}
            lang={option.code === 'pt' ? 'pt-BR' : 'en-US'}
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-300',
              active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span aria-hidden="true">{option.short}</span>
            <span className="sr-only">{option.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

function Wordmark() {
  return (
    <>
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-black tracking-tight text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.4)]"
      >
        VS
      </span>
      <span className="text-base font-bold tracking-tight text-foreground">
        SANTOS<span className="font-light text-primary">DEV</span>
      </span>
    </>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const { pathname } = useLocation();
  const t = COPY[locale];

  const en = locale === 'en';
  const links = [
    { path: en ? '/en' : '/', label: t.links.home, end: true },
    { path: en ? '/en/projects' : '/projects', label: t.links.projects, end: false },
    { path: '/tools', label: t.links.tools, end: false },
    { path: en ? '/en/about' : '/about', label: t.links.about, end: false },
  ];

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <nav
        aria-label={t.nav}
        className="glass-strong mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full pr-2 pl-3 md:h-16 md:pr-3 md:pl-4"
      >
        <Link to={en ? '/en' : '/'} onClick={close} aria-label={t.homeLink} className="flex items-center gap-2.5 rounded-full">
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.path}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                    isActive ? 'bg-white/8 text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher locale={locale} pathname={pathname} label={t.langSwitcher} />
          <a
            href="https://github.com/vinnisntos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.github}
            className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/8 hover:text-foreground"
          >
            <GithubLogo className="size-5" weight="bold" aria-hidden="true" />
          </a>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label={t.openMenu}
              className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/8 md:hidden"
            >
              <List className="size-5" weight="bold" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" closeLabel={t.closeMenu} className="p-6 pt-20">
            <SheetTitle className="sr-only">{t.menu}</SheetTitle>
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.path}
                    end={link.end}
                    onClick={close}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-xl px-4 py-3 text-2xl font-semibold tracking-tight transition-colors',
                        isActive ? 'bg-white/8 text-foreground' : 'text-muted-foreground hover:text-foreground'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between">
              <LanguageSwitcher locale={locale} pathname={pathname} label={t.langSwitcher} onNavigate={close} />
              <a
                href="https://github.com/vinnisntos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <GithubLogo className="size-5" weight="bold" aria-hidden="true" /> GitHub
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
