import { homeContent } from '../content/home';

// Ações usadas pelo terminal e pela paleta de comandos.

export const LINKEDIN = 'https://www.linkedin.com/in/vinnisantos';
export const GITHUB = 'https://github.com/vinnisntos';

export function downloadResume(locale) {
  const t = homeContent[locale];
  const a = document.createElement('a');
  a.href = `${import.meta.env.BASE_URL}${t.resumeFile}`;
  a.download = t.resumeDownloadName;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function openExternal(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}
