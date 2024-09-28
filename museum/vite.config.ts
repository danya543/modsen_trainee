import path from 'node:path'
import * as url from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-transition-group'],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src'
      )
    }
  }
});
