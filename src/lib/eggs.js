import { emit } from './events';

// Easter eggs do site. O progresso fica no navegador de quem visita
// (localStorage); em aba anônima ou com storage bloqueado, só não persiste.
export const EGGS = {
  konami: { pt: 'Código Konami: modo debug', en: 'Konami code: debug mode' },
  matrix: { pt: 'Chuva de código', en: 'Code rain' },
  sudo: { pt: 'sudo contratar', en: 'sudo hire' },
  rmrf: { pt: 'rm -rf / bloqueado pelo banco', en: 'rm -rf / blocked by the database' },
  teapot: { pt: 'HTTP 418: sou um bule', en: "HTTP 418: I'm a teapot" },
  logo: { pt: 'Sete cliques no logo', en: 'Seven clicks on the logo' },
};

const KEY = 'vs:eggs';
// Cópia em memória: sem storage, a conquista ainda vale (uma vez) nesta visita.
const session = new Set();

export function foundEggs() {
  let stored = [];
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (Array.isArray(list)) stored = list;
  } catch {
    // storage indisponível
  }
  return [...new Set([...stored, ...session])].filter((id) => id in EGGS);
}

/** Registra um easter egg; na primeira vez, avisa com um toast de conquista e devolve true. */
export function unlock(id, locale = 'pt') {
  const found = foundEggs();
  if (found.includes(id)) return false;
  const next = [...found, id];
  session.add(id);
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // sem storage: a conquista vale só nesta visita
  }
  const total = Object.keys(EGGS).length;
  const title = locale === 'en' ? `Achievement unlocked (${next.length}/${total})` : `Conquista desbloqueada (${next.length}/${total})`;
  if (next.length === total) {
    announceCertificate(locale, { title, text: `${EGGS[id][locale]}.` });
  } else {
    emit('toast', { title, text: EGGS[id][locale] });
  }
  emit('eggs:change', next);
  return true;
}

const CERT_KEY = 'vs:cert-announced';

/** Toast com o botão do certificado. Sai uma vez por navegador. */
export function announceCertificate(locale = 'pt', { title, text } = {}) {
  const en = locale === 'en';
  try {
    if (localStorage.getItem(CERT_KEY)) return;
    localStorage.setItem(CERT_KEY, '1');
  } catch {
    // sem storage: avisa nesta visita
  }
  const unlocked = en ? 'Curious User Certificate unlocked.' : 'Certificado de Usuário Curioso liberado.';
  emit('toast', {
    title: title ?? (en ? 'All 6 easter eggs found' : 'Os 6 easter eggs encontrados'),
    text: text ? `${text} ${unlocked}` : unlocked,
    duration: 10000,
    action: { label: en ? 'Download certificate' : 'Baixar certificado', run: () => downloadCertificate(locale) },
  });
}

/** Baixa o certificado (carregado sob demanda, só quem zerou os eggs precisa dele). */
export function downloadCertificate(locale = 'pt', name = '') {
  return import('./certificate').then((mod) => mod.downloadCertificate(locale, name));
}
