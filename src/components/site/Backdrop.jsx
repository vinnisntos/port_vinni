/**
 * Fundo fixo do site: a aurora que o vidro desfoca, a matriz de pontos no
 * topo e a granulação, tudo atrás do conteúdo e fora da árvore de acessibilidade.
 */
export default function Backdrop() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__blob aurora__blob--1" />
      <div className="aurora__blob aurora__blob--2" />
      <div className="aurora__blob aurora__blob--3" />
      <div className="aurora__matrix" />
      <div className="aurora__grain" />
    </div>
  );
}
