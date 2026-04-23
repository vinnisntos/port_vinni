import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            © 2026 Vinni Santos Dev. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-mono text-gray-600">
              Built with <span className="text-purple-500">React 19</span> + <span className="text-purple-500">Tailwind v4</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
