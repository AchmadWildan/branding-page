// vite.config.js
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: './src', // folder utama project (opsional, default: '.')
  base: './',    // base path saat build

  build: {
    outDir: '../dist', // output folder hasil build
    sourcemap: true,   // memudahkan debugging
  },

  server: {
    host: true,   // agar bisa diakses via IP LAN
    port: 5173,   // ubah jika perlu
    open: true,   // otomatis buka browser
  },
})
