export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            © {year} Vinni Santos Dev. Todos os direitos reservados.
          </p>
          <p className="text-[10px] font-mono text-gray-600">
            Built with{' '}
            <span className="text-purple-500">React 19</span> +{' '}
            <span className="text-purple-500">Tailwind v4</span>
          </p>
        </div>
      </div>
    </footer>
  );
}