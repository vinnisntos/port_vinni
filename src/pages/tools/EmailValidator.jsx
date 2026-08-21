import { useState } from 'react';
import { FaEnvelope, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
import Seo from '../../components/Seo';
import { toolSchema } from '../../utils/seo';
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
        : 'E-mail inválido. Verifique o formato.',
    });
  };

  const handleClear = () => {
    setEmail('');
    setResult(null);
  };

  return (
    <div className="pt-24 pb-12 max-w-3xl mx-auto">
      <Seo
        title="Validador de E-mail Online e Grátis · Vinnicius Santos"
        description="Valide o formato e o domínio de qualquer e-mail gratuitamente, direto no navegador, sem enviar dados para servidores."
        path="/tools/email-validator"
        structuredData={toolSchema({
          name: 'Email Validator',
          description: 'Validação de e-mails com verificação de formato e domínio.',
          path: '/tools/email-validator',
          breadcrumbItems: [
            { name: 'Início', path: '/' },
            { name: 'Ferramentas', path: '/tools' },
            { name: 'Email Validator', path: '/tools/email-validator' },
          ],
        })}
      />
      <PageHeader
        tag="[ validador // email ]"
        title="EMAIL"
        accent="VALIDATOR"
        description="Validação de formato de e-mail com verificação de sintaxe e domínio."
      />

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

          {result && (
            <div
              role="status"
              className={`p-4 border rounded-lg flex items-center gap-3 ${
                result.valid
                  ? 'bg-green-500/5 border-green-500/30 text-green-400'
                  : 'bg-red-500/5 border-red-500/30 text-red-400'
              }`}
            >
              {result.valid ? (
                <FaCheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              ) : (
                <FaTimesCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              )}
              <span className="font-mono text-sm">{result.message}</span>
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-purple-500" aria-hidden="true">//</span>
          Como funciona
        </h3>
        <ul className="space-y-2 text-muted text-sm list-none">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1" aria-hidden="true">•</span>
            Verifica o formato geral do e-mail (nome@dominio.com)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1" aria-hidden="true">•</span>
            Valida se há pelo menos um ponto no domínio
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1" aria-hidden="true">•</span>
            Verifica se o tamanho total não excede 254 caracteres
          </li>
        </ul>
      </Card>
    </div>
  );
}