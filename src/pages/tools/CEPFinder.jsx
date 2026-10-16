import { useState } from 'react';
import { Check, Copy, MagnifyingGlass, MapPin } from '@phosphor-icons/react';
import Card from '../../components/site/GlassCard';
import Input from '../../components/site/Field';
import { Button } from '@/components/ui/button';
import PageHeader from '../../components/site/PageHeader';
import Seo from '../../components/Seo';
import { toolSchema } from '../../utils/seo';
import { fetchCEP } from '../../utils/api';
import { formatCEP } from '../../utils/validators';

export default function CEPFinder() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSearch = async () => {
    if (!cep) {
      setError('Digite um CEP para buscar');
      return;
    }
    setLoading(true);
    setError(null);
    setAddress(null);

    try {
      const data = await fetchCEP(cep);
      setAddress(data);
    } catch (err) {
      setError(err.message || 'Erro ao buscar CEP');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAddress = async () => {
    if (address) {
      const fullAddress = `${address.logradouro}, ${address.bairro} - ${address.localidade}/${address.uf}`;
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setCep('');
    setAddress(null);
    setError(null);
  };

  return (
    <div className="stagger-in max-w-3xl pt-36 md:pt-44">
      <Seo
        title="Buscador de CEP Online e Grátis · Vinnicius Santos"
        description="Encontre o endereço completo a partir de um CEP usando a API ViaCEP, direto no navegador e sem cadastro."
        path="/tools/cep"
        structuredData={toolSchema({
          name: 'CEP Finder',
          description: 'Busca endereços por CEP via ViaCEP API.',
          path: '/tools/cep',
          breadcrumbItems: [
            { name: 'Início', path: '/' },
            { name: 'Ferramentas', path: '/tools' },
            { name: 'CEP Finder', path: '/tools/cep' },
          ],
        })}
      />
      <PageHeader
        title="Busca de"
        accent="CEP"
        description="Busca endereços completos através do CEP utilizando a API ViaCEP."
      />

      <Card>
        <div className="space-y-6">
          <Input
            label="CEP para buscar"
            placeholder="00000-000"
            value={cep}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, '').slice(0, 8);
              setCep(formatCEP(value));
              setError(null);
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            icon={<MagnifyingGlass />}
            error={error}
          />

          <div className="flex gap-3">
            <Button onClick={handleSearch} variant="primary" disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar Endereço'}
            </Button>
            <Button onClick={handleClear} variant="ghost">
              Limpar
            </Button>
          </div>

          {address && (
            <div className="glass-inset rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-primary flex items-center gap-2">
                  <MapPin aria-hidden="true" /> Endereço Encontrado
                </span>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="text-muted-foreground hover:text-primary transition-colors text-xs flex items-center gap-1 p-1"
                  aria-label="Copiar endereço completo"
                >
                  {copied ? (
                    <>
                      <Check className="text-primary" aria-hidden="true" /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy aria-hidden="true" /> Copiar
                    </>
                  )}
                </button>
              </div>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-sm text-muted-foreground">Logradouro</dt>
                  <dd className="text-foreground">{address.logradouro || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Bairro</dt>
                  <dd className="text-foreground">{address.bairro || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Cidade</dt>
                  <dd className="text-foreground">{address.localidade || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">UF</dt>
                  <dd className="text-foreground">{address.uf || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Complemento</dt>
                  <dd className="text-foreground">{address.complemento || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">DDD</dt>
                  <dd className="text-foreground">{address.ddd || 'N/A'}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          Sobre a API
        </h2>
        <ul className="grid max-w-[60ch] gap-3 text-base leading-relaxed text-foreground/80">
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Utiliza a API pública ViaCEP (gratuita, sem necessidade de cadastro)
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Dados oficiais dos Correios do Brasil
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            Não armazena ou registra buscas realizadas
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-primary/70" aria-hidden="true" />
            CEP deve conter exatamente 8 dígitos
          </li>
        </ul>
      </Card>
    </div>
  );
}