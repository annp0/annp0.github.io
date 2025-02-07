import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      preserveEntrySignatures: "allow-extension",
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        preserveModules: true
      }
    },
  },
})