import React, { useState } from 'react';
import { FaIdCard, FaCopy, FaCheck, FaSync, FaShieldAlt } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { generateCPF } from '../../utils/generators';
import { isValidCPF, formatCPF } from '../../utils/validators';

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
    setValidation({
      valid,
      message: valid ? 'CPF válido!' : 'CPF inválido.'
    });
  };

  const handleCopy = async () => {
    if (cpf) {
      await navigator.clipboard.writeText(cpf.replace(/[^\d]/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pt-24 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block px-3 py-1 mb-4 border border-purple-500/30 bg-purple-500/5 text-purple-400 font-mono text-[10px] tracking-widest uppercase">
          [ gerador // cpf ]
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          CPF <span className="text-purple-500">GENERATOR</span>
        </h1>
        <p className="text-gray-400">
          Gera e valida CPFs utilizando o algoritmo oficial da Receita Federal.
        </p>
      </div>

      {/* Generator Card */}
      <Card>
        <div className="space-y-6">
          {/* Generate Section */}
          <div>
            <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
              Gerar CPF
            </label>
            <div className="flex gap-3">
              <Button onClick={handleGenerate} variant="primary" className="flex items-center gap-2">
                <FaSync /> Gerar CPF
              </Button>
            </div>
          </div>

          {/* Display & Copy */}
          {cpf && (
            <div className="p-4 bg-purple-500/5 border border-purple-500/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-purple-400 uppercase">CPF Gerado</span>
                <button
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  title="Copiar CPF"
                >
                  {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
                </button>
              </div>
              <p className="text-2xl font-mono text-white tracking-wider">{cpf}</p>
              <p className="text-[10px] text-gray-500 mt-2">
                CPF formatado com dígitos verificadores válidos
              </p>
            </div>
          )}

          {/* Validate Section */}
          <div className="pt-6 border-t border-white/5">
            <Input
              label="Validar CPF"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => {
                setCpf(e.target.value);
                setValidation(null);
              }}
              icon={<FaShieldAlt />}
            />
            <div className="flex gap-3 mt-3">
              <Button onClick={handleValidate} variant="secondary">
                Validar CPF
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
                <FaIdCard className="w-5 h-5 flex-shrink-0" />
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
            CPFs gerados são matematicamente válidos, mas não cadastrados
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Ideal para testes de software e ambientes de desenvolvimento
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Não armazena ou envia dados para servidores externos
          </li>
        </ul>
      </Card>
    </div>
  );
}
