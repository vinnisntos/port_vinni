import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaCopy, FaCheck } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
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
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block px-3 py-1 mb-4 border border-purple-500/30 bg-purple-500/5 text-purple-400 font-mono text-[10px] tracking-widest uppercase">
          [ busca // cep ]
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          CEP <span className="text-purple-500">FINDER</span>
        </h1>
        <p className="text-gray-400">
          Busca endereços completos através do CEP utilizando a API ViaCEP.
        </p>
      </div>

      {/* Finder Card */}
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

          {/* Address Result */}
          {address && (
            <div className="p-4 bg-purple-500/5 border border-purple-500/30 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-purple-400 uppercase flex items-center gap-2">
                  <FaMapMarkerAlt /> Endereço Encontrado
                </span>
                <button
                  onClick={handleCopyAddress}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-xs flex items-center gap-1"
                >
                  {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
                  {copied ? 'Copiado' : 'Copiar'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase">Logradouro</span>
                  <p className="text-white">{address.logradouro || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase">Bairro</span>
                  <p className="text-white">{address.bairro || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase">Cidade</span>
                  <p className="text-white">{address.localidade || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase">UF</span>
                  <p className="text-white">{address.uf || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase">Complemento</span>
                  <p className="text-white">{address.complemento || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase">DDD</span>
                  <p className="text-white">{address.ddd || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Info Section */}
      <Card className="mt-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-purple-500">//</span>
          Sobre a API
        </h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Utiliza a API pública ViaCEP (gratuita, sem necessidade de cadastro)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Dados oficiais dos Correios do Brasil
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Não armazena ou registra buscas realizadas
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            CEP deve conter exatamente 8 dígitos
          </li>
        </ul>
      </Card>
    </div>
  );
}
