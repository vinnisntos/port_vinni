/**
 * spa-github-pages redirect handler.
 *
 * Quando o usuário acessa diretamente uma rota (ex.: /tools/cpf) e o
 * GitHub Pages serve o 404.html, este script é executado no index.html
 * e converte a query string "?p=/tools/cpf" de volta para o pathname,
 * permitindo que o React Router renderize a página correta sem precisar
 * de rotas no servidor.
 *
 * Detalhes: https://github.com/rafgraph/spa-github-pages
 */
(function (l) {
  if (l.search) {
    var q = {};
    l.search.slice(1).split('&').forEach(function (v) {
      var a = v.split('=');
      q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
    });
    if (q.p !== undefined) {
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) +
        (q.p || '') +
        (q.q ? '?' + q.q : '') +
        l.hash
      );
    }
  }
}(window.location));