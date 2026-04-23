import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTerminal } from 'react-icons/fa';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { path: '/', label: 'Home' },
    { path: '/tools', label: 'Ferramentas' },
    { path: '/about', label: 'Sobre' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-[#09090B]/80">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-purple-800 rounded-sm flex items-center justify-center font-black text-black text-lg group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-shadow">
              VS
            </div>
            <div className="text-lg font-black tracking-tighter uppercase text-white">
              SANTOS<span className="text-purple-500 font-light">DEV</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  text-[10px] font-mono uppercase tracking-widest transition-colors
                  ${isActive(link.path) ? 'text-purple-400' : 'text-gray-500 hover:text-purple-400'}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/vinnisntos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-purple-400 transition-colors"
            >
              <FaTerminal className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-400 hover:text-purple-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="md:hidden mt-4 pt-4 border-t border-white/5 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  text-sm font-mono uppercase tracking-widest transition-colors
                  ${isActive(link.path) ? 'text-purple-400' : 'text-gray-500'}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
