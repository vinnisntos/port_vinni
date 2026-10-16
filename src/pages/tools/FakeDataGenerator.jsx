import { useState } from 'react';
import { ArrowsClockwise, Check, Copy, Envelope, IdentificationCard, MapPin, Phone, User } from '@phosphor-icons/react';
import Card from '../../components/site/GlassCard';
import { Button } from '@/components/ui/button';
import PageHeader from '../../components/site/PageHeader';
import Seo from '../../components/Seo';
import { toolSchema } from '../../utils/seo';
import { generateFakePerson } from '../../utils/generators';

function Field({ icon: Icon, label, value, field, copiedField, onCopy }) {
  return (
    <div className="p-3 glass-inset rounded-xl">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-muted-foreground flex items-center gap-2">
          <Icon className="text-primary w-3 h-3" aria-hidden="true" /> {label}
        </span>
        {value && (
          <button
            type="button"
            onClick={() => onCopy(field, value)}
            className="text-muted-foreground hover:text-primary transition-colors p-1"
            aria-label={`Copiar ${label}`}
          >
            {copiedField === field ? (
              <Check className="text-primary w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        )}
      </div>
      <p className="text-foreground text-sm font-mono">{value || '-'}</p>
    </div>
  );
}

export default function FakeDataGenerator() {
  const [data, setData] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const handleGenerate = () => {
    const newData = generateFakePerson();
    setData(newData);
    setCopiedField(null);
  };

  const handleCopy = async (field, value) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyAll = async () => {
    if (data) {
      const text = `Nome: ${data.name}
Email: ${data.email}
CPF: ${data.cpf}
Telefone: ${data.phone}
CEP: ${data.cep}
Endereço: ${data.address}
Nascimento: ${data.birthDate}`;
      await navigator.clipboard.writeText(text);
      setCopiedField('all');
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  return (
    <div className="stagger-in max-w-3xl pt-36 md:pt-44">
      <Seo
        title="Gerador de Dados Fake Online e Grátis · Vinnicius Santos"
        description="Gere personas completas para testes: nome, e-mail, CPF, telefone e endereço, direto no navegador e sem cadastro."
        path="/tools/fake-data"
        structuredData={toolSchema({
          name: 'Fake Data Generator',
          description: 'Gera dados completos para testes: nome, email, CPF, endereço.',
          path: '/tools/fake-data',
          breadcrumbItems: [
            { name: 'Início', path: '/' },
            { name: 'Ferramentas', path: '/tools' },
            { name: 'Fake Data Generator', path: '/tools/fake-data' },
          ],
        })}
      />
      <PageHeader
        title="Gerador de"
        accent="dados fake"
        description="Gera dados completos e realistas para testes de software e desenvolvimento."
      />

      <Card>
        <div className="space-y-6">
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={handleGenerate}
              variant="primary"
              className="inline-flex items-center gap-2"
            >
              <ArrowsClockwise aria-hidden="true" /> Gerar Dados
            </Button>
            {data && (
              <Button
                onClick={handleCopyAll}
                variant="secondary"
                className="inline-flex items-center gap-2"
              >
                {copiedField === 'all' ? (
                  <Check className="text-primary" aria-hidden="true" />
                ) : (
                  <Copy aria-hidden="true" />
                )}
                Copiar Tudo
              </Button>
            )}
          </div>

          {data && (
            <div className="space-y-4">
              <div className="glass-inset rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <User className="text-primary" aria-hidden="true" />
                  <span className="text-sm font-medium text-primary">
                    Perfil Gerado
                  </span>
                </div>
                <p className="text-xl text-foreground font-semibold">{data.name}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field icon={Envelope} label="E-mail" value={data.email} field="email" copiedField={copiedField} onCopy={handleCopy} />
                <Field icon={IdentificationCard} label="CPF" value={data.cpf} field="cpf" copiedField={copiedField} onCopy={handleCopy} />
                <Field icon={Phone} label="Telefone" value={data.phone} field="phone" copiedField={copiedField} onCopy={handleCopy} />
                <Field icon={MapPin} label="CEP" value={data.cep} field="cep" copiedField={copiedField} onCopy={handleCopy} />
                <Field icon={MapPin} label="Endereço" value={data.address} field="address" copiedField={copiedField} onCopy={handleCopy} />
                <Field icon={IdentificationCard} label="Nascimento" value={data.birthDate} field="birthDate" copiedField={copiedField} onCopy={handleCopy} />
              </div>
            </div>
          )}

          {!data && (
            <div className="text-center py-12">
              <User
                className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4"
                aria-hidden="true"
              />
              <p className="text-muted-foreground text-sm">
                Clique em &quot;Gerar Dados&quot; para criar um perfil completo
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          Casos de uso
        </h2>
        <ul className="grid max-w-[60ch] gap-3 text-base leading-relaxed text-foreground/80">
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Preencher formulários de teste durante desenvolvimento
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Popular bancos de dados de ambiente de staging
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Testar validações de formulário e máscaras de input
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Demonstrações e apresentações de funcionalidades
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            <strong>Atenção:</strong> Dados são fictícios, não use em produção
          </li>
        </ul>
      </Card>
    </div>
  );
}