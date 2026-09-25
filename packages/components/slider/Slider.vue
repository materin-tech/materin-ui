<template>
  <div class="materin-ui-slider" :class="sliderClasses">
    <div class="materin-ui-slider__runway" ref="runwayEl" @pointerdown="handleRunwayDown">
      <div class="materin-ui-slider__bar" :style="barStyle" />
      <button
        v-for="(_, index) in handles"
        :key="index"
        class="materin-ui-slider__button"
        type="button"
        role="slider"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="handleValues[index]"
        :aria-label="`取值 ${index + 1}`"
        :style="{ left: `${percentOf(handleValues[index])}%` }"
        :disabled="disabled"
        @pointerdown.stop="startDrag(index, $event)"
        @keydown.left.prevent="nudge(index, -step)"
        @keydown.right.prevent="nudge(index, step)"
      />
    </div>
    <span v-if="showValue" class="materin-ui-slider__value">{{ displayValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

defineOptions({ name: 'MiSlider' })

interface SliderProps {
  modelValue?: number | [number, number]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  /** 双滑块 */
  range?: boolean
  showValue?: boolean
}

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  range: false,
  showValue: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | [number, number]): void
  (e: 'change', value: number | [number, number]): void
}>()

const runwayEl = ref<HTMLElement>()
const dragging = ref<number | null>(null)

const handles = computed(() => (props.range ? [0, 1] : [0]))

const handleValues = computed<number[]>(() =>
  props.range && Array.isArray(props.modelValue)
    ? [props.modelValue[0], props.modelValue[1]]
    : [Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue]
)

const percentOf = (value: number) => ((value - props.min) / (props.max - props.min)) * 100

const barStyle = computed(() => {
  if (props.range && handleValues.value.length > 1) {
    const start = percentOf(handleValues.value[0])
    const end = percentOf(handleValues.value[1])
    return { left: `${start}%`, width: `${end - start}%` }
  }
  return { left: '0%', width: `${percentOf(handleValues.value[0])}%` }
})

const displayValue = computed(() =>
  props.range && Array.isArray(props.modelValue)
    ? `${props.modelValue[0]} – ${props.modelValue[1]}`
    : String(handleValues.value[0])
)

const snap = (value: number) => {
  const stepped = Math.round((value - props.min) / props.step) * props.step + props.min
  return Math.min(props.max, Math.max(props.min, Number(stepped.toFixed(6))))
}

const emitValue = (values: number[]) => {
  const next: number | [number, number] = props.range ? [values[0], values[1]] : values[0]
  emit('update:modelValue', next)
  emit('change', next)
}

const valueFromEvent = (event: PointerEvent) => {
  const rect = runwayEl.value?.getBoundingClientRect()
  if (!rect) return props.min
  const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
  return snap(props.min + ratio * (props.max - props.min))
}

const startDrag = (index: number, event: PointerEvent) => {
  if (props.disabled) return
  dragging.value = index
  const move = (moveEvent: PointerEvent) => {
    const values = [...handleValues.value]
    const next = valueFromEvent(moveEvent)
    values[index] = next
    if (props.range) values.sort((a, b) => a - b)
    emitValue(values)
  }
  const up = () => {
    dragging.value = null
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', up)
  }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', up)
  move(event)
}

const handleRunwayDown = (event: PointerEvent) => {
  if (props.disabled) return
  const next = valueFromEvent(event)
  const values = [...handleValues.value]
  if (props.range) {
    const nearest = Math.abs(values[0] - next) <= Math.abs(values[1] - next) ? 0 : 1
    values[nearest] = next
    values.sort((a, b) => a - b)
  } else {
    values[0] = next
  }
  emitValue(values)
}

const nudge = (index: number, delta: number) => {
  if (props.disabled) return
  const values = [...handleValues.value]
  values[index] = snap(values[index] + delta)
  if (props.range) values.sort((a, b) => a - b)
  emitValue(values)
}

onUnmounted(() => {
  dragging.value = null
})

const sliderClasses = computed(() => [
  { 'is-disabled': props.disabled, 'is-range': props.range, 'is-dragging': dragging.value !== null }
])
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-slider {
  display: flex;
  align-items: center;
  gap: $materin-space-3;
  width: 100%;

  &__runway {
    position: relative;
    flex: 1 1 auto;
    height: 6px;
    border-radius: 999px;
    background: $materin-surface-4;
    cursor: pointer;
  }

  &__bar {
    position: absolute;
    top: 0;
    height: 100%;
    border-radius: 999px;
    background: $materin-accent;
  }

  &__button {
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    margin-left: -8px;
    transform: translateY(-50%);
    border: 2px solid $materin-accent;
    border-radius: 50%;
    background: $materin-surface;
    box-shadow: $materin-elev-1;
    cursor: grab;
    padding: 0;

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px $materin-accent-soft;
    }
  }

  &__value {
    flex: 0 0 auto;
    min-width: 54px;
    color: $materin-text-muted;
    font-size: $materin-font-size-small;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  &.is-dragging &__button {
    cursor: grabbing;
  }

  &.is-disabled {
    opacity: 0.55;

    .materin-ui-slider__runway {
      cursor: not-allowed;
    }

    .materin-ui-slider__button {
      cursor: not-allowed;
    }
  }
}
</style>
