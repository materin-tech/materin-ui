<template>
  <div class="materin-ui-skeleton-item" :class="itemClasses" :style="itemStyle" aria-hidden="true" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiSkeletonItem' })

type SkeletonVariant =
  | 'text'
  | 'caption'
  | 'h1'
  | 'h3'
  | 'h5'
  | 'paragraph'
  | 'button'
  | 'image'
  | 'circle'
  | 'rect'

interface SkeletonItemProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<SkeletonItemProps>(), {
  variant: 'text'
})

const itemClasses = computed(() => [`materin-ui-skeleton-item--${props.variant}`])

const toCss = (value?: string | number) =>
  value === undefined ? undefined : typeof value === 'number' ? `${value}px` : value

const itemStyle = computed(() => {
  const style: Record<string, string> = {}
  const width = toCss(props.width)
  const height = toCss(props.height)
  if (width) style.width = width
  if (height) style.height = height
  return style
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-skeleton-item {
  display: block;
  width: 100%;
  background: $materin-glass-bg-subtle;
  border: 1px solid $materin-glass-border;
  border-radius: $materin-radius;

  &--text,
  &--caption {
    height: 14px;
  }

  &--caption {
    height: 11px;
  }

  &--h1 {
    height: 30px;
  }

  &--h3 {
    height: 22px;
  }

  &--h5 {
    height: 17px;
  }

  &--paragraph {
    height: 62px;
  }

  &--button {
    width: 84px;
    height: 32px;
  }

  &--image {
    width: 120px;
    height: 90px;
    border-radius: $materin-radius-lg;
  }

  &--circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  &--rect {
    height: 90px;
    border-radius: $materin-radius-lg;
  }
}
</style>
