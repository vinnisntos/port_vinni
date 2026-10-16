import { useState } from 'react';
import { ArrowsClockwise, Buildings, Check, Copy, ShieldCheck } from '@phosphor-icons/react';
import Card from '../../components/site/GlassCard';
import Input from '../../components/site/Field';
import { Button } from '@/components/ui/button';
import PageHeader from '../../components/site/PageHeader';
import Seo from '../../components/Seo';
import { toolSchema } from '../../utils/seo';
import { generateCNPJ } from '../../utils/generators';
import { isValidCNPJ } from '../../utils/validators';

export default function CNPJGenerator() {
  const [cnpj, setCnpj] = useState('');
  const [validation, setValidation] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newCnpj = generateCNPJ(true);
    setCnpj(newCnpj);
    setValidation(null);
    setCopied(false);
  };

  const handleValidate = () => {
    if (!cnpj) {
      setValidation({ valid: false, message: 'Digite um CNPJ para validar' });
      return;
    }
    const valid = isValidCNPJ(cnpj);
    setValidation({
      valid,
      message: valid ? 'CNPJ válido!' : 'CNPJ inválido.',
    });
  };

  const handleCopy = async () => {
    if (cnpj) {
      await navigator.clipboard.writeText(cnpj.replace(/[^\d]/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="stagger-in max-w-3xl pt-36 md:pt-44">
      <Seo
        title="Gerador e Validador de CNPJ Online e Grátis · Vinnicius Santos"
        description="Gere CNPJs válidos para testes ou valide um CNPJ existente usando o algoritmo oficial da Receita Federal, direto no navegador."
        path="/tools/cnpj"
        structuredData={toolSchema({
          name: 'CNPJ Generator',
          description: 'Gera e valida CNPJs com algoritmo oficial.',
          path: '/tools/cnpj',
          breadcrumbItems: [
            { name: 'Início', path: '/' },
            { name: 'Ferramentas', path: '/tools' },
            { name: 'CNPJ Generator', path: '/tools/cnpj' },
          ],
        })}
      />
      <PageHeader
        title="Gerador de CNPJ"
        accent="e validador"
        description="Gera e valida CNPJs utilizando o algoritmo oficial da Receita Federal."
      />

      <Card>
        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-sm font-medium text-muted-foreground">
              Gerar CNPJ
            </label>
            <Button
              onClick={handleGenerate}
              variant="primary"
              className="inline-flex items-center gap-2"
            >
              <ArrowsClockwise aria-hidden="true" /> Gerar CNPJ
            </Button>
          </div>

          {cnpj && (
            <div className="glass-inset rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">
                  CNPJ Gerado
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-muted-foreground hover:text-primary transition-colors p-1"
                  aria-label="Copiar CNPJ"
                >
                  {copied ? (
                    <Check className="text-primary" />
                  ) : (
                    <Copy />
                  )}
                </button>
              </div>
              <p className="text-xl font-mono text-foreground tracking-wider">
                {cnpj}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                CNPJ formatado com matriz (0001) e dígitos verificadores válidos
              </p>
            </div>
          )}

          <div className="pt-4">
            <Input
              label="Validar CNPJ"
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChange={(e) => {
                setCnpj(e.target.value);
                setValidation(null);
              }}
              icon={<ShieldCheck />}
            />
            <div className="mt-3">
              <Button onClick={handleValidate} variant="secondary">
                Validar CNPJ
              </Button>
            </div>
          </div>

          {validation && (
            <div
              role="status"
              className={`p-4 border rounded-xl flex items-center gap-3 ${
                validation.valid
                  ? 'bg-primary/[0.08] border-primary/30 text-primary'
                  : 'bg-destructive/[0.08] border-destructive/30 text-destructive'
              }`}
            >
              {validation.valid ? (
                <Check className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              ) : (
                <Buildings
                  className="w-5 h-5 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
              <span className="text-sm font-medium">{validation.message}</span>
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          Sobre o algoritmo
        </h2>
        <ul className="grid max-w-[60ch] gap-3 text-base leading-relaxed text-foreground/80">
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Utiliza o algoritmo oficial de dígitos verificadores da Receita
            Federal
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Gera CNPJs com matriz 0001 (padrão para novas empresas)
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            CNPJs gerados são matematicamente válidos, mas não cadastrados
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Ideal para testes de software e ambientes de desenvolvimento
          </li>
        </ul>
      </Card>
    </div>
  );
}