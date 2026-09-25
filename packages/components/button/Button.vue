<template>
  <button
    :class="buttonClasses"
    :type="nativeType"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    :aria-disabled="disabled || loading || undefined"
    @click="handleClick"
  >
    <span v-if="$slots.icon && !loading" class="materin-ui-btn__icon">
      <slot name="icon" />
    </span>

    <span class="materin-ui-btn__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  disabled?: boolean
  loading?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
}

interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'md',
  block: false,
  disabled: false,
  loading: false,
  nativeType: 'button'
})

const emit = defineEmits<ButtonEmits>()

const buttonClasses = computed(() => [
  'materin-ui-btn',  // 命名契约：materin-<scope>-<component>，scope=ui（共享件）
  `materin-ui-btn--${props.type}`,
  `materin-ui-btn--${props.size}`,
  {
    'materin-ui-btn--block': props.block,
    'materin-ui-btn--loading': props.loading,
    'materin-ui-btn--disabled': props.disabled
  }
])

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    event.stopImmediatePropagation()
    return
  }
  emit('click', event)
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

// 命名：materin-ui-btn（scope=ui 共享件）
.materin-ui-btn {
  @include materin-component-base;

  // 基础
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $materin-space-2;
  padding: $materin-space-2 $materin-space-4;
  font-size: $materin-font-size-body;
  font-weight: $materin-font-weight-medium;
  letter-spacing: -0.01em;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: $materin-radius;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  transition: all $materin-duration-normal $materin-ease-standard;

  // focus 玻璃感
  &:focus-visible {
    box-shadow: 0 0 0 3px $materin-accent-soft;
  }

  // 禁用
  &--disabled,
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  // loading
  &--loading {
    cursor: wait;
    pointer-events: none;
  }

  // 块级
  &--block {
    display: flex;
    width: 100%;
  }

  // 尺寸
  &--sm {
    padding: $materin-space-1 $materin-space-3;
    font-size: $materin-font-size-small;
  }

  &--lg {
    padding: $materin-space-3 $materin-space-5;
    font-size: 16px;
  }

  // ===== 变体 =====

  // 主按钮：强调色实色
  &--primary {
    background: $materin-accent;
    color: $materin-on-accent;

    &:hover:not(.materin-ui-btn--disabled) {
      background: $materin-accent-strong;
      box-shadow: $materin-elev-2;
    }

    &:active:not(.materin-ui-btn--disabled) {
      transform: scale(0.98);
    }
  }

  // 次按钮：玻璃风
  &--secondary {
    @include materin-glass('normal');
    color: $materin-text;
    border: 1px solid $materin-glass-border;

    &:hover:not(.materin-ui-btn--disabled) {
      background: $materin-glass-bg-strong;
      box-shadow: $materin-elev-1;
    }
  }

  // Ghost：透明背景
  &--ghost {
    background: transparent;
    color: $materin-text;

    &:hover:not(.materin-ui-btn--disabled) {
      background: $materin-accent-soft;
      color: $materin-accent;
    }
  }

  // Danger：危险色
  &--danger {
    background: transparent;
    color: $materin-error;
    border-color: $materin-error;

    &:hover:not(.materin-ui-btn--disabled) {
      background: $materin-error;
      color: white;
    }
  }

  // 子元素
  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1em;
  }

  &__content {
    display: inline-flex;
    align-items: center;
  }
}
</style>