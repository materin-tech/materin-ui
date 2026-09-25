/**
 * 文档站入口
 * 令牌 → 组件样式 → 组件库，顺序不能变（组件样式只引用令牌）
 */
import { createApp } from 'vue'
import App from './App.vue'
import MaterinUI from '@/materin-ui/index'

import '../tokens/materin-ui.css'
import '../packages/materin-ui/styles.scss'
import './docs.scss'

createApp(App).use(MaterinUI).mount('#app')
