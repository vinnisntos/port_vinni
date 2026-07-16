import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

const links = [
  { path: '/', label: 'Home' },
  { path: '/tools', label: 'Ferramentas' },
  { path: '/about', label: 'Sobre' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Fecha o menu mobile automaticamente ao trocar de rota
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-[#09090B]/80">
      <nav
        aria-label="Navegação principal"
        className="max-w-7xl mx-auto px-6 py-4"
      >
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            to="/"
            onClick={closeMobile}
            className="flex items-center gap-3 group"
            aria-label="Página inicial — Santos Soluções"
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
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
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
            <a
              href="https://github.com/vinnisntos"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Vinnicius Santos (abre em nova aba)"
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
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
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
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
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