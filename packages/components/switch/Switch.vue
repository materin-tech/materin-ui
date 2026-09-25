<template>
  <button
    class="materin-ui-switch"
    :class="switchClasses"
    type="button"
    role="switch"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled || undefined"
    :disabled="isDisabled"
    @click="toggle"
  >
    <span class="materin-ui-switch__handle" />
    <span v-if="activeText || inactiveText" class="materin-ui-switch__label">
      {{ isChecked ? activeText : inactiveText }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { FORM_ITEM_KEY } from '../_shared/form'

defineOptions({ name: 'MiSwitch' })

interface SwitchProps {
  modelValue?: boolean | string | number
  activeValue?: boolean | string | number
  inactiveValue?: boolean | string | number
  activeText?: string
  inactiveText?: string
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  activeValue: true,
  inactiveValue: false,
  size: 'md'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | string | number): void
  (e: 'change', value: boolean | string | number): void
}>()

const item = inject(FORM_ITEM_KEY, null)

const isDisabled = computed(() => props.disabled || props.loading || (item?.disabled ?? false))
const size = computed(() => props.size || item?.size || 'md')
const isChecked = computed(() => props.modelValue === props.activeValue)

const switchClasses = computed(() => [
  `materin-ui-switch--${size.value}`,
  {
    'is-checked': isChecked.value,
    'is-disabled': isDisabled.value,
    'is-loading': !!props.loading
  }
])

const toggle = () => {
  if (isDisabled.value) return
  const next = isChecked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', next)
  emit('change', next)
  item?.notifyChange()
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: $materin-space-2;
  padding: 0;
  border: none;
  background: transparent;
  color: $materin-text-muted;
  font-family: $materin-font-ui;
  font-size: $materin-font-size-small;
  cursor: pointer;

  &__handle {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 22px;
    border-radius: 999px;
    background: $materin-surface-4;
    border: 1px solid $materin-glass-border;
    transition: background $materin-duration-normal $materin-ease-standard;

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: $materin-text;
      transition: transform $materin-duration-normal $materin-ease-standard;
    }
  }

  &.is-checked &__handle {
    background: $materin-accent;
    border-color: $materin-accent;

    &::after {
      background: $materin-on-accent;
      transform: translateX(18px);
    }
  }

  &:focus-visible &__handle {
    box-shadow: 0 0 0 3px $materin-accent-soft;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &.is-loading &__handle::after {
    animation: materin-ui-switch-pulse 1s $materin-ease-standard infinite;
  }

  &__label {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
  }

  &--md {
    font-size: $materin-font-size-small;
  }

  &--sm &__handle {
    width: 32px;
    height: 18px;

    &::after {
      width: 12px;
      height: 12px;
    }
  }

  &--sm.is-checked &__handle::after {
    transform: translateX(14px);
  }

  &--lg &__handle {
    width: 48px;
    height: 26px;

    &::after {
      width: 20px;
      height: 20px;
    }
  }

  &--lg.is-checked &__handle::after {
    transform: translateX(22px);
  }
}

@keyframes materin-ui-switch-pulse {
  50% {
    opacity: 0.4;
  }
}
</style>
