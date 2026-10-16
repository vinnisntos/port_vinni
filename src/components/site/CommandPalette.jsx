import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Bug,
  CodeBlock,
  DownloadSimple,
  FolderOpen,
  GithubLogo,
  House,
  LinkedinLogo,
  Translate,
  TerminalWindow,
  User,
  Wrench,
} from '@phosphor-icons/react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { emit, on } from '@/lib/events';
import { downloadResume, openExternal, GITHUB, LINKEDIN } from '@/lib/actions';
import { paletteContent } from '../../content/terminal';
import { toolsPt, toolsEn } from '../../content/tools';
import { useLocale, getLocalizedPath } from '../../hooks/useLocale';

/**
 * Paleta de comandos (Ctrl+K / ⌘K): navegação por todo o site e ações rápidas,
 * no estilo dos editores de código. Carregada sob demanda pelo
 * CommandPaletteHost, que já a monta aberta no primeiro uso.
 */
export default function CommandPalette({ defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const locale = useLocale();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const t = paletteContent[locale];
  const en = locale === 'en';
  const tools = en ? toolsEn : toolsPt;

  useEffect(() => {
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    const off = on('palette:open', () => setOpen(true));
    return () => {
      window.removeEventListener('keydown', onKey);
      off();
    };
  }, []);

  const run = (fn) => () => {
    setOpen(false);
    // deixa o diálogo fechar antes de navegar/rolar
    setTimeout(fn, 120);
  };

  const home = en ? '/en' : '/';
  const pages = [
    { label: t.pages.home, icon: House, to: home },
    { label: t.pages.projects, icon: FolderOpen, to: en ? '/en/projects' : '/projects' },
    { label: t.pages.tools, icon: Wrench, to: '/tools' },
    { label: t.pages.about, icon: User, to: en ? '/en/about' : '/about' },
  ];

  const openTerminal = () => {
    if (pathname !== home) navigate(home);
    // espera a home montar o console antes de pedir a aba do terminal
    setTimeout(() => {
      document.getElementById('console')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      emit('terminal:open');
    }, pathname === home ? 0 : 400);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title={t.title} description={t.description} closeLabel={t.close}>
      <CommandInput placeholder={t.placeholder} />
      <CommandList>
        <CommandEmpty>{t.empty}</CommandEmpty>

        <CommandGroup heading={t.groups.actions}>
          <CommandItem value={`${t.actions.terminal} terminal shell console`} onSelect={run(openTerminal)}>
            <TerminalWindow weight="duotone" />
            {t.actions.terminal}
            <CommandShortcut>`</CommandShortcut>
          </CommandItem>
          <CommandItem value={`${t.actions.cv} cv resume curriculo`} onSelect={run(() => downloadResume(locale))}>
            <DownloadSimple weight="duotone" />
            {t.actions.cv}
          </CommandItem>
          <CommandItem value={`${t.actions.lang} language idioma`} onSelect={run(() => navigate(getLocalizedPath(pathname, en ? 'pt' : 'en')))}>
            <Translate weight="duotone" />
            {t.actions.lang}
          </CommandItem>
          <CommandItem value={`${t.actions.matrix} matrix`} onSelect={run(() => emit('matrix:start'))}>
            <CodeBlock weight="duotone" />
            {t.actions.matrix}
          </CommandItem>
          <CommandItem value={`${t.actions.debug} debug konami`} onSelect={run(() => emit('debug:toggle'))}>
            <Bug weight="duotone" />
            {t.actions.debug}
            <CommandShortcut>↑↑↓↓←→←→BA</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading={t.groups.pages}>
          {pages.map((page) => (
            <CommandItem key={page.to} value={page.label} onSelect={run(() => navigate(page.to))}>
              <page.icon weight="duotone" />
              {page.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading={t.groups.tools}>
          {tools.map((tool) => (
            <CommandItem key={tool.path} value={`${tool.title} ${tool.description}`} onSelect={run(() => navigate(tool.path))}>
              <tool.icon weight="duotone" />
              {tool.title}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading={t.groups.links}>
          <CommandItem value="GitHub vinnisntos" onSelect={run(() => openExternal(GITHUB))}>
            <GithubLogo weight="duotone" />
            GitHub
          </CommandItem>
          <CommandItem value="LinkedIn vinnisantos" onSelect={run(() => openExternal(LINKEDIN))}>
            <LinkedinLogo weight="duotone" />
            LinkedIn
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
