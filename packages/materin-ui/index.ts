/**
 * materin-ui 库主入口
 *
 * 使用：
 *   import { createApp } from 'vue'
 *   import MaterinUI from '@materin-tech/materin-ui'
 *   import '@materin-tech/materin-ui/styles'   // 组件样式
 *   import '@materin-tech/materin-ui/tokens'   // Materin UI 令牌表
 *   createApp(App).use(MaterinUI).mount('#app')
 *
 * 命名契约：materin-<scope>-<component>[__part][--variant]
 * scope: ui (共享件) | site | office | view | ctx
 */

import type { App } from 'vue'

import MiButton from '../components/button'
import MiInput from '../components/input'
import MiTag from '../components/tag'
import MiCard from '../components/card'

const components = [MiButton, MiInput, MiTag, MiCard]

const install = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name || component.__name || 'MiComponent', component)
  })
}

export { MiButton, MiInput, MiTag, MiCard }

export default {
  install,
  version: '0.2.0'
}

export type { ButtonProps, ButtonEmits } from '../components/button/types'
export type { InputProps, InputEmits } from '../components/input/types'
export type { TagProps, TagEmits } from '../components/tag/types'
export type { CardProps } from '../components/card/types'