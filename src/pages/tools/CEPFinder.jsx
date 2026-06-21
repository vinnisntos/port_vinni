import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaCopy, FaCheck } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
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
    <div className="pt-24 pb-12 max-w-3xl mx-auto">
      <PageHeader
        tag="[ busca // cep ]"
        title="CEP"
        accent="FINDER"
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
            icon={<FaSearch />}
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
            <div className="p-4 bg-purple-500/5 border border-purple-500/30 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-purple-400 uppercase flex items-center gap-2">
                  <FaMapMarkerAlt aria-hidden="true" /> Endereço Encontrado
                </span>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-xs flex items-center gap-1 p-1"
                  aria-label="Copiar endereço completo"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-green-400" aria-hidden="true" /> Copiado
                    </>
                  ) : (
                    <>
                      <FaCopy aria-hidden="true" /> Copiar
                    </>
                  )}
                </button>
              </div>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[10px] text-gray-500 uppercase">Logradouro</dt>
                  <dd className="text-white">{address.logradouro || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-[10px] text-gray-500 uppercase">Bairro</dt>
                  <dd className="text-white">{address.bairro || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-[10px] text-gray-500 uppercase">Cidade</dt>
                  <dd className="text-white">{address.localidade || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-[10px] text-gray-500 uppercase">UF</dt>
                  <dd className="text-white">{address.uf || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-[10px] text-gray-500 uppercase">Complemento</dt>
                  <dd className="text-white">{address.complemento || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-[10px] text-gray-500 uppercase">DDD</dt>
                  <dd className="text-white">{address.ddd || 'N/A'}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-purple-500" aria-hidden="true">//</span>
          Sobre a API
        </h3>
        <ul className="space-y-2 text-muted text-sm list-none">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1" aria-hidden="true">•</span>
            Utiliza a API pública ViaCEP (gratuita, sem necessidade de cadastro)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1" aria-hidden="true">•</span>
            Dados oficiais dos Correios do Brasil
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1" aria-hidden="true">•</span>
            Não armazena ou registra buscas realizadas
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1" aria-hidden="true">•</span>
            CEP deve conter exatamente 8 dígitos
          </li>
        </ul>
      </Card>
    </div>
  );
}