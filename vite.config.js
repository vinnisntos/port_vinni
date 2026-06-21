import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
//
// `base` controla a URL base de todos os assets emitidos.
// No GitHub Pages servindo a partir de um projeto (`/port_vinni/`),
// `base` precisa ser `/port_vinni/`. Em ambiente local + domínio custom,
// `base` deve ser `/`.
//
// Usamos `GITHUB_PAGES_REPO` injetado no build pelo workflow para detectar
// isso automaticamente, com fallback para o valor atual.
const repoName = process.env.GITHUB_PAGES_REPO || 'port_vinni';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE || `/${repoName}/`,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Garante que o diretório dist fica limpo antes de cada build
    emptyOutDir: true,
  },
});