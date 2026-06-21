import { useState } from 'react';
import { FaBuilding, FaCopy, FaCheck, FaSync, FaShieldAlt } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
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
    <div className="pt-24 pb-12 max-w-3xl mx-auto">
      <PageHeader
        tag="[ gerador // cnpj ]"
        title="CNPJ"
        accent="GENERATOR"
        description="Gera e valida CNPJs utilizando o algoritmo oficial da Receita Federal."
      />

      <Card>
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
              Gerar CNPJ
            </label>
            <Button
              onClick={handleGenerate}
              variant="primary"
              className="inline-flex items-center gap-2"
            >
              <FaSync aria-hidden="true" /> Gerar CNPJ
            </Button>
          </div>

          {cnpj && (
            <div className="p-4 bg-purple-500/5 border border-purple-500/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-purple-400 uppercase">
                  CNPJ Gerado
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-purple-400 transition-colors p-1"
                  aria-label="Copiar CNPJ"
                >
                  {copied ? (
                    <FaCheck className="text-green-400" />
                  ) : (
                    <FaCopy />
                  )}
                </button>
              </div>
              <p className="text-xl font-mono text-white tracking-wider">
                {cnpj}
              </p>
              <p className="text-[10px] text-gray-500 mt-2">
                CNPJ formatado com matriz (0001) e dígitos verificadores válidos
              </p>
            </div>
          )}

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
            <div className="mt-3">
              <Button onClick={handleValidate} variant="secondary">
                Validar CNPJ
              </Button>
            </div>
          </div>

          {validation && (
            <div
              role="status"
              className={`p-4 border rounded-lg flex items-center gap-3 ${
                validation.valid
                  ? 'bg-green-500/5 border-green-500/30 text-green-400'
                  : 'bg-red-500/5 border-red-500/30 text-red-400'
              }`}
            >
              {validation.valid ? (
                <FaCheck className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              ) : (
                <FaBuilding
                  className="w-5 h-5 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
              <span className="font-mono text-sm">{validation.message}</span>
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-purple-500" aria-hidden="true">//</span>
          Sobre o algoritmo
        </h3>
        <ul className="space-y-2 text-muted text-sm list-none">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1" aria-hidden="true">•</span>
            Utiliza o algoritmo oficial de dígitos verificadores da Receita
            Federal
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1" aria-hidden="true">•</span>
            Gera CNPJs com matriz 0001 (padrão para novas empresas)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1" aria-hidden="true">•</span>
            CNPJs gerados são matematicamente válidos, mas não cadastrados
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1" aria-hidden="true">•</span>
            Ideal para testes de software e ambientes de desenvolvimento
          </li>
        </ul>
      </Card>
    </div>
  );
}