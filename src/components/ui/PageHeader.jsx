/**
 * Cabeçalho padronizado usado em todas as páginas (Home, About, Tools e ferramentas).
 * Centraliza a identidade visual e elimina ~30 linhas de markup duplicado por página.
 */
export default function PageHeader({ tag, title, accent, description }) {
  return (
    <header className="mb-8">
      <span className="inline-block px-3 py-1 mb-4 border border-purple-500/30 bg-purple-500/5 text-purple-400 font-mono text-[10px] tracking-widest uppercase">
        {tag}
      </span>
      <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
        {title} <span className="text-purple-500">{accent}</span>
      </h1>
      {description && <p className="text-muted">{description}</p>}
    </header>
  );
}