<template>
  <span class="materin-ui-time-picker">
    <input
      class="materin-ui-time-picker__field materin-ui-field__inner"
      type="time"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
    />
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiTimePicker' })

interface TimePickerProps {
  /** HH:mm */
  modelValue?: string
  placeholder?: string
  /** 步进（分钟） */
  minuteStep?: number
}

const props = withDefaults(defineProps<TimePickerProps>(), {
  modelValue: '',
  placeholder: '选择时间',
  minuteStep: 1
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const onInput = (event: Event) => {
  const raw = (event.target as HTMLInputElement).value
  if (!raw) {
    emit('update:modelValue', raw)
    return
  }
  if (props.minuteStep > 1) {
    const [h, m] = raw.split(':').map(Number)
    const snapped = Math.round(m / props.minuteStep) * props.minuteStep % 60
    emit('update:modelValue', `${String(h).padStart(2, '0')}:${String(snapped).padStart(2, '0')}`)
    return
  }
  emit('update:modelValue', raw)
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-time-picker {
  display: inline-block;

  &__field {
    min-width: 110px;
  }
}
</style>
