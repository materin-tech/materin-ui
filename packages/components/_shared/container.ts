import type { InjectionKey, Ref } from 'vue'

/** Container ↔ Aside 的方向协商：Aside 挂载时告知父容器「我在」 */
export interface ContainerContext {
  hasAside: Ref<boolean>
}

export const CONTAINER_KEY: InjectionKey<ContainerContext> = Symbol('materin-ui-container')
