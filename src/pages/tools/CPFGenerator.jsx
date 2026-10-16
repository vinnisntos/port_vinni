import { useState } from 'react';
import { ArrowsClockwise, Check, Copy, IdentificationCard, ShieldCheck } from '@phosphor-icons/react';
import Card from '../../components/site/GlassCard';
import Input from '../../components/site/Field';
import { Button } from '@/components/ui/button';
import PageHeader from '../../components/site/PageHeader';
import Seo from '../../components/Seo';
import { toolSchema } from '../../utils/seo';
import { generateCPF } from '../../utils/generators';
import { isValidCPF } from '../../utils/validators';

export default function CPFGenerator() {
  const [cpf, setCpf] = useState('');
  const [validation, setValidation] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newCpf = generateCPF(true);
    setCpf(newCpf);
    setValidation(null);
    setCopied(false);
  };

  const handleValidate = () => {
    if (!cpf) {
      setValidation({ valid: false, message: 'Digite um CPF para validar' });
      return;
    }
    const valid = isValidCPF(cpf);
    setValidation({ valid, message: valid ? 'CPF válido!' : 'CPF inválido.' });
  };

  const handleCopy = async () => {
    if (cpf) {
      await navigator.clipboard.writeText(cpf.replace(/[^\d]/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="stagger-in max-w-3xl pt-36 md:pt-44">
      <Seo
        title="Gerador e Validador de CPF Online e Grátis · Vinnicius Santos"
        description="Gere CPFs válidos para testes ou valide um CPF existente usando o algoritmo oficial da Receita Federal, direto no navegador."
        path="/tools/cpf"
        structuredData={toolSchema({
          name: 'CPF Generator',
          description: 'Gera e valida CPFs com algoritmo oficial da Receita.',
          path: '/tools/cpf',
          breadcrumbItems: [
            { name: 'Início', path: '/' },
            { name: 'Ferramentas', path: '/tools' },
            { name: 'CPF Generator', path: '/tools/cpf' },
          ],
        })}
      />
      <PageHeader
        title="Gerador de CPF"
        accent="e validador"
        description="Gera e valida CPFs utilizando o algoritmo oficial da Receita Federal."
      />

      <Card>
        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-sm font-medium text-muted-foreground">
              Gerar CPF
            </label>
            <Button
              onClick={handleGenerate}
              variant="primary"
              className="inline-flex items-center gap-2"
            >
              <ArrowsClockwise aria-hidden="true" /> Gerar CPF
            </Button>
          </div>

          {cpf && (
            <div className="glass-inset rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">
                  CPF Gerado
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-muted-foreground hover:text-primary transition-colors p-1"
                  aria-label="Copiar CPF"
                >
                  {copied ? (
                    <Check className="text-primary" />
                  ) : (
                    <Copy />
                  )}
                </button>
              </div>
              <p className="text-2xl font-mono text-foreground tracking-wider">
                {cpf}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                CPF formatado com dígitos verificadores válidos
              </p>
            </div>
          )}

          <div className="pt-4">
            <Input
              label="Validar CPF"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => {
                setCpf(e.target.value);
                setValidation(null);
              }}
              icon={<ShieldCheck />}
            />
            <div className="mt-3">
              <Button onClick={handleValidate} variant="secondary">
                Validar CPF
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
                <IdentificationCard className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
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
            CPFs gerados são matematicamente válidos, mas não cadastrados
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Ideal para testes de software e ambientes de desenvolvimento
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Não armazena ou envia dados para servidores externos
          </li>
        </ul>
      </Card>
    </div>
  );
}