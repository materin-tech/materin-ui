<template>
  <div class="materin-ui-checkbox-group" :class="groupClasses" role="group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { CHECKBOX_GROUP_KEY, type ChoiceValue } from '../_shared/choice'
import { FORM_ITEM_KEY } from '../_shared/form'

defineOptions({ name: 'MiCheckboxGroup' })

interface CheckboxGroupProps {
  modelValue?: ChoiceValue[]
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  direction?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  direction: 'horizontal'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ChoiceValue[]): void
  (e: 'change', value: ChoiceValue[]): void
}>()

const item = inject(FORM_ITEM_KEY, null)

const value = computed(() => props.modelValue)

const toggle = (target: ChoiceValue) => {
  const next = value.value.includes(target)
    ? value.value.filter((entry) => entry !== target)
    : [...value.value, target]
  emit('update:modelValue', next)
  emit('change', next)
}

provide(CHECKBOX_GROUP_KEY, {
  value,
  get disabled() {
    return props.disabled || (item?.disabled ?? false)
  },
  size: props.size || item?.size || 'md',
  toggle,
  notifyChange: () => item?.notifyChange()
})

const groupClasses = computed(() => [`materin-ui-checkbox-group--${props.direction}`])
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-checkbox-group {
  display: inline-flex;
  gap: $materin-space-3;

  &--horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
