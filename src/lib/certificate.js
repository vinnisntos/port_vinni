import { EGGS } from './eggs';

// Certificado de Usuário Curioso: desenhado num canvas no navegador de quem
// achou os 6 easter eggs e baixado como PNG. Valor legal: nenhum.

const W = 1600;
const H = 1130;
const C = {
  bg: '#04070f',
  panel: '#0a1222',
  primary: '#4ea8ff',
  string: '#8be3ff',
  number: '#ffbf75',
  comment: '#7486a3',
  text: '#e6eefb',
};
const SANS = '"Geist Variable", ui-sans-serif, system-ui, sans-serif';
const MONO = '"Geist Mono Variable", ui-monospace, "Cascadia Code", monospace';

const COPY = {
  pt: {
    file: 'certificado-usuario-curioso.png',
    header: '// certificado.png · emitido por vinnisantos.com.br',
    title: 'Certificado de Usuário Curioso',
    lead: 'Certificamos, sem nenhum valor legal, que',
    anon: 'Dev Anônimo(a)',
    body: [
      'achou os 6 easter eggs deste portfólio em vez de ler o currículo,',
      'como uma pessoa normal faria. Comportamento suspeito de bom desenvolvedor.',
    ],
    eggs: {
      konami: 'contornou todas as caixas e não consertou nenhuma',
      matrix: 'viu a matriz e voltou pra contar',
      sudo: 'tentou contratar com privilégio de root',
      rmrf: 'tentou apagar o servidor (o banco não deixou)',
      teapot: 'pediu café para um bule',
      logo: 'clicou sete vezes no logo sem motivo aparente',
    },
    date: 'Emitido em',
    serial: 'Nº de série',
    validity: 'Validade: até o próximo rm -rf',
    mec: 'Reconhecido pelo MEC: não',
    signer: 'Vinnicius Santos',
    role: 'autoridade certificadora autoproclamada',
    seal: '100% CURIOSO',
    locale: 'pt-BR',
  },
  en: {
    file: 'curious-user-certificate.png',
    header: '// certificate.png · issued by vinnisantos.com.br',
    title: 'Curious User Certificate',
    lead: 'This certifies, with zero legal value, that',
    anon: 'Anonymous Dev',
    body: [
      'found all 6 easter eggs on this portfolio instead of reading the resume',
      'like a normal person would. Behavior consistent with a good developer.',
    ],
    eggs: {
      konami: 'outlined every box and fixed none of them',
      matrix: 'saw the matrix and came back to tell',
      sudo: 'tried to hire with root privileges',
      rmrf: 'tried to wipe the server (the database said no)',
      teapot: 'asked a teapot for coffee',
      logo: 'clicked the logo seven times for no apparent reason',
    },
    date: 'Issued on',
    serial: 'Serial no.',
    validity: 'Valid until the next rm -rf',
    mec: 'Accredited by anyone: no',
    signer: 'Vinnicius Santos',
    role: 'self-proclaimed certificate authority',
    seal: '100% CURIOUS',
    locale: 'en-US',
  },
};

// Diminui a fonte até o texto caber na largura.
function fit(ctx, text, weight, size, family, max) {
  let s = size;
  ctx.font = `${weight} ${s}px ${family}`;
  while (s > 24 && ctx.measureText(text).width > max) {
    s -= 2;
    ctx.font = `${weight} ${s}px ${family}`;
  }
}

function draw(ctx, t, name, lang) {
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, W * 0.7);
  glow.addColorStop(0, 'rgba(78, 168, 255, 0.18)');
  glow.addColorStop(1, 'rgba(78, 168, 255, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // moldura dupla
  ctx.strokeStyle = C.primary;
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, W - 80, H - 80);
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 1;
  ctx.strokeRect(58, 58, W - 116, H - 116);
  ctx.globalAlpha = 1;

  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.fillStyle = C.comment;
  ctx.font = `400 20px ${MONO}`;
  ctx.fillText(t.header, 100, 120);

  ctx.textAlign = 'center';
  ctx.fillStyle = C.text;
  fit(ctx, t.title, 700, 68, SANS, W - 240);
  ctx.fillText(t.title, W / 2, 220);

  ctx.fillStyle = C.comment;
  ctx.font = `400 26px ${SANS}`;
  ctx.fillText(t.lead, W / 2, 290);

  ctx.fillStyle = C.primary;
  fit(ctx, name, 700, 84, MONO, W - 280);
  ctx.fillText(name, W / 2, 395);
  ctx.fillRect(W / 2 - 260, 420, 520, 2);

  ctx.fillStyle = C.text;
  ctx.font = `400 25px ${SANS}`;
  t.body.forEach((row, i) => ctx.fillText(row, W / 2, 480 + i * 38));

  // checklist das conquistas, em duas colunas
  ctx.textAlign = 'left';
  Object.keys(EGGS).forEach((id, i) => {
    const x = i % 2 === 0 ? 150 : W / 2 + 40;
    const y = 600 + Math.floor(i / 2) * 64;
    ctx.fillStyle = C.string;
    ctx.font = `500 21px ${MONO}`;
    ctx.fillText('[x]', x, y);
    ctx.fillStyle = C.text;
    ctx.font = `600 21px ${SANS}`;
    ctx.fillText(EGGS[id][lang], x + 52, y);
    ctx.fillStyle = C.comment;
    ctx.font = `400 18px ${SANS}`;
    ctx.fillText(t.eggs[id], x + 52, y + 26);
  });

  // rodapé: dados à esquerda, assinatura à direita
  const serial = `0x${Array.from(crypto.getRandomValues(new Uint8Array(4)), (b) => b.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
  const date = new Date().toLocaleDateString(t.locale, { day: '2-digit', month: 'long', year: 'numeric' });
  ctx.font = `400 19px ${MONO}`;
  [
    [`${t.date}: `, date],
    [`${t.serial}: `, serial],
    ['', t.validity],
    ['', t.mec],
  ].forEach(([label, value], i) => {
    const y = 900 + i * 32;
    ctx.fillStyle = C.comment;
    ctx.fillText(label, 150, y);
    ctx.fillStyle = label ? C.number : C.comment;
    ctx.fillText(value, 150 + ctx.measureText(label).width, y);
  });

  ctx.textAlign = 'center';
  const sx = W - 400;
  ctx.fillStyle = C.text;
  ctx.font = `italic 400 44px "Brush Script MT", "Segoe Script", cursive`;
  ctx.fillText(t.signer, sx, 935);
  ctx.fillStyle = C.comment;
  ctx.fillRect(sx - 190, 955, 380, 1);
  ctx.font = `600 20px ${SANS}`;
  ctx.fillStyle = C.text;
  ctx.fillText(t.signer, sx, 990);
  ctx.font = `400 17px ${SANS}`;
  ctx.fillStyle = C.comment;
  ctx.fillText(t.role, sx, 1018);

  // selo
  ctx.save();
  ctx.translate(sx + 200, 835);
  ctx.rotate(-0.25);
  ctx.strokeStyle = C.number;
  ctx.fillStyle = C.number;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 62, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = `700 34px ${MONO}`;
  ctx.fillText('6/6', 0, 6);
  ctx.font = `600 13px ${MONO}`;
  ctx.fillText(t.seal, 0, 30);
  ctx.restore();
}

/** Desenha o certificado e baixa como PNG. */
export async function downloadCertificate(locale = 'pt', rawName = '') {
  const t = COPY[locale] ?? COPY.pt;
  const name = rawName.trim().slice(0, 40) || t.anon;
  try {
    await Promise.all([
      document.fonts.load(`700 84px "Geist Mono Variable"`),
      document.fonts.load(`700 68px "Geist Variable"`),
    ]);
  } catch {
    // sem as fontes do site, o canvas usa as do sistema
  }

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  draw(canvas.getContext('2d'), t, name, COPY[locale] ? locale : 'pt');

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = t.file;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
