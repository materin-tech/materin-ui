<template>
  <span ref="rootRef" class="materin-ui-dropdown" :class="{ 'is-open': open }">
    <span class="materin-ui-dropdown__trigger" @click="toggle">
      <slot name="trigger">
        <button class="materin-ui-dropdown__button" type="button">{{ title }} ▾</button>
      </slot>
    </span>

    <div v-if="open" class="materin-ui-dropdown__menu" :class="`materin-ui-dropdown--${placement}`" role="menu">
      <button
        v-for="(option, i) in options"
        :key="i"
        class="materin-ui-dropdown__option"
        :class="{ 'is-danger': option.danger }"
        type="button"
        role="menuitem"
        :disabled="option.disabled"
        @click="pick(option, i)"
      >
        {{ option.label }}
      </button>
    </div>
  </span>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'

import type { DropdownOption } from './types'

defineOptions({ name: 'MiDropdown' })

interface DropdownProps {
  title?: string
  options?: DropdownOption[]
  placement?: 'top' | 'bottom'
}

const props = withDefaults(defineProps<DropdownProps>(), {
  title: '',
  options: () => [],
  placement: 'bottom'
})

const emit = defineEmits<{
  (e: 'select', option: DropdownOption, index: number): void
}>()

const rootRef = ref<HTMLElement>()
const open = ref(false)

const toggle = () => {
  open.value = !open.value
}

const onDocClick = (event: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) open.value = false
}

if (typeof document !== 'undefined') document.addEventListener('click', onDocClick, true)
onUnmounted(() => {
  if (typeof document !== 'undefined') document.removeEventListener('click', onDocClick, true)
})

const pick = (option: DropdownOption, index: number) => {
  if (option.disabled) return
  open.value = false
  emit('select', option, index)
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-dropdown {
  position: relative;
  display: inline-flex;

  &__trigger {
    display: inline-flex;
  }

  &__button {
    padding: $materin-space-1 $materin-space-3;
    border: 1px solid $materin-border;
    border-radius: $materin-radius;
    background: $materin-surface-3;
    color: $materin-text;
    font-family: $materin-font-ui;
    font-size: $materin-font-size-small;
    cursor: pointer;

    &:hover {
      background: $materin-surface-4;
    }
  }

  &__menu {
    position: absolute;
    z-index: 2100;
    min-width: 160px;
    padding: $materin-space-1;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius;
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur;
    -webkit-backdrop-filter: $materin-glass-blur;
    box-shadow: $materin-elev-2;
    animation: materin-ui-popper-in $materin-duration-fast $materin-ease-out;
  }

  &--bottom {
    top: calc(100% + 6px);
    left: 0;
  }

  &--top {
    bottom: calc(100% + 6px);
    left: 0;
  }

  &__option {
    display: block;
    width: 100%;
    padding: $materin-space-2 $materin-space-3;
    border: none;
    border-radius: $materin-radius;
    background: transparent;
    color: $materin-text;
    font-family: $materin-font-ui;
    font-size: $materin-font-size-small;
    text-align: left;
    cursor: pointer;

    &:hover:not(:disabled) {
      background: $materin-surface-4;
    }

    &.is-danger {
      color: $materin-error;
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }
}
</style>
