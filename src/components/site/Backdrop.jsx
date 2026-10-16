// Trechos de código das decisões de arquitetura dos projetos (MarcAi, Mocidade,
// PendurAi, Life OS, Agenda e o próprio deploy deste site), espalhados pelo
// fundo. É textura: fica bem apagado e atrás do vidro.
const SNIPPETS = [
  { code: 'EXCLUDE USING gist (profissional_id WITH =, periodo WITH &&);', x: '4%', y: '14%', d: 0 },
  { code: 'await using var tx = await conn.BeginTransactionAsync(IsolationLevel.Serializable);', x: '52%', y: '6%', d: 4 },
  { code: 'var signature = HMACSHA256.HashData(secret, payload);', x: '62%', y: '38%', d: 9 },
  { code: 'WHERE tenant_id = @TenantId', x: '8%', y: '46%', d: 2 },
  { code: 'CREATE POLICY own_rows ON entries USING (user_id = auth.uid());', x: '30%', y: '68%', d: 6 },
  { code: 'const code = hotp(secret, Math.floor(Date.now() / 30_000));', x: '58%', y: '82%', d: 11 },
  { code: "INSERT INTO ledger (tipo, valor) VALUES ('sangria', -50.00);", x: '3%', y: '88%', d: 7 },
  { code: 'try_files $uri $uri.html /index.html;', x: '70%', y: '60%', d: 3 },
  { code: 'docker save app | gzip | ssh oracle-vps deploy', x: '22%', y: '28%', d: 13 },
  { code: "await supabase.rpc('aprovar_orcamento', { id });", x: '40%', y: '96%', d: 8 },
];

const KEYWORDS = /\b(await|using|var|const|WHERE|CREATE|POLICY|ON|USING|INSERT|INTO|VALUES|EXCLUDE|WITH)\b/;

// Realce mínimo: palavras-chave em azul, o resto em tom de comentário.
function Highlight({ code }) {
  return code.split(/(\s+|[(),;])/).map((part, i) =>
    KEYWORDS.test(part) ? (
      <span key={i} className="text-[var(--syntax-keyword)]">
        {part}
      </span>
    ) : (
      part
    )
  );
}

/**
 * Fundo fixo do site: a aurora que o vidro desfoca, a matriz de pontos no
 * topo, o código flutuante e a granulação, tudo atrás do conteúdo e fora da
 * árvore de acessibilidade.
 */
export default function Backdrop() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__blob aurora__blob--1" />
      <div className="aurora__blob aurora__blob--2" />
      <div className="aurora__blob aurora__blob--3" />
      <div className="aurora__matrix" />
      <div className="aurora__code hidden md:block">
        {SNIPPETS.map((s) => (
          <code key={s.code} style={{ left: s.x, top: s.y, animationDelay: `-${s.d}s` }}>
            <Highlight code={s.code} />
          </code>
        ))}
      </div>
      <div className="aurora__grain" />
    </div>
  );
}
