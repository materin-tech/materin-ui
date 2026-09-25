/**
 * Vite 主配置 - 用于文档站和开发预览
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'packages'),
      '@materin-ui': resolve(__dirname, 'packages/materin-ui'),
      '~': resolve(__dirname, '.')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/tokens.scss" as *;`,
        api: 'modern-compiler'
      }
    }
  },
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'docs-dist',
    sourcemap: true
  }
})