<template>
  <div class="materin-ui-radio-group" :class="groupClasses" role="radiogroup">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { RADIO_GROUP_KEY, type ChoiceValue } from '../_shared/choice'
import { FORM_ITEM_KEY } from '../_shared/form'

defineOptions({ name: 'MiRadioGroup' })

interface RadioGroupProps {
  modelValue?: ChoiceValue
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  direction?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  direction: 'horizontal'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ChoiceValue | undefined): void
  (e: 'change', value: ChoiceValue | undefined): void
}>()

const item = inject(FORM_ITEM_KEY, null)

const value = computed(() => props.modelValue)

const select = (target: ChoiceValue) => {
  emit('update:modelValue', target)
  emit('change', target)
}

provide(RADIO_GROUP_KEY, {
  value,
  get disabled() {
    return props.disabled || (item?.disabled ?? false)
  },
  size: props.size || item?.size || 'md',
  select,
  notifyChange: () => item?.notifyChange()
})

const groupClasses = computed(() => [`materin-ui-radio-group--${props.direction}`])
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-radio-group {
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
