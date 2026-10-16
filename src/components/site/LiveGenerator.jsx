import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'motion/react';
import { ArrowRight, Check, Copy, ArrowsClockwise, SealCheck } from '@phosphor-icons/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { generateCPF, generateCNPJ } from '../../utils/generators';
import { isValidCPF, isValidCNPJ } from '../../utils/validators';
import GlassCard from './GlassCard';

const DOCS = {
  cpf: { label: 'CPF', generate: generateCPF, validate: isValidCPF, path: '/tools/cpf' },
  cnpj: { label: 'CNPJ', generate: generateCNPJ, validate: isValidCNPJ, path: '/tools/cnpj' },
};

function DocPanel({ kind, t }) {
  const doc = DOCS[kind];
  const [value, setValue] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setValue(doc.generate(true));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value.replace(/\D/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="glass-inset flex min-h-[7.5rem] flex-col justify-center rounded-xl px-5 py-4">
        <AnimatePresence mode="wait" initial={false}>
          {value ? (
            <m.div
              key={value}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <output
                aria-live="polite"
                className="block font-mono text-[clamp(1.5rem,4vw,2.1rem)] font-medium tracking-tight text-foreground tabular-nums"
              >
                {value}
              </output>
              {doc.validate(value) && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-primary">
                  <SealCheck className="size-4" weight="fill" aria-hidden="true" />
                  {t.valid}
                </p>
              )}
            </m.div>
          ) : (
            <m.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-base leading-relaxed text-muted-foreground"
            >
              {t.empty}
            </m.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleGenerate}>
          <ArrowsClockwise weight="bold" aria-hidden="true" />
          {t.generate} {doc.label}
        </Button>
        <Button variant="secondary" onClick={handleCopy} disabled={!value}>
          {copied ? <Check weight="bold" aria-hidden="true" /> : <Copy weight="bold" aria-hidden="true" />}
          {copied ? t.copied : t.copy}
        </Button>
        <Link
          to={doc.path}
          className="group ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {t.open}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" weight="bold" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

/** O "elemento vivo" da home: gera CPF/CNPJ válidos ali mesmo, com as funções reais das ferramentas. */
export default function LiveGenerator({ t }) {
  return (
    <GlassCard spotlight className="p-5 md:p-7">
      <Tabs defaultValue="cpf">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight">{t.title}</h3>
          <TabsList aria-label={t.title}>
            <TabsTrigger value="cpf">CPF</TabsTrigger>
            <TabsTrigger value="cnpj">CNPJ</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="cpf">
          <DocPanel kind="cpf" t={t} />
        </TabsContent>
        <TabsContent value="cnpj">
          <DocPanel kind="cnpj" t={t} />
        </TabsContent>
      </Tabs>
    </GlassCard>
  );
}
