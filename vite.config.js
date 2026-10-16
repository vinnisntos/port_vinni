import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
//
// O site roda no domínio próprio vinnisantos.com.br, servido na raiz,
// então `base` é sempre "/".
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
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
