import { defineConfig } from 'vite';
const path = require('path');
import vue from '@vitejs/plugin-vue'
import babel from "vite-babel-plugin";
import eslintPlugin from 'vite-plugin-eslint'
import legacy from '@vitejs/plugin-legacy'
export default defineConfig({
  plugins: [
    vue(),
    babel(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
