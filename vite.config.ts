/**
 * Vite 主配置 - 用于文档站和开发预览
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  // 文档站发布在项目级 Pages：https://materin-tech.github.io/materin-ui/
  base: '/materin-ui/',
  // 文档站源码在 docs/，构建产物到仓库根的 docs-dist/
  root: resolve(__dirname, 'docs'),
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
    outDir: resolve(__dirname, 'docs-dist'),
    emptyOutDir: true,
    sourcemap: true
  }
})