<template>
  <div
    v-if="visible"
    class="materin-ui-select-option"
    :class="optionClasses"
    role="option"
    :aria-selected="selected"
    @click="handleSelect"
    @mouseenter="select?.setActive(id)"
  >
    <span class="materin-ui-select-option__label"><slot>{{ label }}</slot></span>
    <span v-if="selected" class="materin-ui-select-option__check" aria-hidden="true">✓</span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import { SELECT_KEY, type ChoiceValue } from '../_shared/choice'

defineOptions({ name: 'MiOption' })

interface OptionProps {
  value: ChoiceValue
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<OptionProps>(), {
  label: ''
})

const select = inject(SELECT_KEY, null)
const id = `mi-option-${Math.random().toString(36).slice(2, 9)}`
const visible = ref(true)

const selected = computed(() => (select ? select.isSelected(props.value) : false))
const optionClasses = computed(() => [
  'materin-ui-select-option--entry',
  {
    'is-selected': selected.value,
    'is-disabled': !!props.disabled,
    'is-active': select ? select.isActive(id) : false
  }
])

onMounted(() => {
  select?.register({ id, value: props.value, label: props.label, disabled: props.disabled })
})

onUnmounted(() => select?.unregister(id))

const handleSelect = () => {
  if (props.disabled) return
  select?.select(props.value)
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $materin-space-2;
  padding: $materin-space-2 $materin-space-3;
  border-radius: $materin-radius;
  color: $materin-text;
  font-size: $materin-font-size-small;
  cursor: pointer;
  transition: background $materin-duration-fast $materin-ease-standard;

  &--entry {
    margin: 1px 0;
  }

  &:hover,
  &.is-active {
    background: $materin-accent-soft;
  }

  &.is-selected {
    color: $materin-accent;
    font-weight: $materin-font-weight-medium;
  }

  &.is-disabled {
    color: $materin-text-faint;
    cursor: not-allowed;
    background: transparent;
  }

  &__label {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__check {
    color: $materin-accent;
  }
}
</style>
