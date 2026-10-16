import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn, slugify } from '@/lib/utils';
import { BUILD } from '@/lib/build';
import { emit } from '@/lib/events';
import { EGGS, foundEggs, unlock } from '@/lib/eggs';
import { downloadResume, openExternal, GITHUB, LINKEDIN } from '@/lib/actions';
import { terminalContent } from '../../content/terminal';
import { projectsContent } from '../../content/projects';
import { getLocalizedPath } from '../../hooks/useLocale';

const PROMPT_USER = 'vinni@portfolio';

const TONES = {
  cmd: 'text-primary',
  ok: 'text-[var(--syntax-string)]',
  err: 'text-destructive',
  dim: 'text-[var(--syntax-comment)]',
  key: 'text-[var(--syntax-number)]',
};

// Uma linha de saída é uma lista de partes: string ou { text, to | href, tone }.
function Part({ part }) {
  if (typeof part === 'string') return part;
  const className = cn(TONES[part.tone], (part.to || part.href) && 'underline decoration-primary/40 underline-offset-4 hover:text-primary');
  if (part.to) return <Link to={part.to} className={className}>{part.text}</Link>;
  if (part.href) {
    return (
      <a href={part.href} target="_blank" rel="noopener noreferrer" className={className}>
        {part.text}
      </a>
    );
  }
  return <span className={className}>{part.text}</span>;
}

const line = (...parts) => ({ parts });
const toLines = (items) => items.map((item) => (Array.isArray(item) ? line(...item) : line(item)));

/**
 * Terminal de verdade (não é um vídeo nem uma imagem): interpreta comandos,
 * navega pelo site, baixa o currículo e esconde alguns easter eggs.
 * Tab completa, ↑/↓ percorrem o histórico.
 */
const Terminal = forwardRef(function Terminal({ locale, className }, ref) {
  const t = terminalContent[locale];
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [lines, setLines] = useState(() => toLines(t.welcome));
  const [value, setValue] = useState('');
  const history = useRef([]);
  const cursor = useRef(-1);
  const inputRef = useRef(null);
  const screenRef = useRef(null);
  const en = locale === 'en';

  useImperativeHandle(ref, () => ({ focus: () => inputRef.current?.focus({ preventScroll: true }) }));

  // mantém a última linha visível rolando só o terminal, nunca a página
  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const projects = projectsContent[locale].projects;
  const path = (key) => ({ projects: en ? '/en/projects' : '/projects', tools: '/tools', about: en ? '/en/about' : '/about', home: en ? '/en' : '/' })[key];

  const COMMANDS = [
    'help', 'whoami', en ? 'projects' : 'projetos', en ? 'open' : 'abrir', 'stack', en ? 'contact' : 'contato',
    'cv', 'ls', 'cd', 'cat', 'git log', 'lang', en ? 'achievements' : 'conquistas', 'clear', 'sudo', 'date', 'echo',
  ];

  function run(raw) {
    const input = raw.trim();
    const [cmd = '', ...args] = input.split(/\s+/);
    const arg = args.join(' ').toLowerCase();
    const c = cmd.toLowerCase();

    if (!input) return [];
    if (c === 'clear' || c === 'cls') return 'clear';

    if (c === 'help' || c === '?' || c === 'ajuda') {
      return [
        line(t.help.title),
        ...t.help.rows.map(([name, desc]) => line({ text: name.padEnd(18, ' '), tone: 'cmd' }, { text: desc, tone: 'dim' })),
        line({ text: t.help.footer, tone: 'dim' }),
      ];
    }

    if (c === 'whoami') return toLines(t.whoami);

    if (c === 'projetos' || c === 'projects' || (c === 'ls' && /^(projetos|projects)\/?$/.test(arg))) {
      return [
        line(t.projectsTitle),
        ...projects.map((p) =>
          line({ text: slugify(p.name).padEnd(22, ' '), tone: 'cmd', to: `${path('projects')}#${slugify(p.name)}` }, { text: p.status, tone: 'dim' })
        ),
      ];
    }

    if (c === 'abrir' || c === 'open') {
      if (!arg) return [line({ text: t.openUsage, tone: 'dim' })];
      const target = projects.find((p) => slugify(p.name).startsWith(slugify(arg)));
      if (!target) return [line({ text: t.openNotFound(arg), tone: 'err' })];
      setTimeout(() => navigate(`${path('projects')}#${slugify(target.name)}`), 450);
      return [line({ text: t.opening(target.name), tone: 'ok' })];
    }

    if (c === 'stack') return t.stack.map(([k, v]) => line({ text: `${k}:`.padEnd(12, ' '), tone: 'key' }, v));

    if (c === 'contato' || c === 'contact') {
      return [
        line(t.contact),
        line({ text: 'linkedin  ', tone: 'key' }, { text: 'linkedin.com/in/vinnisantos', href: LINKEDIN }),
        line({ text: 'github    ', tone: 'key' }, { text: 'github.com/vinnisntos', href: GITHUB }),
      ];
    }

    if (c === 'cv' || c === 'curriculo' || c === 'resume') {
      downloadResume(locale);
      return [line({ text: t.cv, tone: 'ok' })];
    }

    if (c === 'ls' || c === 'dir') return [line(...t.ls.flatMap((item) => [{ text: item, tone: item.endsWith('/') ? 'cmd' : undefined }, '   ']))];

    if (c === 'cd') {
      if (!arg) return [line({ text: t.cdUsage, tone: 'dim' })];
      if (arg === '~' || arg === '/' || arg === '..') {
        navigate(path('home'));
        return [];
      }
      const dir = t.dirs[arg.replace(/\/$/, '')];
      if (!dir) return [line({ text: t.cdNotFound(arg), tone: 'err' })];
      navigate(path(dir));
      return [];
    }

    if (c === 'cat') {
      if (/^(sobre|about)(\.md)?$/.test(arg)) return [line(t.catAbout)];
      return [line({ text: t.catUsage, tone: 'dim' })];
    }

    if (c === 'git') {
      if (args[0] !== 'log') return [line({ text: 'git: tente "git log"', tone: 'dim' })];
      if (!BUILD.log.length) return [line({ text: t.gitLogEmpty, tone: 'dim' })];
      return BUILD.log.map((entry) => line({ text: `${entry.hash} `, tone: 'key' }, entry.subject));
    }

    if (c === 'lang') {
      if (arg !== 'en' && arg !== 'pt') return [line({ text: t.langUsage, tone: 'dim' })];
      setTimeout(() => navigate(getLocalizedPath(pathname, arg)), 350);
      return [line({ text: t.lang, tone: 'ok' })];
    }

    if (c === 'conquistas' || c === 'achievements') {
      const found = foundEggs();
      const total = Object.keys(EGGS).length;
      return [
        line(t.eggsTitle(found.length, total)),
        ...Object.entries(EGGS).map(([id, egg]) =>
          line({ text: found.includes(id) ? '[x] ' : '[ ] ', tone: found.includes(id) ? 'ok' : 'dim' }, found.includes(id) ? egg[locale] : '???')
        ),
        ...(found.length < total ? [line({ text: t.eggsHint, tone: 'dim' })] : []),
      ];
    }

    // ---- escondidos ----
    if (c === 'sudo') {
      if (t.hireWords.some((w) => arg.includes(w))) {
        unlock('sudo', locale);
        setTimeout(() => openExternal(LINKEDIN), 600);
        return [line({ text: t.sudoHire, tone: 'ok' })];
      }
      if (/^rm\s+-rf/.test(arg)) return run(arg);
      return [line({ text: t.sudo, tone: 'err' }), line({ text: t.sudoHint, tone: 'dim' })];
    }
    if (c === 'rm' && /-rf|-fr/.test(arg)) {
      unlock('rmrf', locale);
      return [line({ text: t.rmrf[0], tone: 'err' }), line(t.rmrf[1])];
    }
    if (c === 'coffee' || c === 'cafe' || c === 'café') {
      unlock('teapot', locale);
      return [line({ text: t.teapot, tone: 'key' })];
    }
    if (c === 'matrix') {
      emit('matrix:start');
      return [line({ text: t.matrix, tone: 'ok' })];
    }
    if (c === 'konami') return [line({ text: t.konami, tone: 'key' })];
    if (c === 'exit' || c === 'quit') return [line(t.exit)];
    if (c === 'vim' || c === 'vi' || c === 'nano') return [line(t.vim)];
    if (c === 'ping') return [line(t.ping)];
    if (c === 'date') return [line(t.date())];
    if (c === 'echo') return [line(args.join(' '))];

    return [line({ text: t.notFound(cmd), tone: 'err' })];
  }

  const submit = (event) => {
    event.preventDefault();
    const input = value;
    if (input.trim()) history.current = [input, ...history.current].slice(0, 50);
    cursor.current = -1;
    setValue('');
    const out = run(input);
    if (out === 'clear') {
      setLines([]);
      return;
    }
    setLines((prev) => [...prev, { prompt: true, parts: [input] }, ...out].slice(-200));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      cursor.current = Math.min(cursor.current + 1, history.current.length - 1);
      if (history.current[cursor.current] !== undefined) setValue(history.current[cursor.current]);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      cursor.current = Math.max(cursor.current - 1, -1);
      setValue(cursor.current === -1 ? '' : history.current[cursor.current]);
    } else if (event.key === 'Tab' && value.trim()) {
      const match = COMMANDS.find((cmd) => cmd.startsWith(value.trim().toLowerCase()));
      if (match) {
        event.preventDefault();
        setValue(`${match} `);
      }
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      ref={screenRef}
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
      className={cn('h-full cursor-text overflow-y-auto px-5 py-4 font-mono text-[13.5px] leading-relaxed text-foreground/90', className)}
      role="log"
      aria-live="polite"
    >
      {lines.map((l, i) => (
        <p key={i} className="break-words whitespace-pre-wrap">
          {l.prompt && <PromptLabel />}
          {l.parts.map((part, j) => (
            <Part key={j} part={part} />
          ))}
        </p>
      ))}
      <form onSubmit={submit} className="flex items-center">
        <PromptLabel />
        <label htmlFor="terminal-input" className="sr-only">
          {en ? 'Terminal command' : 'Comando do terminal'}
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="send"
          className="min-w-0 flex-1 bg-transparent text-foreground caret-primary outline-none"
        />
      </form>
    </div>
  );
});

function PromptLabel() {
  return (
    <span aria-hidden="true" className="shrink-0 whitespace-pre">
      <span className="text-[var(--syntax-string)]">{PROMPT_USER}</span>
      <span className="text-[var(--syntax-punct)]">:</span>
      <span className="text-primary">~</span>
      <span className="text-[var(--syntax-punct)]">$ </span>
    </span>
  );
}

export default Terminal;
