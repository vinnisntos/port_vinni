/**
 * Validações brasileiras (CPF, CNPJ, Email, Telefone)
 * Algoritmos oficiais da Receita Federal
 */

export function isValidCPF(cpf) {
  if (!cpf) return false;
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (parseInt(cpf[9]) !== digit) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  return parseInt(cpf[10]) === digit;
}

export function isValidCNPJ(cnpj) {
  if (!cnpj) return false;
  cnpj = cnpj.replace(/[^\d]/g, '');
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) sum += parseInt(cnpj[i]) * weights1[i];
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (parseInt(cnpj[12]) !== digit) return false;

  sum = 0;
  for (let i = 0; i < 13; i++) sum += parseInt(cnpj[i]) * weights2[i];
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  return parseInt(cnpj[13]) === digit;
}

export function isValidEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 254;
}

export function isValidPhone(phone) {
  if (!phone) return false;
  phone = phone.replace(/[^\d]/g, '');
  if (phone.length === 10) {
    // Fixo: (XX) XXXX-XXXX
    return /^[2-5]\d{7}$/.test(phone.slice(2));
  }
  if (phone.length === 11) {
    // Celular: (XX) 9XXXX-XXXX
    return /^9\d{8}$/.test(phone.slice(2));
  }
  return false;
}

export function formatCPF(cpf) {
  return cpf.replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatCNPJ(cnpj) {
  return cnpj.replace(/[^\d]/g, '').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export function formatPhone(phone) {
  const p = phone.replace(/[^\d]/g, '');
  if (p.length === 11) return p.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  if (p.length === 10) return p.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  return p;
}

export function formatCEP(cep) {
  return cep.replace(/[^\d]/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
}
