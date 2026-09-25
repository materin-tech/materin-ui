<template>
  <Teleport to="body">
    <div v-if="active && rect" class="materin-ui-tour">
      <div class="materin-ui-tour__highlight" :style="highlightStyle" @click="stop" />

      <div class="materin-ui-tour__popper" :class="`materin-ui-tour--${placement}`" :style="popperStyle" role="dialog">
        <header class="materin-ui-tour__header">
          <p class="materin-ui-tour__title">{{ step.title }}</p>
          <button v-if="showClose" class="materin-ui-tour__close" type="button" aria-label="关闭" @click="handleClose">
            ×
          </button>
        </header>

        <div class="materin-ui-tour__body">
          <slot name="body" :step="step">{{ step.description }}</slot>
        </div>

        <footer class="materin-ui-tour__footer">
          <span class="materin-ui-tour__indicator">{{ current + 1 }} / {{ steps.length }}</span>
          <span class="materin-ui-tour__actions">
            <button v-if="current > 0" class="materin-ui-tour__prev" type="button" @click="prev">
              {{ prevText }}
            </button>
            <button class="materin-ui-tour__next" type="button" @click="next">
              {{ isLast ? finishText : nextText }}
            </button>
          </span>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import type { TourStep } from './types'

defineOptions({ name: 'MiTour' })

interface TourProps {
  modelValue?: number
  steps?: TourStep[]
  showClose?: boolean
  gap?: number
  prevText?: string
  nextText?: string
  finishText?: string
  scrollToTarget?: boolean
}

const props = withDefaults(defineProps<TourProps>(), {
  modelValue: -1,
  steps: () => [],
  showClose: true,
  gap: 6,
  prevText: '上一步',
  nextText: '下一步',
  finishText: '完成',
  scrollToTarget: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
  (e: 'finish'): void
  (e: 'close'): void
}>()

const rect = ref<DOMRect | null>(null)

const current = computed(() => props.modelValue)
const active = computed(() => current.value >= 0 && current.value < props.steps.length)
const step = computed<TourStep>(() => props.steps[Math.max(current.value, 0)] ?? { target: '', title: '' })
const isLast = computed(() => current.value === props.steps.length - 1)
const placement = computed(() => step.value.placement ?? 'bottom')

const measure = async () => {
  if (!active.value || typeof document === 'undefined') {
    rect.value = null
    return
  }
  await nextTick()
  const target = document.querySelector(step.value.target)
  if (!target) {
    rect.value = null
    return
  }
  if (props.scrollToTarget) {
    target.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }
  rect.value = target.getBoundingClientRect()
}

const update = () => {
  if (!active.value) return
  const target = document.querySelector(step.value.target)
  if (target) rect.value = target.getBoundingClientRect()
}

watch(() => [props.modelValue, props.steps], () => {
  void measure()
  if (props.modelValue >= 0) emit('change', props.modelValue)
}, { immediate: true, deep: true })

const onViewportChange = () => update()

if (typeof window !== 'undefined') {
  window.addEventListener('resize', onViewportChange)
  window.addEventListener('scroll', onViewportChange, true)
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') handleClose()
}

if (typeof document !== 'undefined') {
  document.addEventListener('keydown', onKeydown)
}

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', onViewportChange)
    window.removeEventListener('scroll', onViewportChange, true)
  }
  if (typeof document !== 'undefined') document.removeEventListener('keydown', onKeydown)
})

const next = () => {
  if (isLast.value) {
    emit('update:modelValue', -1)
    emit('finish')
    return
  }
  emit('update:modelValue', current.value + 1)
}

const prev = () => {
  if (current.value <= 0) return
  emit('update:modelValue', current.value - 1)
}

const handleClose = () => {
  emit('update:modelValue', -1)
  emit('close')
}

const stop = (event: MouseEvent) => event.stopPropagation()

const highlightStyle = computed(() => {
  if (!rect.value) return {}
  const { top, left, width, height } = rect.value
  return {
    top: `${top - props.gap}px`,
    left: `${left - props.gap}px`,
    width: `${width + props.gap * 2}px`,
    height: `${height + props.gap * 2}px`
  }
})

const popperStyle = computed(() => {
  if (!rect.value) return {}
  const { top, left, bottom, right, width } = rect.value
  const style: Record<string, string> = {}
  if (placement.value === 'bottom') {
    style.top = `${bottom + props.gap + 12}px`
    style.left = `${left}px`
  } else if (placement.value === 'top') {
    style.top = `${top - props.gap - 12}px`
    style.left = `${left}px`
    style.transform = 'translateY(-100%)'
  } else if (placement.value === 'right') {
    style.top = `${top}px`
    style.left = `${right + props.gap + 12}px`
  } else {
    style.top = `${top}px`
    style.left = `${left - props.gap - 12}px`
    style.transform = 'translateX(-100%)'
  }
  if (typeof window !== 'undefined') {
    const maxLeft = window.innerWidth - 340
    if (Number.parseFloat(style.left) > maxLeft) style.left = `${Math.max(16, maxLeft)}px`
    if (Number.parseFloat(style.left) < 16) style.left = '16px'
  }
  void width
  return style
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-tour {
  position: fixed;
  inset: 0;
  z-index: 2300;

  &__highlight {
    position: fixed;
    border: 1px solid $materin-accent-border;
    border-radius: $materin-radius;
    box-shadow: 0 0 0 9999px color-mix(in srgb, $materin-surface 70%, transparent);
    transition: all $materin-duration-normal $materin-ease-out;
  }

  &__popper {
    position: fixed;
    width: 320px;
    padding: $materin-space-4;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius-lg;
    background: $materin-surface-2;
    box-shadow: $materin-elev-2;
    color: $materin-text;
    animation: materin-ui-popper-in $materin-duration-fast $materin-ease-out;
  }

  &__popper::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 1px solid $materin-glass-border;
    background: $materin-surface-2;
    transform: rotate(45deg);
  }

  &--bottom &__popper::after {
    top: -5px;
    left: 20px;
    border-right: none;
    border-bottom: none;
  }

  &--top &__popper::after {
    bottom: -5px;
    left: 20px;
    border-left: none;
    border-top: none;
  }

  &--right &__popper::after {
    top: 16px;
    left: -5px;
    border-right: none;
    border-top: none;
  }

  &--left &__popper::after {
    top: 16px;
    right: -5px;
    border-left: none;
    border-bottom: none;
  }

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: $materin-space-2;
  }

  &__title {
    margin: 0;
    font-size: $materin-font-size-body;
    font-weight: $materin-font-weight-medium;
  }

  &__close {
    flex: 0 0 auto;
    padding: 0 $materin-space-1;
    border: none;
    background: transparent;
    color: $materin-text-muted;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;

    &:hover {
      color: $materin-text;
    }
  }

  &__body {
    margin-top: $materin-space-2;
    color: $materin-text-muted;
    font-size: $materin-font-size-small;
    line-height: $materin-line-height-normal;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $materin-space-3;
    margin-top: $materin-space-4;
  }

  &__indicator {
    color: $materin-text-faint;
    font-size: $materin-font-size-small;
    font-variant-numeric: tabular-nums;
  }

  &__actions {
    display: inline-flex;
    gap: $materin-space-2;
  }

  &__prev,
  &__next {
    padding: $materin-space-1 $materin-space-3;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius;
    font-family: $materin-font-ui;
    font-size: $materin-font-size-small;
    cursor: pointer;
    transition: all $materin-duration-fast $materin-ease-standard;
  }

  &__prev {
    background: transparent;
    color: $materin-text;

    &:hover {
      background: $materin-surface-4;
    }
  }

  &__next {
    border-color: transparent;
    background: $materin-accent;
    color: $materin-on-accent;

    &:hover {
      background: $materin-accent-strong;
    }
  }
}
</style>
