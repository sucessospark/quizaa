import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base relativa para funcionar dentro da pasta do plugin no WP
  base: './', 
  build: {
    // Coloca os arquivos na pasta 'dist' mas sem subpastas assets para facilitar o PHP
    assetsDir: '',
    rollupOptions: {
      output: {
        // Força nomes fixos para que o PHP saiba o que carregar
        entryFileNames: 'app-script.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'app-style.css';
          }
          return '[name][extname]';
        },
      },
    },
  },
})