/**
 * Vite 库构建配置 - 用于 npm 发布
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 与 vite.config.ts 保持一致：组件样式里写 @use '@/styles/tokens.scss'
    alias: {
      '@': resolve(__dirname, 'packages'),
      '@materin-ui': resolve(__dirname, 'packages/materin-ui'),
      '~': resolve(__dirname, '.')
    }
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'packages/materin-ui/index.ts'),
      name: 'MaterinUI',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // 确保外部化处理所有 Vue 依赖
      external: ['vue', '@vueuse/core'],
      output: {
        // index.ts 同时有命名导出与默认导出（Vue 插件），显式声明，避免 CJS 消费方踩坑
        exports: 'named',
        globals: {
          vue: 'Vue',
          '@vueuse/core': 'VueUse'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})