import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export type PopperPlacement = 'top' | 'bottom' | 'left' | 'right'

/** 点击外部关闭：只在打开时挂监听，避免全局常驻 */
export function useClickOutside(
  rootRef: Ref<HTMLElement | undefined>,
  handler: () => void
) {
  const active = ref(false)

  const listener = (event: MouseEvent) => {
    if (!rootRef.value) return
    if (!rootRef.value.contains(event.target as Node)) handler()
  }

  const bind = () => {
    if (typeof document === 'undefined' || active.value) return
    document.addEventListener('click', listener, true)
    active.value = true
  }

  const unbind = () => {
    if (typeof document === 'undefined' || !active.value) return
    document.removeEventListener('click', listener, true)
    active.value = false
  }

  onMounted(() => {
    if (typeof document !== 'undefined') document.addEventListener('click', listener, true)
    active.value = true
  })
  onUnmounted(unbind)

  return { bind, unbind }
}

/** ESC 关闭 */
export function useEscape(handler: () => void) {
  const listener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') handler()
  }
  onMounted(() => {
    if (typeof document !== 'undefined') document.addEventListener('keydown', listener)
  })
  onUnmounted(() => {
    if (typeof document !== 'undefined') document.removeEventListener('keydown', listener)
  })
}

/** 锁定/恢复 body 滚动（对话框与抽屉用） */
let lockCount = 0
export function useScrollLock(locked: Ref<boolean>) {
  const apply = (isLocked: boolean) => {
    if (typeof document === 'undefined') return
    if (isLocked) {
      lockCount += 1
      document.body.style.overflow = 'hidden'
    } else if (lockCount > 0) {
      lockCount -= 1
      if (lockCount === 0) document.body.style.overflow = ''
    }
  }

  let applied = false
  const sync = () => {
    if (locked.value === applied) return
    applied = locked.value
    apply(applied)
  }

  return {
    sync,
    release: () => {
      if (applied) {
        applied = false
        apply(false)
      }
    }
  }
}
