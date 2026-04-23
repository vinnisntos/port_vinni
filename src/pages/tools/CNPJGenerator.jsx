import React, { useState } from 'react';
import { FaBuilding, FaCopy, FaCheck, FaSync, FaShieldAlt } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { generateCNPJ } from '../../utils/generators';
import { isValidCNPJ, formatCNPJ } from '../../utils/validators';

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
      message: valid ? 'CNPJ válido!' : 'CNPJ inválido.'
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
    <div className="pt-24 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block px-3 py-1 mb-4 border border-purple-500/30 bg-purple-500/5 text-purple-400 font-mono text-[10px] tracking-widest uppercase">
          [ gerador // cnpj ]
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          CNPJ <span className="text-purple-500">GENERATOR</span>
        </h1>
        <p className="text-gray-400">
          Gera e valida CNPJs utilizando o algoritmo oficial da Receita Federal.
        </p>
      </div>

      {/* Generator Card */}
      <Card>
        <div className="space-y-6">
          {/* Generate Section */}
          <div>
            <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
              Gerar CNPJ
            </label>
            <div className="flex gap-3">
              <Button onClick={handleGenerate} variant="primary" className="flex items-center gap-2">
                <FaSync /> Gerar CNPJ
              </Button>
            </div>
          </div>

          {/* Display & Copy */}
          {cnpj && (
            <div className="p-4 bg-purple-500/5 border border-purple-500/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-purple-400 uppercase">CNPJ Gerado</span>
                <button
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  title="Copiar CNPJ"
                >
                  {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
                </button>
              </div>
              <p className="text-xl font-mono text-white tracking-wider">{cnpj}</p>
              <p className="text-[10px] text-gray-500 mt-2">
                CNPJ formatado com matriz (0001) e dígitos verificadores válidos
              </p>
            </div>
          )}

          {/* Validate Section */}
          <div className="pt-6 border-t border-white/5">
            <Input
              label="Validar CNPJ"
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChange={(e) => {
                setCnpj(e.target.value);
                setValidation(null);
              }}
              icon={<FaShieldAlt />}
            />
            <div className="flex gap-3 mt-3">
              <Button onClick={handleValidate} variant="secondary">
                Validar CNPJ
              </Button>
            </div>
          </div>

          {/* Validation Result */}
          {validation && (
            <div
              className={`
                p-4 border rounded-lg flex items-center gap-3
                ${validation.valid
                  ? 'bg-green-500/5 border-green-500/30 text-green-400'
                  : 'bg-red-500/5 border-red-500/30 text-red-400'
                }
              `}
            >
              {validation.valid ? (
                <FaCheck className="w-5 h-5 flex-shrink-0" />
              ) : (
                <FaBuilding className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="font-mono text-sm">{validation.message}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Info Section */}
      <Card className="mt-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-purple-500">//</span>
          Sobre o algoritmo
        </h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Utiliza o algoritmo oficial de dígitos verificadores da Receita Federal
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Gera CNPJs com matriz 0001 (padrão para novas empresas)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            CNPJs gerados são matematicamente válidos, mas não cadastrados
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Ideal para testes de software e ambientes de desenvolvimento
          </li>
        </ul>
      </Card>
    </div>
  );
}
