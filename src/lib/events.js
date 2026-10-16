// Barramento de eventos do site: liga peças que não se conhecem (o terminal
// do hero abre a paleta, a navbar dispara a chuva de código, etc.).
//   'palette:open'   abre a paleta de comandos
//   'terminal:open'  troca o console do hero para a aba do terminal
//   'matrix:start'   chuva de código em tela cheia
//   'debug:toggle'   liga/desliga o modo debug (contornos em tudo)
//   'toast'          { title, text, action?, duration? } aviso curto no canto da tela
const bus = new EventTarget();

export function emit(name, detail) {
  bus.dispatchEvent(new CustomEvent(name, { detail }));
}

export function on(name, handler) {
  const listener = (event) => handler(event.detail);
  bus.addEventListener(name, listener);
  return () => bus.removeEventListener(name, listener);
}
