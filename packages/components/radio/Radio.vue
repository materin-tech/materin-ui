<template>
  <label class="materin-ui-radio" :class="radioClasses">
    <input
      class="materin-ui-radio__input"
      type="radio"
      :checked="isChecked"
      :disabled="isDisabled"
      @change="handleChange"
    />
    <span class="materin-ui-radio__dot" aria-hidden="true"><i /></span>
    <span v-if="$slots.default || label" class="materin-ui-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { RADIO_GROUP_KEY, type ChoiceValue } from '../_shared/choice'
import { FORM_ITEM_KEY } from '../_shared/form'

defineOptions({ name: 'MiRadio' })

interface RadioProps {
  modelValue?: ChoiceValue
  value?: ChoiceValue
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<RadioProps>(), {})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ChoiceValue | undefined): void
  (e: 'change', value: ChoiceValue | undefined): void
}>()

const group = inject(RADIO_GROUP_KEY, null)
const item = inject(FORM_ITEM_KEY, null)

const isDisabled = computed(() => props.disabled || group?.disabled || (item?.disabled ?? false))
const size = computed(() => props.size || group?.size || item?.size || 'md')
const isChecked = computed(() =>
  group ? group.value.value === props.value : props.modelValue === props.value
)

const radioClasses = computed(() => [
  `materin-ui-radio--${size.value}`,
  { 'is-checked': isChecked.value, 'is-disabled': isDisabled.value }
])

const handleChange = () => {
  if (isDisabled.value) return
  if (group) {
    group.select(props.value as ChoiceValue)
    group.notifyChange()
    return
  }
  emit('update:modelValue', props.value)
  emit('change', props.value)
  item?.notifyChange()
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-radio {
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

  &__dot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 16px;
    height: 16px;
    background: $materin-glass-bg-subtle;
    border: 1px solid $materin-glass-border;
    border-radius: 50%;
    transition: all $materin-duration-fast $materin-ease-standard;

    i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: transparent;
      transition: background $materin-duration-fast $materin-ease-standard;
    }
  }

  &:hover &__dot {
    border-color: $materin-accent;
  }

  &:focus-within &__dot {
    box-shadow: 0 0 0 3px $materin-accent-soft;
  }

  &.is-checked &__dot {
    border-color: $materin-accent;

    i {
      background: $materin-accent;
    }
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &__label {
    display: inline-flex;
    align-items: center;
  }

  &--sm {
    font-size: $materin-font-size-small;
  }

  &--md {
    font-size: $materin-font-size-body;
  }

  &--lg {
    font-size: 16px;

    .materin-ui-radio__dot {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
