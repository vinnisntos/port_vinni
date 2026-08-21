import { useState } from 'react';
import { FaIdCard, FaCopy, FaCheck, FaSync, FaShieldAlt } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
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
    <div className="pt-24 pb-12 max-w-3xl mx-auto">
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
        tag="[ gerador // cpf ]"
        title="CPF"
        accent="GENERATOR"
        description="Gera e valida CPFs utilizando o algoritmo oficial da Receita Federal."
      />

      <Card>
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
              Gerar CPF
            </label>
            <Button
              onClick={handleGenerate}
              variant="primary"
              className="inline-flex items-center gap-2"
            >
              <FaSync aria-hidden="true" /> Gerar CPF
            </Button>
          </div>

          {cpf && (
            <div className="p-4 bg-purple-500/5 border border-purple-500/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-purple-400 uppercase">
                  CPF Gerado
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-purple-400 transition-colors p-1"
                  aria-label="Copiar CPF"
                >
                  {copied ? (
                    <FaCheck className="text-green-400" />
                  ) : (
                    <FaCopy />
                  )}
                </button>
              </div>
              <p className="text-2xl font-mono text-white tracking-wider">
                {cpf}
              </p>
              <p className="text-[10px] text-gray-500 mt-2">
                CPF formatado com dígitos verificadores válidos
              </p>
            </div>
          )}

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
            <div className="mt-3">
              <Button onClick={handleValidate} variant="secondary">
                Validar CPF
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
                <FaIdCard className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
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
            CPFs gerados são matematicamente válidos, mas não cadastrados
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1" aria-hidden="true">•</span>
            Ideal para testes de software e ambientes de desenvolvimento
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1" aria-hidden="true">•</span>
            Não armazena ou envia dados para servidores externos
          </li>
        </ul>
      </Card>
    </div>
  );
}