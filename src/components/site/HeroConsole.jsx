import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { FileTs, TerminalWindow } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { on } from '@/lib/events';
import Terminal from './Terminal';

// Código do arquivo "sobre", já separado em tokens de sintaxe: [tipo, texto].
const SOURCE = {
  pt: {
    file: 'sobre.ts',
    tokens: [
      ['c', '// quem escreveu este site'], ['n', '\n'],
      ['k', 'const'], ['p', ' '], ['f', 'vinnicius'], ['p', ' = {'], ['n', '\n'],
      ['p', '  cargo: '], ['s', '"Desenvolvedor Full Stack"'], ['p', ','], ['n', '\n'],
      ['p', '  foco: '], ['s', '"arquitetura de soluções"'], ['p', ','], ['n', '\n'],
      ['p', '  stack: ['], ['s', '"C#/.NET"'], ['p', ', '], ['s', '"Next.js"'], ['p', ', '], ['s', '"PostgreSQL"'], ['p', '],'], ['n', '\n'],
      ['p', '  emProducao: '], ['m', '3'], ['p', ','], ['n', '\n'],
      ['p', '  local: '], ['s', '"Sorocaba, SP"'], ['p', ','], ['n', '\n'],
      ['p', '  disponivel: '], ['k', 'true'], ['p', ','], ['n', '\n'],
      ['p', '};'], ['n', '\n'], ['n', '\n'],
      ['k', 'export default'], ['p', ' '], ['f', 'vinnicius'], ['p', ';'],
    ],
    hint: ['Pressione ', '`', ' ou abra a aba terminal.'],
  },
  en: {
    file: 'about.ts',
    tokens: [
      ['c', '// who wrote this site'], ['n', '\n'],
      ['k', 'const'], ['p', ' '], ['f', 'vinnicius'], ['p', ' = {'], ['n', '\n'],
      ['p', '  role: '], ['s', '"Full Stack Developer"'], ['p', ','], ['n', '\n'],
      ['p', '  focus: '], ['s', '"solution architecture"'], ['p', ','], ['n', '\n'],
      ['p', '  stack: ['], ['s', '"C#/.NET"'], ['p', ', '], ['s', '"Next.js"'], ['p', ', '], ['s', '"PostgreSQL"'], ['p', '],'], ['n', '\n'],
      ['p', '  inProduction: '], ['m', '3'], ['p', ','], ['n', '\n'],
      ['p', '  location: '], ['s', '"Sorocaba, Brazil"'], ['p', ','], ['n', '\n'],
      ['p', '  available: '], ['k', 'true'], ['p', ','], ['n', '\n'],
      ['p', '};'], ['n', '\n'], ['n', '\n'],
      ['k', 'export default'], ['p', ' '], ['f', 'vinnicius'], ['p', ';'],
    ],
    hint: ['Press ', '`', ' or open the terminal tab.'],
  },
};

const TOKEN_CLASS = {
  c: 'text-[var(--syntax-comment)] italic',
  k: 'text-[var(--syntax-keyword)]',
  s: 'text-[var(--syntax-string)]',
  m: 'text-[var(--syntax-number)]',
  f: 'text-[var(--syntax-fn)]',
  p: 'text-[var(--syntax-punct)]',
  n: '',
};

/** Digita o arquivo caractere a caractere; com movimento reduzido, mostra inteiro. */
function EditorPane({ source }) {
  const reduce = useReducedMotion();
  const total = source.tokens.reduce((n, [, text]) => n + text.length, 0);
  const [typed, setTyped] = useState(0);
  const shown = reduce ? total : typed;

  useEffect(() => {
    if (reduce) return undefined;
    let frame;
    let start;
    const duration = 2600;
    const tick = (now) => {
      start ??= now + 500;
      const p = Math.min(1, Math.max(0, (now - start) / duration));
      setTyped(Math.round(p * total));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduce, total]);

  // corta os tokens no ponto já "digitado"
  let left = shown;
  const visible = [];
  for (const [type, text] of source.tokens) {
    if (left <= 0) break;
    visible.push([type, text.slice(0, left)]);
    left -= text.length;
  }
  const lineCount = source.tokens.filter(([type]) => type === 'n').length + 1;
  const done = shown >= total;

  return (
    <div className="flex h-full overflow-hidden font-mono text-[13.5px] leading-[1.7]">
      <div aria-hidden="true" className="shrink-0 py-4 pr-3 pl-4 text-right text-[var(--syntax-comment)] select-none">
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      {/* Para leitores de tela, o arquivo inteiro de uma vez */}
      <pre className="sr-only">{source.tokens.map(([, text]) => text).join('')}</pre>
      <pre aria-hidden="true" className="min-w-0 flex-1 overflow-x-auto py-4 pr-4 whitespace-pre">
        {visible.map(([type, text], i) => (
          <span key={i} className={TOKEN_CLASS[type]}>
            {text}
          </span>
        ))}
        <span className={cn('caret ml-px inline-block h-[1.15em] w-[0.55em] translate-y-[0.2em] bg-primary/80', done && 'opacity-60')} />
      </pre>
    </div>
  );
}

/**
 * Janela de vidro do hero com duas abas: o arquivo "sobre" se digitando e um
 * terminal de verdade. A tecla ` (crase) alterna para o terminal de qualquer
 * ponto da home, como o console de um jogo.
 */
export default function HeroConsole({ locale, className }) {
  const source = SOURCE[locale];
  const [tab, setTab] = useState('editor');
  const terminalRef = useRef(null);
  const en = locale === 'en';

  const openTerminal = useCallback(() => {
    setTab('terminal');
    requestAnimationFrame(() => terminalRef.current?.focus());
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? '');
      if (event.key === '`' && !typing && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        openTerminal();
      }
    };
    window.addEventListener('keydown', onKey);
    const off = on('terminal:open', openTerminal);
    return () => {
      window.removeEventListener('keydown', onKey);
      off();
    };
  }, [openTerminal]);

  const tabs = [
    { id: 'editor', label: source.file, icon: FileTs },
    { id: 'terminal', label: 'terminal', icon: TerminalWindow },
  ];

  return (
    <div className={cn('glass overflow-hidden rounded-[var(--radius-panel)]', className)}>
      <div role="tablist" aria-label={en ? 'Console' : 'Console'} className="flex items-center gap-1 border-b border-white/8 px-2 pt-2">
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`console-tab-${id}`}
              aria-selected={active}
              aria-controls={`console-panel-${id}`}
              onClick={() => (id === 'terminal' ? openTerminal() : setTab(id))}
              className={cn(
                'relative flex items-center gap-2 rounded-t-xl px-4 py-2.5 font-mono text-sm transition-colors duration-300',
                active ? 'bg-white/[0.06] text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('size-4', active && 'text-primary')} weight="duotone" aria-hidden="true" />
              {label}
              {active && <span aria-hidden="true" className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>

      <div className="relative h-[21rem] md:h-[23rem]">
        <div
          role="tabpanel"
          id="console-panel-editor"
          aria-labelledby="console-tab-editor"
          hidden={tab !== 'editor'}
          className="h-full"
        >
          <EditorPane key={locale} source={source} />
          <p className="absolute right-4 bottom-3 left-4 hidden text-right font-mono text-xs text-muted-foreground md:block">
            {source.hint[0]}
            <kbd className="rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 text-foreground">{source.hint[1]}</kbd>
            {source.hint[2]}
          </p>
        </div>
        <div
          role="tabpanel"
          id="console-panel-terminal"
          aria-labelledby="console-tab-terminal"
          hidden={tab !== 'terminal'}
          className="h-full"
        >
          <Terminal key={locale} ref={terminalRef} locale={locale} />
        </div>
      </div>
    </div>
  );
}
