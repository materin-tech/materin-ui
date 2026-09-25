<template>
  <div
    class="materin-ui-form-item"
    :class="itemClasses"
    :style="itemStyle"
  >
    <label v-if="label || $slots.label" class="materin-ui-form-item__label" :for="inputId">
      <span class="materin-ui-form-item__required" v-if="isRequired && !form?.hideRequiredAsterisk" aria-hidden="true">*</span>
      <slot name="label">{{ label }}</slot>
    </label>

    <div class="materin-ui-form-item__content">
      <slot />

      <p
        v-if="visibleError"
        class="materin-ui-form-item__error"
        :id="errorId"
        role="alert"
      >
        {{ visibleError }}
      </p>

      <p v-else-if="hint" class="materin-ui-form-item__hint">{{ hint }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, provide, ref } from 'vue'
import {
  FORM_ITEM_KEY,
  FORM_KEY,
  runRules,
  toLabelWidth,
  useFieldId,
  type FormItemContext,
  type FormRule,
  type FormTrigger
} from '../_shared/form'

defineOptions({ name: 'MiFormItem' })

interface FormItemProps {
  /** model 里的字段名 */
  prop?: string
  label?: string
  labelWidth?: string | number
  required?: boolean
  rules?: FormRule[]
  error?: string
  hint?: string
  showMessage?: boolean
}

const props = withDefaults(defineProps<FormItemProps>(), {
  showMessage: undefined
})

const form = inject(FORM_KEY, null)
const inputId = useFieldId()
const errorId = `${inputId}-error`
const innerError = ref('')
const initialValue = ref<unknown>(undefined)

const fieldRules = computed<FormRule[]>(() => {
  const fromForm = props.prop && form ? form.rules[props.prop] : undefined
  return props.rules || fromForm || []
})

const isRequired = computed(() => props.required ?? fieldRules.value.some((rule) => rule.required))
const showMessage = computed(() => props.showMessage ?? form?.showMessage ?? true)
const visibleError = computed(() => props.error || (showMessage.value ? innerError.value : ''))
const isError = computed(() => !!visibleError.value)
const describedby = computed(() => (visibleError.value ? errorId : undefined))

const itemClasses = computed(() => [`materin-ui-form-item--${labelPosition.value}`, { 'is-error': isError.value }])

const labelPosition = computed(() => form?.labelPosition || 'right')

const itemStyle = computed(() => {
  const width = toLabelWidth(props.labelWidth)
  return width ? { '--materin-form-item-label-width': width } : undefined
})

const value = computed(() => (props.prop && form ? form.model[props.prop] : undefined))

const validate = async (trigger?: FormTrigger): Promise<boolean> => {
  const message = await runRules(value.value, fieldRules.value, form?.model || {}, trigger)
  innerError.value = message || ''
  return !message
}

const clearValidate = () => {
  innerError.value = ''
}

const resetField = () => {
  innerError.value = ''
  if (props.prop && form) {
    form.model[props.prop] = initialValue.value
  }
}

const itemContext: FormItemContext = {
  get inputId() {
    return inputId
  },
  get describedby() {
    return describedby.value || ''
  },
  get isError() {
    return isError.value
  },
  get disabled() {
    return form?.disabled ?? false
  },
  get size() {
    return form?.size ?? 'md'
  },
  notifyChange: () => {
    void validate('change')
  },
  notifyBlur: () => {
    void validate('blur')
  }
}

provide(FORM_ITEM_KEY, itemContext)

onMounted(() => {
  if (!props.prop) return
  initialValue.value = form ? form.model[props.prop] : undefined
  form?.addField({ prop: props.prop, validate, clearValidate, resetField })
})

onUnmounted(() => {
  if (!props.prop) return
  form?.removeField({ prop: props.prop, validate, clearValidate, resetField })
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-form-item {
  display: flex;
  margin-bottom: $materin-space-4;

  &__label {
    flex: 0 0 auto;
    padding-top: 9px;
    padding-right: $materin-space-3;
    color: $materin-text-muted;
    font-size: $materin-font-size-small;
    text-align: right;
    line-height: $materin-line-height-normal;
  }

  &__required {
    margin-right: 2px;
    color: $materin-error;
  }

  &__content {
    flex: 1 1 auto;
    min-width: 0;
  }

  &__error,
  &__hint {
    margin: $materin-space-1 0 0;
    font-size: $materin-font-size-caption;
    line-height: $materin-line-height-normal;
  }

  &__error {
    color: $materin-error;
  }

  &__hint {
    color: $materin-text-faint;
  }

  // 标签位置
  &--right .materin-ui-form-item__label,
  &--left .materin-ui-form-item__label {
    width: var(--materin-form-item-label-width, 96px);
  }

  &--left .materin-ui-form-item__label {
    text-align: left;
  }

  &--top {
    display: block;

    .materin-ui-form-item__label {
      display: block;
      width: auto;
      padding: 0 0 $materin-space-1;
      text-align: left;
    }
  }

  &.is-error .materin-ui-field,
  &.is-error .materin-ui-select__trigger,
  &.is-error .materin-ui-input-number__inner {
    border-color: $materin-error;
  }
}
</style>
