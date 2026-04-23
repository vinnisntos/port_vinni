import React, { useState } from 'react';
import { FaEnvelope, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
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
        : 'E-mail inválido. Verifique o formato.'
    });
  };

  const handleClear = () => {
    setEmail('');
    setResult(null);
  };

  return (
    <div className="pt-24 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block px-3 py-1 mb-4 border border-purple-500/30 bg-purple-500/5 text-purple-400 font-mono text-[10px] tracking-widest uppercase">
          [ validador // email ]
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          EMAIL <span className="text-purple-500">VALIDATOR</span>
        </h1>
        <p className="text-gray-400">
          Validação de formato de e-mail com verificação de sintaxe e domínio.
        </p>
      </div>

      {/* Validator Card */}
      <Card>
        <div className="space-y-6">
          <Input
            label="E-mail para validar"
            type="email"
            placeholder="exemplo@dominio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
            icon={<FaEnvelope />}
          />

          <div className="flex gap-3">
            <Button onClick={handleValidate} variant="primary">
              Validar
            </Button>
            <Button onClick={handleClear} variant="ghost">
              Limpar
            </Button>
          </div>

          {/* Result */}
          {result && (
            <div
              className={`
                p-4 border rounded-lg flex items-center gap-3
                ${result.valid
                  ? 'bg-green-500/5 border-green-500/30 text-green-400'
                  : 'bg-red-500/5 border-red-500/30 text-red-400'
                }
              `}
            >
              {result.valid ? (
                <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <FaTimesCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="font-mono text-sm">{result.message}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Info Section */}
      <Card className="mt-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-purple-500">//</span>
          Como funciona
        </h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Verifica o formato geral do e-mail (nome@dominio.com)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Valida se há pelo menos um ponto no domínio
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Verifica se o tamanho total não excede 254 caracteres
          </li>
        </ul>
      </Card>
    </div>
  );
}
