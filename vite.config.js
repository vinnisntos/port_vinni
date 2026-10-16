import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'node:child_process';
import { fileURLToPath, URL } from 'node:url';

// Informação real do repositório no momento do build, usada pela status bar
// do rodapé e pelo `git log` do terminal do hero. Sem git (ex.: tarball), cai
// em valores neutros em vez de quebrar o build.
function gitInfo() {
  const run = (cmd) => execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  try {
    return {
      branch: run('git rev-parse --abbrev-ref HEAD'),
      sha: run('git rev-parse --short HEAD'),
      log: run('git log -6 --pretty=format:%h%x09%s')
        .split('\n')
        .map((line) => {
          const [hash, ...subject] = line.split('\t');
          return { hash, subject: subject.join('\t') };
        }),
    };
  } catch {
    return { branch: 'main', sha: 'local', log: [] };
  }
}

// https://vite.dev/config/
//
// O site roda no domínio próprio vinnisantos.com.br, servido na raiz,
// então `base` é sempre "/".
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  define: {
    __BUILD__: JSON.stringify({ ...gitInfo(), date: new Date().toISOString() }),
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Garante que o diretório dist fica limpo antes de cada build
    emptyOutDir: true,
  },
});
