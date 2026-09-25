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

  // 主题色 - 用语义令牌，不用硬编码颜色
  &--primary {
    background: $materin-accent-soft;
    color: $materin-accent;
    border-color: rgba(91, 140, 255, 0.32);
  }

  &--secondary {
    background: rgba(110, 231, 213, 0.16);
    color: $materin-secondary;
    border-color: rgba(110, 231, 213, 0.32);
  }

  &--ok {
    background: rgba(58, 125, 68, 0.18);
    color: $materin-ok;
    border-color: rgba(58, 125, 68, 0.32);
  }

  &--warn {
    background: rgba(184, 134, 11, 0.18);
    color: $materin-warn;
    border-color: rgba(184, 134, 11, 0.32);
  }

  &--error {
    background: rgba(249, 62, 62, 0.16);
    color: $materin-error;
    border-color: rgba(249, 62, 62, 0.32);
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
      background: rgba(255, 255, 255, 0.16);
    }
  }
}
</style>