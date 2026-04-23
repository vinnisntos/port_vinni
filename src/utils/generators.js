/**
 * Geradores de dados brasileiros para teste
 */

import { formatCPF, formatCNPJ, formatPhone } from './validators.js';

function randomDigit() {
  return Math.floor(Math.random() * 10);
}

function randomDigits(n) {
  return Array.from({ length: n }, () => randomDigit()).join('');
}

function generateCPFDigit(sum, weight) {
  let digit = 11 - (sum % 11);
  return digit >= 10 ? 0 : digit;
}

export function generateCPF(formatted = true) {
  const base = randomDigits(9);

  let sum1 = 0;
  for (let i = 0; i < 9; i++) sum1 += parseInt(base[i]) * (10 - i);
  const d1 = generateCPFDigit(sum1, 10);

  let sum2 = 0;
  for (let i = 0; i < 9; i++) sum2 += parseInt(base[i]) * (11 - i);
  sum2 += d1 * 2;
  const d2 = generateCPFDigit(sum2, 11);

  const cpf = base + d1 + d2;
  return formatted ? formatCPF(cpf) : cpf;
}

export function generateCNPJ(formatted = true) {
  const base = randomDigits(8) + '0001';

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum1 = 0;
  for (let i = 0; i < 12; i++) sum1 += parseInt(base[i]) * weights1[i];
  const d1 = generateCPFDigit(sum1, 12);

  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum2 = 0;
  for (let i = 0; i < 12; i++) sum2 += parseInt(base[i]) * weights2[i];
  sum2 += d1 * 2;
  const d2 = generateCPFDigit(sum2, 13);

  const cnpj = base + d1 + d2;
  return formatted ? formatCNPJ(cnpj) : cnpj;
}

export function generatePhone(formatted = true) {
  const ddd = (randomDigits(2).replace(/^0/, '1') || '11');
  const prefix = '9' + randomDigits(8);
  const phone = ddd + prefix;
  return formatted ? formatPhone(phone) : phone;
}

export function generateCEP(formatted = true) {
  const cep = randomDigits(5) + randomDigits(3);
  return formatted ? cep.replace(/(\d{5})(\d{3})/, '$1-$2') : cep;
}

const firstNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Julia', 'Lucas', 'Fernanda', 'Rafael', 'Camila', 'Bruno', 'Patricia', 'Gabriel', 'Amanda', 'Rodrigo', 'Beatriz'];
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes'];
const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'proton.me'];
const streets = ['Rua das Flores', 'Av. Paulista', 'Rua Augusta', 'Av. Brasil', 'Rua da Consolação', 'Av. Faria Lima', 'Rua Oscar Freire', 'Av. Rebouças'];

export function generateFakePerson() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;

  const emailBase = firstName.toLowerCase() + '.' + lastName.toLowerCase();
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = emailBase + randomDigits(2) + '@' + domain;

  const cpf = generateCPF(true);
  const phone = generatePhone(true);
  const cep = generateCEP(true);
  const street = streets[Math.floor(Math.random() * streets.length)];
  const number = Math.floor(Math.random() * 999) + 1;

  return {
    name,
    email,
    cpf,
    phone,
    cep,
    address: `${street}, ${number}`,
    birthDate: `${randomDigits(2)}/${randomDigits(2)}/19${randomDigits(2)}`
  };
}
