import type { InjectionKey, Ref } from 'vue'

/** Row ↔ Col：列间距由父行统一下发 */
export interface RowContext {
  gutter: Ref<number>
}

export const ROW_KEY: InjectionKey<RowContext> = Symbol('materin-ui-row')
