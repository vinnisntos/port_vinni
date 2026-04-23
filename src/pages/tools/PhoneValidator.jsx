import React, { useState } from 'react';
import { FaPhone, FaCheckCircle, FaTimesCircle, FaMobileAlt } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
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
        : 'Telefone inválido. Verifique o número.'
    });
  };

  const handleClear = () => {
    setPhone('');
    setResult(null);
  };

  return (
    <div className="pt-24 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block px-3 py-1 mb-4 border border-purple-500/30 bg-purple-500/5 text-purple-400 font-mono text-[10px] tracking-widest uppercase">
          [ validador // telefone ]
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          PHONE <span className="text-purple-500">VALIDATOR</span>
        </h1>
        <p className="text-gray-400">
          Valida números de telefone brasileiros (celulares e fixos).
        </p>
      </div>

      {/* Validator Card */}
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
            icon={<FaPhone />}
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
              <div>
                <p className="font-mono text-sm">{result.message}</p>
                {result.type && (
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <FaMobileAlt /> Tipo: {result.type}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Info Section */}
      <Card className="mt-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-purple-500">//</span>
          Regras de validação
        </h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <strong>Celular:</strong> 11 dígitos, começando com 9 após o DDD
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <strong>Fixo:</strong> 10 dígitos, primeiros dígitos entre 2-5
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            DDD válido: 11 a 99 (todos os DDDs brasileiros)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Formatação automática no padrão (XX) XXXXX-XXXX
          </li>
        </ul>
      </Card>
    </div>
  );
}
