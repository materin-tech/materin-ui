<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="inputId" class="materin-ui-field__label">
      {{ label }}
      <span v-if="required" class="materin-ui-field__required">*</span>
    </label>

    <div :class="['materin-ui-field', `materin-ui-field--${size}`, { 'materin-ui-field--disabled': disabled }]">
      <span v-if="$slots.prefix" class="materin-ui-field__prefix">
        <slot name="prefix" />
      </span>

      <input
        :id="inputId"
        ref="inputRef"
        :class="['materin-ui-field__inner', { 'materin-ui-field__inner--has-prefix': $slots.prefix, 'materin-ui-field__inner--has-suffix': $slots.suffix }]"
        :type="realType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <span v-if="$slots.suffix || clearable" class="materin-ui-field__suffix">
        <button
          v-if="clearable && modelValue && !disabled"
          type="button"
          class="materin-ui-field__clear"
          aria-label="清空"
          @click="handleClear"
        >×</button>
        <slot v-else name="suffix" />
      </span>
    </div>

    <div v-if="error || hint" :class="['materin-ui-field__msg', { 'materin-ui-field__msg--error': !!error }]">
      {{ error || hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  clearable?: boolean
  maxlength?: number
  label?: string
  hint?: string
  error?: string
}

interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  clearable: false,
  required: false
})

const emit = defineEmits<InputEmits>()

const inputId = computed(() => `materin-ui-field-${Math.random().toString(36).slice(2, 9)}`)
const inputRef = ref<HTMLInputElement>()
const focused = ref(false)
const passwordVisible = ref(false)

const wrapperClasses = computed(() => [
  'materin-ui-field-wrapper',
  { 'materin-ui-field-wrapper--focused': focused.value }
])

const realType = computed(() => {
  if (props.type === 'password' && passwordVisible.value) return 'text'
  return props.type
})

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleFocus = (e: FocusEvent) => {
  focused.value = true
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  focused.value = false
  emit('blur', e)
}

const handleClear = () => {
  emit('update:modelValue', '')
  inputRef.value?.focus()
}

const focus = () => inputRef.value?.focus()
const blur = () => inputRef.value?.blur()

defineExpose({ focus, blur })
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

// 命名：materin-ui-field（输入框，避免与 <input> 元素同名）
.materin-ui-field-wrapper {
  display: inline-flex;
  flex-direction: column;
  gap: $materin-space-2;
  width: 100%;

  &--focused .materin-ui-field {
    border-color: $materin-accent;
    box-shadow: 0 0 0 3px $materin-accent-soft;
  }
}

.materin-ui-field__label {
  font-size: $materin-font-size-small;
  font-weight: $materin-font-weight-medium;
  color: $materin-text;
  letter-spacing: -0.01em;
}

.materin-ui-field__required {
  color: $materin-error;
  margin-left: 2px;
}

.materin-ui-field {
  display: inline-flex;
  align-items: center;
  background: $materin-surface-3;
  border: 1px solid $materin-border;
  border-radius: $materin-radius;
  transition: all $materin-duration-normal $materin-ease-standard;

  &:hover:not(.materin-ui-field--disabled) {
    border-color: $materin-accent-soft;
  }

  &--disabled {
    background: $materin-surface-2;
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--sm { height: 30px; }
  &--md { height: 38px; }
  &--lg { height: 46px; }
}

.materin-ui-field__inner {
  flex: 1;
  height: 100%;
  padding: 0 $materin-space-3;
  background: transparent;
  border: none;
  outline: none;
  font-family: $materin-font-ui;
  font-size: $materin-font-size-body;
  color: $materin-text;
  letter-spacing: -0.01em;

  &::placeholder {
    color: $materin-text-muted;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &--has-prefix { padding-left: $materin-space-2; }
  &--has-suffix { padding-right: $materin-space-2; }
}

.materin-ui-field__prefix,
.materin-ui-field__suffix {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: $materin-text-muted;
  font-size: $materin-font-size-body;
  padding: 0 $materin-space-2;
}

.materin-ui-field__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: $materin-text-muted;
  color: $materin-surface;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  border: none;
  padding: 0;
  transition: all $materin-duration-fast $materin-ease-standard;

  &:hover {
    background: $materin-error;
    color: white;
  }
}

.materin-ui-field__msg {
  font-size: $materin-font-size-caption;
  color: $materin-text-muted;
  line-height: $materin-line-height-normal;
  padding-left: $materin-space-1;

  &--error {
    color: $materin-error;
  }
}
</style>