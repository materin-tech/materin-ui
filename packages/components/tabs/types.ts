import type { VNode } from 'vue'

export interface TabPane {
  name: string
  label: string
  vnode: VNode
}

export interface TabsProps {
  modelValue?: string
}
