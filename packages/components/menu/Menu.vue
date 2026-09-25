<template>
  <nav class="materin-ui-menu" :class="[`materin-ui-menu--${direction}`]">
    <slot />
  </nav>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import { MENU_KEY, type MenuContext } from './types'

defineOptions({ name: 'MiMenu' })

interface MenuProps {
  direction?: 'vertical' | 'horizontal'
  /** 受控选中的 item name */
  modelValue?: string
}

const props = withDefaults(defineProps<MenuProps>(), {
  direction: 'vertical',
  modelValue: undefined
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const inner = ref(props.modelValue ?? '')

watch(() => props.modelValue, (value) => {
  if (value !== undefined) inner.value = value
})

provide(
  MENU_KEY,
  {
    active: inner,
    select: (name: string) => {
      inner.value = name
      emit('update:modelValue', name)
    }
  } satisfies MenuContext
)
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-menu {
  display: flex;
  flex-direction: column;
  gap: 2px;

  &--horizontal {
    flex-direction: row;
    gap: $materin-space-2;
  }

  &__group-title {
    margin: $materin-space-3 0 $materin-space-1;
    padding: 0 $materin-space-3;
    color: $materin-text-faint;
    font-size: $materin-font-size-caption;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $materin-space-2;
    width: 100%;
    padding: $materin-space-2 $materin-space-3;
    border: none;
    border-radius: $materin-radius;
    background: transparent;
    color: $materin-text-muted;
    font-family: $materin-font-ui;
    font-size: $materin-font-size-body;
    text-align: left;
    cursor: pointer;
    transition: all $materin-duration-fast $materin-ease-standard;

    &:hover {
      background: $materin-surface-4;
      color: $materin-text;
    }

    &.is-active {
      background: $materin-accent-soft;
      color: $materin-accent;
      font-weight: $materin-font-weight-medium;
    }
  }

  &--horizontal &__item {
    width: auto;
  }

  &__sub {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-left: $materin-space-4;
  }

  &--horizontal &__sub {
    position: absolute;
    padding: $materin-space-2;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius;
    background: $materin-glass-bg-strong;
    box-shadow: $materin-elev-2;
  }
}
</style>
