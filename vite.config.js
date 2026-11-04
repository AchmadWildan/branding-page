// vite.config.js
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: './src', // folder utama project (opsional, default: '.')
  base: './',    // base path saat build

  build: {
    outDir: '../docs', // output folder hasil build
    emptyOutDir: true, // hapus file build lama (outDir di luar root tidak dikosongkan otomatis)
    sourcemap: true,   // memudahkan debugging
  },

  server: {
    host: true,   // agar bisa diakses via IP LAN
    port: 5173,   // ubah jika perlu
    //open: true,   // otomatis buka browser
  },
})
