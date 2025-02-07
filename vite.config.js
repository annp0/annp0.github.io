import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      preserveEntrySignatures: "exports-only",
      input: {
        main: resolve(__dirname, 'index.html'),
        vivi: resolve(__dirname, 'vivi.html')
      },
      output: {
        preserveModules: true
      }
    },
  },
})