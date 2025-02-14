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
        vivi: resolve(__dirname, 'vivi.html'),
        404: resolve(__dirname, '404.html'),
        signature: resolve(__dirname, "signature.html"),
        qtsum: resolve(__dirname, "qtsum.html"),
        gallary: resolve(__dirname, "gallery.html")
      },
      output: {
        preserveModules: true
      }
    },
  },
})