<template>
  <component :is="tag" class="materin-ui-footer" :style="footerStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiFooter' })

interface FooterProps {
  height?: string | number
  tag?: string
}

const props = withDefaults(defineProps<FooterProps>(), {
  height: 60,
  tag: 'footer'
})

const footerStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height
}))
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-footer {
  @include materin-component-base;

  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: $materin-space-3;
  padding: 0 $materin-space-4;
  color: $materin-text-muted;
  background: $materin-glass-bg-subtle;
  backdrop-filter: $materin-glass-blur-sm;
  -webkit-backdrop-filter: $materin-glass-blur-sm;
  border-top: 1px solid $materin-glass-border;
}
</style>
