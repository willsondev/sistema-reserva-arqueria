import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import postcss from './postcss.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

  ],
   
  build: {
    sourcemap: false,// Asegúrate de que esto esté en true si quieres mapas de fuente
  },
  // css: {
  //   postcss,
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
