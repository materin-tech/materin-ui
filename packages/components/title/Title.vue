<template>
  <component :is="`h${level}`" class="materin-ui-title" :class="titleClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiTitle' })

type TitleType = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'

interface TitleProps {
  /** 标题层级 1–6，同时决定字号与标签 */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  type?: TitleType
}

const props = withDefaults(defineProps<TitleProps>(), {
  level: 1,
  type: 'default'
})

const titleClasses = computed(() => [
  `materin-ui-title--${props.level}`,
  `materin-ui-title--${props.type}`
])
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-title {
  margin: 0;
  color: $materin-text;
  font-weight: $materin-font-weight-bold;
  line-height: $materin-line-height-tight;
  letter-spacing: -0.01em;

  &--1 {
    font-size: $materin-font-size-display;
  }

  &--2 {
    font-size: $materin-font-size-h1;
  }

  &--3 {
    font-size: $materin-font-size-h2;
  }

  &--4 {
    font-size: $materin-font-size-h3;
  }

  &--5 {
    font-size: 16px;
  }

  &--6 {
    font-size: $materin-font-size-body;
  }

  &--default {
    color: $materin-text;
  }

  &--primary {
    color: $materin-accent;
  }

  &--secondary {
    color: $materin-text-muted;
  }

  &--success {
    color: $materin-ok;
  }

  &--warning {
    color: $materin-warn;
  }

  &--danger {
    color: $materin-error;
  }

  &--info {
    color: $materin-info;
  }
}
</style>
