<template>
  <form class="materin-ui-form" :class="formClasses" @submit.prevent>
    <slot />
  </form>
</template>

<script setup lang="ts">
import { computed, provide, reactive } from 'vue'
import { FORM_KEY, toLabelWidth, type FormContext, type FormField, type FormRule } from '../_shared/form'

defineOptions({ name: 'MiForm' })

interface FormProps {
  model: Record<string, unknown>
  rules?: Record<string, FormRule[]>
  labelWidth?: string | number
  labelPosition?: 'left' | 'right' | 'top'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  inline?: boolean
  showMessage?: boolean
  hideRequiredAsterisk?: boolean
}

const props = withDefaults(defineProps<FormProps>(), {
  rules: () => ({}),
  labelPosition: 'right',
  size: 'md',
  disabled: false,
  inline: false,
  showMessage: true,
  hideRequiredAsterisk: false
})

const fields = reactive<FormField[]>([])

const context: FormContext = {
  get model() {
    return props.model
  },
  get rules() {
    return props.rules
  },
  get labelWidth() {
    return toLabelWidth(props.labelWidth) || '96px'
  },
  get labelPosition() {
    return props.labelPosition
  },
  get size() {
    return props.size
  },
  get disabled() {
    return props.disabled
  },
  get showMessage() {
    return props.showMessage
  },
  get hideRequiredAsterisk() {
    return props.hideRequiredAsterisk
  },
  addField: (field) => {
    if (!fields.includes(field)) fields.push(field)
  },
  removeField: (field) => {
    const index = fields.indexOf(field)
    if (index >= 0) fields.splice(index, 1)
  }
}

provide(FORM_KEY, context)

const formClasses = computed(() => [`materin-ui-form--${props.size}`, { 'materin-ui-form--inline': props.inline }])

const validate = async (): Promise<boolean> => {
  const results = await Promise.all(fields.map((field) => field.validate()))
  return results.every(Boolean)
}

const validateField = async (prop: string | string[]): Promise<boolean> => {
  const names = Array.isArray(prop) ? prop : [prop]
  const targets = fields.filter((field) => names.includes(field.prop))
  const results = await Promise.all(targets.map((field) => field.validate()))
  return results.every(Boolean)
}

const resetFields = () => {
  fields.forEach((field) => field.resetField())
}

const clearValidate = (prop?: string | string[]) => {
  fields
    .filter((field) => !prop || (Array.isArray(prop) ? prop : [prop]).includes(field.prop))
    .forEach((field) => field.clearValidate())
}

defineExpose({ validate, validateField, resetFields, clearValidate })
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-form {
  display: block;

  &--inline {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: $materin-space-3;
  }

  &--sm {
    font-size: $materin-font-size-small;
  }

  &--md {
    font-size: $materin-font-size-body;
  }

  &--lg {
    font-size: 16px;
  }
}
</style>
