import { useState } from 'react';
import { CheckCircle, Envelope, XCircle } from '@phosphor-icons/react';
import Card from '../../components/site/GlassCard';
import Input from '../../components/site/Field';
import { Button } from '@/components/ui/button';
import PageHeader from '../../components/site/PageHeader';
import Seo from '../../components/Seo';
import { toolSchema } from '../../utils/seo';
import { isValidEmail } from '../../utils/validators';

export default function EmailValidator() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);

  const handleValidate = () => {
    if (!email) {
      setResult({ valid: false, message: 'Digite um e-mail para validar' });
      return;
    }
    const valid = isValidEmail(email);
    setResult({
      valid,
      message: valid
        ? 'E-mail válido!'
        : 'E-mail inválido. Verifique o formato.',
    });
  };

  const handleClear = () => {
    setEmail('');
    setResult(null);
  };

  return (
    <div className="stagger-in max-w-3xl pt-36 md:pt-44">
      <Seo
        title="Validador de E-mail Online e Grátis · Vinnicius Santos"
        description="Valide o formato e o domínio de qualquer e-mail gratuitamente, direto no navegador, sem enviar dados para servidores."
        path="/tools/email-validator"
        structuredData={toolSchema({
          name: 'Email Validator',
          description: 'Validação de e-mails com verificação de formato e domínio.',
          path: '/tools/email-validator',
          breadcrumbItems: [
            { name: 'Início', path: '/' },
            { name: 'Ferramentas', path: '/tools' },
            { name: 'Email Validator', path: '/tools/email-validator' },
          ],
        })}
      />
      <PageHeader
        title="Validador de"
        accent="e-mail"
        description="Validação de formato de e-mail com verificação de sintaxe e domínio."
      />

      <Card>
        <div className="space-y-6">
          <Input
            label="E-mail para validar"
            type="email"
            placeholder="exemplo@dominio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
            icon={<Envelope />}
          />

          <div className="flex gap-3">
            <Button onClick={handleValidate} variant="primary">
              Validar
            </Button>
            <Button onClick={handleClear} variant="ghost">
              Limpar
            </Button>
          </div>

          {result && (
            <div
              role="status"
              className={`p-4 border rounded-xl flex items-center gap-3 ${
                result.valid
                  ? 'bg-primary/[0.08] border-primary/30 text-primary'
                  : 'bg-destructive/[0.08] border-destructive/30 text-destructive'
              }`}
            >
              {result.valid ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              ) : (
                <XCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              )}
              <span className="text-sm font-medium">{result.message}</span>
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          Como funciona
        </h2>
        <ul className="grid max-w-[60ch] gap-3 text-base leading-relaxed text-foreground/80">
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Verifica o formato geral do e-mail (nome@dominio.com)
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Valida se há pelo menos um ponto no domínio
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Verifica se o tamanho total não excede 254 caracteres
          </li>
        </ul>
      </Card>
    </div>
  );
}