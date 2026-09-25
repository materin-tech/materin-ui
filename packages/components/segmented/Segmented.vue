<template>
  <div class="materin-ui-segmented" :class="[`materin-ui-segmented--${size}`, { 'materin-ui-segmented--block': block }]" role="tablist">
    <button
      v-for="(option, i) in options"
      :key="String(option.value)"
      class="materin-ui-segmented__option"
      :class="{ 'is-active': option.value === value }"
      type="button"
      role="tab"
      :aria-selected="option.value === value"
      @click="select(option.value, i)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiSegmented' })

interface SegmentedOption {
  label: string
  value: string | number
  disabled?: boolean
}

interface SegmentedProps {
  options?: SegmentedOption[]
  /** 受控值 */
  modelValue?: string | number
  size?: 'sm' | 'md'
  /** 撑满一行 */
  block?: boolean
}

const props = withDefaults(defineProps<SegmentedProps>(), {
  options: () => [],
  modelValue: undefined,
  size: 'md',
  block: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const value = computed(() => props.modelValue)

const select = (value_: string | number, index: number) => {
  if (props.options[index]?.disabled) return
  if (value_ === value.value) return
  emit('update:modelValue', value_)
  emit('change', value_)
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-segmented {
  display: inline-flex;
  gap: 2px;
  padding: 2px;
  background: $materin-surface-4;
  border-radius: $materin-radius;

  &__option {
    padding: $materin-space-1 $materin-space-3;
    border: none;
    border-radius: calc(#{$materin-radius} - 2px);
    background: transparent;
    color: $materin-text-muted;
    font-family: $materin-font-ui;
    font-size: $materin-font-size-small;
    cursor: pointer;
    transition: all $materin-duration-fast $materin-ease-standard;

    &:hover:not(.is-active) {
      color: $materin-text;
    }

    &.is-active {
      background: $materin-surface-2;
      color: $materin-text;
      box-shadow: $materin-elev-1;
    }
  }

  &--block {
    display: flex;

    .materin-ui-segmented__option {
      flex: 1 1 0;
    }
  }

  &--sm &__option {
    padding: 2px $materin-space-2;
    font-size: $materin-font-size-caption;
  }
}
</style>
