<template>
  <div class="materin-ui-scrollbar" :class="[`materin-ui-scrollbar--${variant}`]">
    <div ref="viewRef" class="materin-ui-scrollbar__view">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'MiScrollbar' })

interface ScrollbarProps {
  variant?: 'default' | 'thin'
  /** 最大高度（CSS 值） */
  maxHeight?: string
}

withDefaults(defineProps<ScrollbarProps>(), { variant: 'default', maxHeight: undefined })

const viewRef = ref<HTMLElement>()

defineExpose({ view: viewRef })
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-scrollbar {
  &__view {
    max-height: 240px;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: $materin-border transparent;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: $materin-border;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  &--thin &__view {
    max-height: 240px;

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
  }
}
</style>
