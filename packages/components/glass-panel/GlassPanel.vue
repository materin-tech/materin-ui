<template>
  <div class="materin-ui-glass-panel" :class="[`materin-ui-glass-panel--${strength}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiGlassPanel' })

interface GlassPanelProps {
  strength?: 'strong' | 'normal' | 'subtle'
}

withDefaults(defineProps<GlassPanelProps>(), { strength: 'normal' })
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-glass-panel {
  padding: $materin-space-4;
  border: 1px solid $materin-glass-border;
  border-radius: $materin-radius-lg;
  color: $materin-text;

  &--normal {
    @include materin-glass;
  }

  &--strong {
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur;
    -webkit-backdrop-filter: $materin-glass-blur;
  }

  &--subtle {
    background: $materin-glass-bg-subtle;
    backdrop-filter: $materin-glass-blur-sm;
    -webkit-backdrop-filter: $materin-glass-blur-sm;
  }
}
</style>
