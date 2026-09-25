<template>
  <span
    class="materin-ui-image"
    :class="[`materin-ui-image--${fit}`, { 'materin-ui-image--rounded': rounded }]"
    :style="{ width: widthStyle, height: heightStyle }"
  >
    <img
      v-if="!failed"
      class="materin-ui-image__img"
      :class="{ 'is-loaded': loaded }"
      :src="src"
      :alt="alt"
      :loading="lazy ? 'lazy' : 'eager'"
      @load="loaded = true"
      @error="failed = true"
    />
    <span v-else class="materin-ui-image__fallback">
      <slot name="fallback">{{ fallbackText }}</slot>
    </span>
    <span v-if="!loaded && !failed" class="materin-ui-image__placeholder" aria-hidden="true" />
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'MiImage' })

interface ImageProps {
  src: string
  alt?: string
  width?: number | string
  height?: number | string
  fit?: 'cover' | 'contain' | 'fill' | 'none'
  rounded?: boolean
  lazy?: boolean
  fallbackText?: string
}

const props = withDefaults(defineProps<ImageProps>(), {
  alt: '',
  width: undefined,
  height: undefined,
  fit: 'cover',
  rounded: false,
  lazy: false,
  fallbackText: '加载失败'
})

const loaded = ref(false)
const failed = ref(false)

const widthStyle = computed(() => (props.width === undefined ? undefined : typeof props.width === 'number' ? `${props.width}px` : props.width))
const heightStyle = computed(() => (props.height === undefined ? undefined : typeof props.height === 'number' ? `${props.height}px` : props.height))
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-image {
  position: relative;
  display: inline-block;
  overflow: hidden;
  background: $materin-surface-4;

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity $materin-duration-normal $materin-ease-standard;

    &.is-loaded {
      opacity: 1;
    }
  }

  &__placeholder {
    position: absolute;
    inset: 0;
    background: linear-gradient(100deg, transparent 30%, $materin-glass-highlight 50%, transparent 70%);
    background-size: 200% 100%;
    animation: materin-ui-image-shimmer 1.4s linear infinite;
  }

  &__fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: $materin-text-faint;
    font-size: $materin-font-size-small;
  }

  &--cover &__img { object-fit: cover; }
  &--contain &__img { object-fit: contain; }
  &--fill &__img { object-fit: fill; }
  &--none &__img { object-fit: none; }

  &--rounded {
    border-radius: $materin-radius-lg;
  }
}

@keyframes materin-ui-image-shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
</style>
