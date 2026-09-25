import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const ORDER: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl']

const MIN_WIDTH: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

/** 当前断点（客户端解析；服务端渲染时固定返回 xl，避免 hydration 抖动） */
export function useBreakpoint(): Ref<Breakpoint> {
  const current = ref<Breakpoint>('xl')

  const resolve = (): Breakpoint => {
    if (typeof window === 'undefined') return 'xl'
    const width = window.innerWidth
    let hit: Breakpoint = 'xs'
    ORDER.forEach((bp) => {
      if (width >= MIN_WIDTH[bp]) hit = bp
    })
    return hit
  }

  let timer: ReturnType<typeof setTimeout> | undefined

  const onResize = () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      current.value = resolve()
    }, 80)
  }

  onMounted(() => {
    current.value = resolve()
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
    if (typeof window !== 'undefined') window.removeEventListener('resize', onResize)
  })

  return current
}
