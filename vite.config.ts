import path from 'node:path';
import * as url from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [],
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/components',
      ),
      '@assets': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/assets',
      ),
      '@api': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/api',
      ),
      '@entities': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/entities',
      ),
      '@pages': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/pages',
      ),
      '@utils': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/utils',
      ),
    },
  },
});
