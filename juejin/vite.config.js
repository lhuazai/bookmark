import { defineConfig } from 'vite';
const path = require('path');
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import babel from "vite-babel-plugin";
import vitePluginImport from 'vite-plugin-babel-import';
export default defineConfig({
  plugins: [
    vue(),
    babel(),
    vitePluginImport([]),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
