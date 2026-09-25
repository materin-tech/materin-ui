<template>
  <div class="materin-ui-button-group" :class="[`materin-ui-button-group--${size}`]" role="group">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiButtonGroup' })

interface ButtonGroupProps {
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<ButtonGroupProps>(), { size: 'md' })
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-button-group {
  display: inline-flex;

  .materin-ui-btn {
    border-radius: 0;

    &:first-child {
      border-top-left-radius: $materin-radius;
      border-bottom-left-radius: $materin-radius;
    }

    &:last-child {
      border-top-right-radius: $materin-radius;
      border-bottom-right-radius: $materin-radius;
    }

    & + & {
      margin-left: -1px;
    }
  }

  &--sm .materin-ui-btn {
    font-size: $materin-font-size-caption;
  }
}
</style>
