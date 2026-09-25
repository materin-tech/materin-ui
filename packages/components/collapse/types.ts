import type { ComputedRef } from 'vue'

export interface CollapseContext {
  /** name → 是否展开 */
  registered: ComputedRef<Record<string, boolean>>
  toggle: (name: string | number) => void
}

export const COLLAPSE_KEY: unique symbol = Symbol('MiCollapse')

export interface CollapseProps {
  modelValue?: (string | number)[]
  accordion?: boolean
}

export interface CollapseItemProps {
  title?: string
  name?: string | number
}
