<template>
  <component :is="tag" class="materin-ui-header" :style="headerStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiHeader' })

interface HeaderProps {
  height?: string | number
  tag?: string
}

const props = withDefaults(defineProps<HeaderProps>(), {
  height: 60,
  tag: 'header'
})

const headerStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height
}))
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-header {
  @include materin-component-base;

  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: $materin-space-3;
  padding: 0 $materin-space-4;
  background: $materin-glass-bg;
  backdrop-filter: $materin-glass-blur;
  -webkit-backdrop-filter: $materin-glass-blur;
  border-bottom: 1px solid $materin-glass-border;
}
</style>
