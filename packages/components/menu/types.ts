import type { Ref } from 'vue'

export interface MenuContext {
  active: Ref<string>
  select: (name: string) => void
}

export const MENU_KEY: unique symbol = Symbol('MiMenu')

export interface MenuProps {
  direction?: 'vertical' | 'horizontal'
  modelValue?: string
}
