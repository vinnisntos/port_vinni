import {
  At,
  Buildings,
  Database,
  IdentificationCard,
  MapPin,
  Phone,
} from '@phosphor-icons/react';

// As páginas de ferramentas em si só existem em PT (algoritmos e dados
// brasileiros: CPF, CNPJ, CEP). `toolsEn` traduz só os textos usados nos
// cards de preview (Home), para a versão em inglês do site não misturar idiomas.
export const toolsPt = [
  {
    path: '/tools/email-validator',
    title: 'Email Validator',
    description: 'Validação de e-mails com verificação de formato e domínio',
    icon: At,
    tags: ['Validação', 'Frontend'],
  },
  {
    path: '/tools/cpf',
    title: 'CPF Generator',
    description: 'Gera e valida CPFs com algoritmo oficial da Receita',
    icon: IdentificationCard,
    tags: ['Brasil', 'Validação'],
  },
  {
    path: '/tools/cnpj',
    title: 'CNPJ Generator',
    description: 'Gera e valida CNPJs com algoritmo oficial',
    icon: Buildings,
    tags: ['Brasil', 'Empresa'],
  },
  {
    path: '/tools/cep',
    title: 'CEP Finder',
    description: 'Busca endereços por CEP via ViaCEP API',
    icon: MapPin,
    tags: ['API', 'Brasil'],
  },
  {
    path: '/tools/phone-validator',
    title: 'Phone Validator',
    description: 'Valida telefones celulares e fixos do Brasil',
    icon: Phone,
    tags: ['Validação', 'Mobile'],
  },
  {
    path: '/tools/fake-data',
    title: 'Fake Data Generator',
    description: 'Gera dados completos para testes: nome, email, CPF, endereço',
    icon: Database,
    tags: ['Teste', 'Generator'],
  },
];

export const toolsEn = [
  {
    path: '/tools/email-validator',
    title: 'Email Validator',
    description: 'Validates email addresses by checking format and domain.',
    icon: At,
    tags: ['Validation', 'Frontend'],
  },
  {
    path: '/tools/cpf',
    title: 'CPF Generator',
    description: "Generates and validates Brazil's individual tax ID (CPF) using the official algorithm.",
    icon: IdentificationCard,
    tags: ['Brazil', 'Validation'],
  },
  {
    path: '/tools/cnpj',
    title: 'CNPJ Generator',
    description: "Generates and validates Brazil's company tax ID (CNPJ) using the official algorithm.",
    icon: Buildings,
    tags: ['Brazil', 'Company'],
  },
  {
    path: '/tools/cep',
    title: 'CEP Finder',
    description: 'Looks up addresses by Brazilian postal code via the ViaCEP API.',
    icon: MapPin,
    tags: ['API', 'Brazil'],
  },
  {
    path: '/tools/phone-validator',
    title: 'Phone Validator',
    description: 'Validates Brazilian mobile and landline phone numbers.',
    icon: Phone,
    tags: ['Validation', 'Mobile'],
  },
  {
    path: '/tools/fake-data',
    title: 'Fake Data Generator',
    description: 'Generates complete test data: name, email, CPF, address.',
    icon: Database,
    tags: ['Test', 'Generator'],
  },
];
