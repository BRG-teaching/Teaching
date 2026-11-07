import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  publicDir: '../CAS/website',
  plugins: [vue()],
  build: {
    outDir: '../docs/CAS/website',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        library: resolve(import.meta.dirname, 'library.html'),
      },
    },
  },
});
