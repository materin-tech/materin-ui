<template>
  <div class="materin-ui-input-number" :class="wrapperClasses">
    <span class="materin-ui-input-number__inner">
      <input
        class="materin-ui-input-number__input"
        type="text"
        inputmode="decimal"
        :id="inputId"
        :value="displayValue"
        :disabled="isDisabled"
        :placeholder="placeholder"
        :aria-invalid="isError || undefined"
        :aria-describedby="describedby || undefined"
        @input="handleInput"
        @blur="handleBlur"
        @keydown.up.prevent="increase"
        @keydown.down.prevent="decrease"
      />
      <button
        class="materin-ui-input-number__decrease"
        type="button"
        :disabled="isDisabled || reachedMin"
        aria-label="减少"
        @click="decrease"
      >
        −
      </button>
      <button
        class="materin-ui-input-number__increase"
        type="button"
        :disabled="isDisabled || reachedMax"
        aria-label="增加"
        @click="increase"
      >
        +
      </button>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { FORM_ITEM_KEY } from '../_shared/form'

defineOptions({ name: 'MiInputNumber' })

interface InputNumberProps {
  modelValue?: number | null
  min?: number
  max?: number
  step?: number
  precision?: number
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<InputNumberProps>(), {
  modelValue: null,
  min: -Infinity,
  max: Infinity,
  step: 1,
  placeholder: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
  (e: 'change', value: number | null): void
}>()

const item = inject(FORM_ITEM_KEY, null)

const inputId = computed(() => item?.inputId)
const describedby = computed(() => item?.describedby)
const isError = computed(() => item?.isError ?? false)
const isDisabled = computed(() => props.disabled || (item?.disabled ?? false))
const size = computed(() => props.size || item?.size || 'md')

const local = ref<string>('')

watch(
  () => props.modelValue,
  (value) => {
    local.value = value === null || value === undefined ? '' : String(value)
  },
  { immediate: true }
)

const round = (value: number) => {
  const digits = props.precision
  if (digits === undefined) return value
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

const clamp = (value: number) => Math.min(props.max, Math.max(props.min, value))

const reachedMin = computed(() => typeof props.modelValue === 'number' && props.modelValue <= props.min)
const reachedMax = computed(() => typeof props.modelValue === 'number' && props.modelValue >= props.max)

const displayValue = computed(() =>
  props.modelValue === null || props.modelValue === undefined ? local.value : String(props.modelValue)
)

const commit = (value: number | null) => {
  emit('update:modelValue', value)
  emit('change', value)
  item?.notifyChange()
}

/** 同 tick 连点时 props 还没更新，所以以本地值为基准，避免「连点两次只加 1」 */
const currentBase = () => {
  const parsed = Number(local.value)
  if (local.value.trim() !== '' && !Number.isNaN(parsed)) return parsed
  return typeof props.modelValue === 'number' ? props.modelValue : 0
}

const stepBy = (delta: number) => {
  if (isDisabled.value) return
  const next = round(clamp(currentBase() + delta))
  local.value = String(next)
  commit(next)
}

const increase = () => stepBy(props.step)

const decrease = () => stepBy(-props.step)

const handleInput = (event: Event) => {
  const raw = (event.target as HTMLInputElement).value
  local.value = raw
  const parsed = Number(raw)
  if (raw.trim() === '') {
    commit(null)
    return
  }
  if (!Number.isNaN(parsed)) {
    emit('update:modelValue', parsed)
  }
}

const handleBlur = () => {
  const parsed = Number(local.value)
  if (local.value.trim() === '' || Number.isNaN(parsed)) {
    commit(null)
  } else {
    commit(round(clamp(parsed)))
  }
  item?.notifyBlur()
}

const wrapperClasses = computed(() => [
  `materin-ui-input-number--${size.value}`,
  { 'is-disabled': isDisabled.value, 'is-error': isError.value }
])
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-input-number {
  display: block;
  font-size: $materin-font-size-body;

  &__inner {
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    background: $materin-glass-bg-subtle;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius;
    transition: border-color $materin-duration-fast $materin-ease-standard;
  }

  &__input {
    width: 96px;
    padding: $materin-space-2 $materin-space-3;
    border: none;
    outline: none;
    background: transparent;
    color: $materin-text;
    font-family: $materin-font-ui;
    font-size: inherit;
    text-align: left;
  }

  &__decrease,
  &__increase {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    align-self: stretch;
    border: none;
    background: transparent;
    color: $materin-text-muted;
    font-size: 15px;
    font-weight: $materin-font-weight-bold;
    cursor: pointer;
    transition: background $materin-duration-fast $materin-ease-standard;

    &:hover:not(:disabled) {
      background: $materin-accent-soft;
      color: $materin-accent;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }

  &__decrease {
    border-left: 1px solid $materin-glass-border;
  }

  &__increase {
    border-left: 1px solid $materin-glass-border;
  }

  &__inner:focus-within {
    border-color: $materin-accent;
    box-shadow: 0 0 0 3px $materin-accent-soft;
  }

  &.is-disabled &__inner {
    opacity: 0.6;
  }

  &.is-error &__inner {
    border-color: $materin-error;
  }

  &--md &__inner {
    font-size: $materin-font-size-body;
  }

  &--sm &__inner {
    font-size: $materin-font-size-small;
  }

  &--sm &__input {
    padding: $materin-space-1 $materin-space-2;
  }

  &--lg &__input {
    padding: $materin-space-3 $materin-space-4;
    font-size: 16px;
  }
}
</style>
