<template>
  <div class="materin-ui-select-group">
    <p class="materin-ui-select-group__title">{{ label }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiOptionGroup' })

interface OptionGroupProps {
  label: string
}

defineProps<OptionGroupProps>()
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-select-group {
  padding: $materin-space-1 0;

  &__title {
    margin: 0 0 $materin-space-1;
    padding: 0 $materin-space-3;
    color: $materin-text-faint;
    font-size: $materin-font-size-caption;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
}
</style>
