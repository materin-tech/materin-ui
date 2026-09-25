<template>
  <component :is="tag" class="materin-ui-space" :class="spaceClasses" :style="spaceStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiSpace' })

type SpaceSize = 'sm' | 'md' | 'lg' | number
type Align = 'start' | 'center' | 'end' | 'baseline'

interface SpaceProps {
  direction?: 'horizontal' | 'vertical'
  size?: SpaceSize
  wrap?: boolean
  fill?: boolean
  align?: Align
  tag?: string
}

const props = withDefaults(defineProps<SpaceProps>(), {
  direction: 'horizontal',
  size: 'md',
  wrap: false,
  fill: false,
  align: 'center',
  tag: 'div'
})

const SIZES: Record<'sm' | 'md' | 'lg', number> = { sm: 8, md: 12, lg: 20 }

const ALIGN: Record<Align, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  baseline: 'baseline'
}

const spaceClasses = computed(() => [
  `materin-ui-space--${props.direction}`,
  {
    'materin-ui-space--wrap': props.wrap,
    'materin-ui-space--fill': props.fill
  }
])

const spaceStyle = computed(() => {
  const gap = typeof props.size === 'number' ? props.size : SIZES[props.size]
  return {
    gap: `${gap}px`,
    alignItems: ALIGN[props.align]
  }
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-space {
  @include materin-component-base;

  display: inline-flex;
  max-width: 100%;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }

  &--wrap {
    flex-wrap: wrap;
  }

  &--fill {
    display: flex;
    width: 100%;
  }
}
</style>
