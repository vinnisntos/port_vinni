import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { useLocale, getLocalizedPath } from '../../hooks/useLocale';

const COPY = {
  pt: {
    nav: 'Navegação principal',
    homeLink: 'Página inicial — Santos Soluções',
    github: 'GitHub de Vinnicius Santos (abre em nova aba)',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    langSwitcher: 'Selecionar idioma',
    links: { home: 'Home', tools: 'Ferramentas', about: 'Sobre' },
  },
  en: {
    nav: 'Main navigation',
    homeLink: 'Homepage — Santos Soluções',
    github: 'Vinnicius Santos on GitHub (opens in new tab)',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    langSwitcher: 'Select language',
    links: { home: 'Home', tools: 'Tools', about: 'About' },
  },
};

const flagLinkClass = (active) =>
  `text-base leading-none px-1.5 py-1 rounded-sm transition-opacity ${
    active ? 'opacity-100' : 'opacity-40 hover:opacity-80'
  }`;

function LanguageSwitcher({ locale, pathname, label, onNavigate, className = '' }) {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label={label}>
      <Link
        to={getLocalizedPath(pathname, 'pt')}
        onClick={onNavigate}
        aria-current={locale === 'pt' ? 'true' : undefined}
        className={flagLinkClass(locale === 'pt')}
        title="Português"
      >
        <span aria-hidden="true">🇧🇷</span>
        <span className="sr-only">Português</span>
      </Link>
      <Link
        to={getLocalizedPath(pathname, 'en')}
        onClick={onNavigate}
        aria-current={locale === 'en' ? 'true' : undefined}
        className={flagLinkClass(locale === 'en')}
        title="English (US)"
      >
        <span aria-hidden="true">🇺🇸</span>
        <span className="sr-only">English (US)</span>
      </Link>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const locale = useLocale();
  const { pathname } = useLocation();
  const t = COPY[locale];

  const homeHref = locale === 'en' ? '/en' : '/';
  const aboutHref = locale === 'en' ? '/en/about' : '/about';

  const links = [
    { path: homeHref, label: t.links.home, end: true },
    { path: '/tools', label: t.links.tools, end: false },
    { path: aboutHref, label: t.links.about, end: false },
  ];

  // Fecha o menu mobile automaticamente ao trocar de rota
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-[#09090B]/80">
      <nav aria-label={t.nav} className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            to={homeHref}
            onClick={closeMobile}
            className="flex items-center gap-3 group"
            aria-label={t.homeLink}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-purple-800 rounded-sm flex items-center justify-center font-black text-black text-lg group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-shadow">
              VS
            </div>
            <div className="text-lg font-black tracking-tighter uppercase text-white">
              SANTOS<span className="text-purple-500 font-light">DEV</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.path}
                  end={link.end}
                  className={({ isActive }) =>
                    `text-[10px] font-mono uppercase tracking-widest transition-colors ${
                      isActive
                        ? 'text-purple-400'
                        : 'text-gray-500 hover:text-purple-400'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher
              locale={locale}
              pathname={pathname}
              label={t.langSwitcher}
              onNavigate={closeMobile}
            />
            <a
              href="https://github.com/vinnisntos"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.github}
              className="text-gray-500 hover:text-purple-400 transition-colors"
            >
              <FaGithub className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-gray-400 hover:text-purple-400 p-2 -mr-2"
            aria-label={mobileOpen ? t.closeMenu : t.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <ul
            id="mobile-menu"
            className="md:hidden mt-4 pt-4 border-t border-white/5 flex flex-col gap-4 list-none"
          >
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.path}
                  end={link.end}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `text-sm font-mono uppercase tracking-widest transition-colors ${
                      isActive ? 'text-purple-400' : 'text-gray-500 hover:text-purple-400'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <LanguageSwitcher
                locale={locale}
                pathname={pathname}
                label={t.langSwitcher}
                onNavigate={closeMobile}
              />
            </li>
            <li>
              <a
                href="https://github.com/vinnisntos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono uppercase tracking-widest text-gray-500 hover:text-purple-400 transition-colors"
              >
                GitHub
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
