import { defineConfig } from 'vite';
const path = require('path');
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
