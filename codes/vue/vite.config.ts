import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJSX from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: true,
    open: true,
    port: 5156,
    proxy: {
      // '/api': {
      //   target: 'http://localhost:2916/vue3cms/',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.vue', '.ts', '.js', '.tsx', '.jsx', '.json'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "@/style/vars/vars.scss";',
      },
    },
  },
  plugins: [vue(), vueJSX({})],
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
