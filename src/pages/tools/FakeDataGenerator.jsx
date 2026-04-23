import React, { useState } from 'react';
import { FaUser, FaSync, FaCopy, FaCheck, FaIdCard, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { generateFakePerson } from '../../utils/generators';

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

  const Field = ({ icon: Icon, label, value, field }) => (
    <div className="p-3 bg-white/5 rounded-lg">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-gray-500 uppercase flex items-center gap-2">
          <Icon className="text-purple-500 w-3 h-3" /> {label}
        </span>
        {value && (
          <button
            onClick={() => handleCopy(field, value)}
            className="text-gray-400 hover:text-purple-400 transition-colors"
          >
            {copiedField === field ? <FaCheck className="text-green-400 w-3 h-3" /> : <FaCopy className="w-3 h-3" />}
          </button>
        )}
      </div>
      <p className="text-white text-sm font-mono">{value || '—'}</p>
    </div>
  );

  return (
    <div className="pt-24 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block px-3 py-1 mb-4 border border-purple-500/30 bg-purple-500/5 text-purple-400 font-mono text-[10px] tracking-widest uppercase">
          [ gerador // dados fake ]
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          FAKE <span className="text-purple-500">DATA</span>
        </h1>
        <p className="text-gray-400">
          Gera dados completos e realistas para testes de software e desenvolvimento.
        </p>
      </div>

      {/* Generator Card */}
      <Card>
        <div className="space-y-6">
          {/* Generate Button */}
          <div className="flex gap-3">
            <Button onClick={handleGenerate} variant="primary" className="flex items-center gap-2">
              <FaSync /> Gerar Dados
            </Button>
            {data && (
              <Button onClick={handleCopyAll} variant="secondary" className="flex items-center gap-2">
                {copiedField === 'all' ? <FaCheck className="text-green-400" /> : <FaCopy />}
                Copiar Tudo
              </Button>
            )}
          </div>

          {/* Generated Data */}
          {data && (
            <div className="space-y-4">
              {/* Name */}
              <div className="p-4 bg-purple-500/5 border border-purple-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaUser className="text-purple-500" />
                  <span className="text-[10px] font-mono text-purple-400 uppercase">Perfil Gerado</span>
                </div>
                <p className="text-xl text-white font-semibold">{data.name}</p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field icon={FaEnvelope} label="E-mail" value={data.email} field="email" />
                <Field icon={FaIdCard} label="CPF" value={data.cpf} field="cpf" />
                <Field icon={FaPhone} label="Telefone" value={data.phone} field="phone" />
                <Field icon={FaMapMarkerAlt} label="CEP" value={data.cep} field="cep" />
                <Field icon={FaMapMarkerAlt} label="Endereço" value={data.address} field="address" />
                <Field icon={FaIdCard} label="Nascimento" value={data.birthDate} field="birthDate" />
              </div>
            </div>
          )}

          {!data && (
            <div className="text-center py-12">
              <FaUser className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">
                Clique em "Gerar Dados" para criar um perfil completo
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Info Section */}
      <Card className="mt-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-purple-500">//</span>
          Casos de uso
        </h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Preencher formulários de teste durante desenvolvimento
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Popular bancos de dados de ambiente de staging
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Testar validações de formulário e máscaras de input
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            Demonstrações e apresentações de funcionalidades
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <strong>Atenção:</strong> Dados são fictícios, não use em produção
          </li>
        </ul>
      </Card>
    </div>
  );
}
