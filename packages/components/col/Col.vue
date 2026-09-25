<template>
  <component :is="tag" class="materin-ui-col" :style="colStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { ROW_KEY } from '../_shared/row'
import { useBreakpoint, type Breakpoint } from '../_shared/breakpoint'

defineOptions({ name: 'MiCol' })

interface ColSize {
  span?: number
  offset?: number
}

interface ColProps {
  span?: number
  offset?: number
  order?: number
  xs?: number | ColSize
  sm?: number | ColSize
  md?: number | ColSize
  lg?: number | ColSize
  xl?: number | ColSize
  tag?: string
}

const props = withDefaults(defineProps<ColProps>(), {
  span: 24,
  offset: 0,
  tag: 'div'
})

const row = inject(ROW_KEY, null)
const breakpoint = useBreakpoint()

const ORDER: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl']

/** 取「当前断点及更小断点里最大的那一档」生效值 */
const resolved = computed(() => {
  const currentIndex = ORDER.indexOf(breakpoint.value)
  let span = props.span
  let offset = props.offset
  ORDER.forEach((bp, index) => {
    if (index > currentIndex) return
    const value = props[bp]
    if (value === undefined) return
    if (typeof value === 'number') {
      span = value
      offset = offset
    } else {
      if (value.span !== undefined) span = value.span
      if (value.offset !== undefined) offset = value.offset
    }
  })
  return { span, offset }
})

const colStyle = computed(() => {
  const gutter = row ? row.gutter.value : 0
  const half = gutter / 2
  const { span, offset } = resolved.value
  const style: Record<string, string> = {
    width: span === 0 ? '0' : `${(span / 24) * 100}%`,
    paddingLeft: `${half}px`,
    paddingRight: `${half}px`
  }
  if (span === 0) style.display = 'none'
  if (offset) style.marginLeft = `${(offset / 24) * 100}%`
  if (props.order !== undefined) style.order = String(props.order)
  return style
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-col {
  box-sizing: border-box;
  flex: 0 0 auto;
  min-width: 0;
  max-width: 100%;
}
</style>
