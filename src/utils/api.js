/**
 * API wrappers para serviços externos
 */

const VIA_CEP_BASE = 'https://viacep.com.br/ws';

export async function fetchCEP(cep) {
  const cleanCEP = cep.replace(/[^\d]/g, '');
  if (cleanCEP.length !== 8) {
    throw new Error('CEP deve ter 8 dígitos');
  }

  const response = await fetch(`${VIA_CEP_BASE}/${cleanCEP}/json/`);
  if (!response.ok) {
    throw new Error('CEP não encontrado');
  }

  const data = await response.json();
  if (data.erro) {
    throw new Error('CEP não encontrado');
  }

  return {
    cep: data.cep,
    logradouro: data.logradouro,
    complemento: data.complemento,
    bairro: data.bairro,
    localidade: data.localidade,
    uf: data.uf,
    ibge: data.ibge,
    ddd: data.ddd
  };
}
