<template>
  <span :class="tagClasses" @click="handleClick">
    <span v-if="$slots.icon" class="materin-ui-tag__icon">
      <slot name="icon" />
    </span>
    <span class="materin-ui-tag__label">
      <slot />
    </span>
    <button
      v-if="closable && !disabled"
      type="button"
      class="materin-ui-tag__close"
      aria-label="关闭"
      @click.stop="handleClose"
    >×</button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TagProps {
  type?: 'primary' | 'secondary' | 'ok' | 'warn' | 'error' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
  disabled?: boolean
}

interface TagEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'close', event: MouseEvent): void
}

const props = withDefaults(defineProps<TagProps>(), {
  type: 'primary',
  size: 'md',
  closable: false,
  disabled: false
})

const emit = defineEmits<TagEmits>()

const tagClasses = computed(() => [
  'materin-ui-tag',
  `materin-ui-tag--${props.type}`,
  `materin-ui-tag--${props.size}`,
  {
    'materin-ui-tag--closable': props.closable,
    'materin-ui-tag--disabled': props.disabled
  }
])

const handleClick = (e: MouseEvent) => {
  if (props.disabled) return
  emit('click', e)
}

const handleClose = (e: MouseEvent) => {
  e.stopPropagation()
  emit('close', e)
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

// 命名：materin-ui-tag
.materin-ui-tag {
  display: inline-flex;
  align-items: center;
  gap: $materin-space-1;
  padding: 2px $materin-space-2;
  font-size: $materin-font-size-caption;
  font-weight: $materin-font-weight-medium;
  line-height: $materin-line-height-normal;
  border-radius: $materin-radius;
  border: 1px solid transparent;
  white-space: nowrap;
  user-select: none;
  transition: all $materin-duration-normal $materin-ease-standard;

  &--closable { padding-right: $materin-space-1; cursor: pointer; }
  &--disabled { cursor: not-allowed; opacity: 0.5; }

  &--sm {
    font-size: 11px;
    padding: 1px 6px;
    border-radius: 4px;
  }

  &--lg {
    font-size: $materin-font-size-small;
    padding: $materin-space-1 $materin-space-3;
  }

  // 主题色 —— 全部走语义令牌，组件里不出现 rgba()（2026-09 修正：原先这里硬写了 10 处）
  &--primary {
    background: $materin-accent-soft;
    color: $materin-accent;
    border-color: $materin-accent-border;
  }

  &--secondary {
    background: $materin-secondary-soft;
    color: $materin-secondary;
    border-color: $materin-secondary-border;
  }

  &--ok {
    background: $materin-ok-soft;
    color: $materin-ok;
    border-color: $materin-ok-border;
  }

  &--warn {
    background: $materin-warn-soft;
    color: $materin-warn;
    border-color: $materin-warn-border;
  }

  &--error {
    background: $materin-error-soft;
    color: $materin-error;
    border-color: $materin-error-border;
  }

  &--neutral {
    background: $materin-surface-2;
    color: $materin-text-muted;
    border-color: $materin-border;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    font-size: 1.1em;
  }

  &__label {
    display: inline-flex;
    align-items: center;
  }

  &__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: transparent;
    color: currentColor;
    font-size: 14px;
    line-height: 1;
    cursor: pointer;
    opacity: 0.6;
    border: none;
    padding: 0;
    margin-left: 2px;
    transition: all $materin-duration-fast $materin-ease-standard;

    &:hover {
      opacity: 1;
      background: $materin-glass-highlight;
    }
  }
}
</style>