<template>
  <span class="materin-ui-color-picker">
    <button
      v-for="preset in presets"
      :key="preset"
      class="materin-ui-color-picker__swatch"
      :class="{ 'is-active': preset.toLowerCase() === modelValue.toLowerCase() }"
      type="button"
      :style="{ background: preset }"
      :aria-label="`选择 ${preset}`"
      @click="emit('update:modelValue', preset)"
    />
    <input
      class="materin-ui-color-picker__input"
      type="color"
      :value="modelValue || '#000000'"
      :aria-label="'自定义颜色'"
      @input="onNative"
    />
    <code v-if="showValue" class="materin-ui-color-picker__value">{{ modelValue }}</code>
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiColorPicker' })

interface ColorPickerProps {
  /** HEX 颜色（受控） */
  modelValue?: string
  presets?: string[]
  showValue?: boolean
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: '',
  presets: () => ['#5b8cff', '#2f5fe0', '#30a46c', '#d97706', '#dc2626', '#8b5cf6', '#64748b'],
  showValue: true
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const onNative = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-color-picker {
  display: inline-flex;
  align-items: center;
  gap: $materin-space-2;

  &__swatch {
    width: 22px;
    height: 22px;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius;
    cursor: pointer;

    &.is-active {
      outline: 2px solid $materin-accent;
      outline-offset: 1px;
    }
  }

  &__input {
    width: 26px;
    height: 26px;
    border: 1px solid $materin-border;
    border-radius: $materin-radius;
    background: transparent;
    cursor: pointer;
    padding: 0;
  }

  &__value {
    color: $materin-text-muted;
    font-size: $materin-font-size-caption;
    font-variant-numeric: tabular-nums;
  }
}
</style>
