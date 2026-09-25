<template>
  <label class="materin-ui-checkbox" :class="checkboxClasses">
    <input
      class="materin-ui-checkbox__input"
      type="checkbox"
      :checked="isChecked"
      :disabled="isDisabled"
      :aria-checked="isChecked"
      @change="handleChange"
    />
    <span class="materin-ui-checkbox__box" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2">
        <path d="M3.2 8.4l3.1 3.1 6.5-7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
    <span v-if="$slots.default" class="materin-ui-checkbox__label"><slot /></span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { CHECKBOX_GROUP_KEY, type ChoiceValue } from '../_shared/choice'
import { FORM_ITEM_KEY } from '../_shared/form'

defineOptions({ name: 'MiCheckbox' })

interface CheckboxProps {
  modelValue?: boolean
  value?: ChoiceValue
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const group = inject(CHECKBOX_GROUP_KEY, null)
const item = inject(FORM_ITEM_KEY, null)

const isDisabled = computed(() => props.disabled || group?.disabled || (item?.disabled ?? false))
const size = computed(() => props.size || group?.size || item?.size || 'md')
const isChecked = computed(() =>
  group ? group.value.value.includes(props.value as ChoiceValue) : props.modelValue
)

const checkboxClasses = computed(() => [
  `materin-ui-checkbox--${size.value}`,
  { 'is-checked': isChecked.value, 'is-disabled': isDisabled.value }
])

const handleChange = (event: Event) => {
  if (isDisabled.value) {
    event.preventDefault()
    return
  }
  const next = (event.target as HTMLInputElement).checked
  if (group) {
    group.toggle(props.value as ChoiceValue)
    group.notifyChange()
    return
  }
  emit('update:modelValue', next)
  emit('change', next)
  item?.notifyChange()
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-checkbox {
  display: inline-flex;
  align-items: center;
  gap: $materin-space-2;
  font-size: $materin-font-size-body;
  cursor: pointer;

  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  &__box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 16px;
    height: 16px;
    color: transparent;
    background: $materin-glass-bg-subtle;
    border: 1px solid $materin-glass-border;
    border-radius: 4px;
    transition: all $materin-duration-fast $materin-ease-standard;

    svg {
      width: 12px;
      height: 12px;
    }
  }

  &__label {
    display: inline-flex;
    align-items: center;
  }

  &:hover &__box {
    border-color: $materin-accent;
  }

  &:focus-within &__box {
    box-shadow: 0 0 0 3px $materin-accent-soft;
  }

  &.is-checked &__box {
    color: $materin-on-accent;
    background: $materin-accent;
    border-color: $materin-accent;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &--sm {
    font-size: $materin-font-size-small;

    .materin-ui-checkbox__box {
      width: 14px;
      height: 14px;
    }
  }

  &--md {
    font-size: $materin-font-size-body;
  }

  &--lg {
    font-size: 16px;

    .materin-ui-checkbox__box {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
