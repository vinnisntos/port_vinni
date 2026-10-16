import { useState } from 'react';
import { CheckCircle, DeviceMobile, Phone, XCircle } from '@phosphor-icons/react';
import Card from '../../components/site/GlassCard';
import Input from '../../components/site/Field';
import { Button } from '@/components/ui/button';
import PageHeader from '../../components/site/PageHeader';
import Seo from '../../components/Seo';
import { toolSchema } from '../../utils/seo';
import { isValidPhone, formatPhone } from '../../utils/validators';

export default function PhoneValidator() {
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState(null);

  const handleValidate = () => {
    if (!phone) {
      setResult({ valid: false, message: 'Digite um telefone para validar' });
      return;
    }
    const valid = isValidPhone(phone);
    let type = '';
    if (valid) {
      const clean = phone.replace(/[^\d]/g, '');
      type = clean.length === 11 ? 'Celular' : 'Fixo';
    }
    setResult({
      valid,
      type,
      message: valid
        ? `Telefone ${type} válido!`
        : 'Telefone inválido. Verifique o número.',
    });
  };

  const handleClear = () => {
    setPhone('');
    setResult(null);
  };

  return (
    <div className="stagger-in max-w-3xl pt-36 md:pt-44">
      <Seo
        title="Validador de Telefone Online e Grátis · Vinnicius Santos"
        description="Valide números de celular e telefone fixo do Brasil com formatação automática, direto no navegador."
        path="/tools/phone-validator"
        structuredData={toolSchema({
          name: 'Phone Validator',
          description: 'Valida telefones celulares e fixos do Brasil.',
          path: '/tools/phone-validator',
          breadcrumbItems: [
            { name: 'Início', path: '/' },
            { name: 'Ferramentas', path: '/tools' },
            { name: 'Phone Validator', path: '/tools/phone-validator' },
          ],
        })}
      />
      <PageHeader
        title="Validador de"
        accent="telefone"
        description="Valida números de telefone brasileiros (celulares e fixos)."
      />

      <Card>
        <div className="space-y-6">
          <Input
            label="Telefone para validar"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
              setPhone(formatPhone(value));
              setResult(null);
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
            icon={<Phone />}
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
                <CheckCircle
                  className="w-5 h-5 flex-shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <XCircle
                  className="w-5 h-5 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
              <div>
                <p className="text-sm font-medium">{result.message}</p>
                {result.type && (
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <DeviceMobile aria-hidden="true" /> Tipo: {result.type}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          Regras de validação
        </h2>
        <ul className="grid max-w-[60ch] gap-3 text-base leading-relaxed text-foreground/80">
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            <strong>Celular:</strong> 11 dígitos, começando com 9 após o DDD
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            <strong>Fixo:</strong> 10 dígitos, primeiros dígitos entre 2-5
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            DDD válido: 11 a 99 (todos os DDDs brasileiros)
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Formatação automática no padrão (XX) XXXXX-XXXX
          </li>
        </ul>
      </Card>
    </div>
  );
}