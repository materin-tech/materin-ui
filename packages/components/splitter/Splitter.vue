<template>
  <div
    ref="rootRef"
    class="materin-ui-splitter"
    :class="[`materin-ui-splitter--${direction}`, { 'is-dragging': dragging }]"
  >
    <div class="materin-ui-splitter__pane" :style="paneStyle(0)"><slot name="first" /></div>
    <div
      class="materin-ui-splitter__handle"
      role="separator"
      :aria-orientation="direction"
      tabindex="0"
      @pointerdown="startDrag"
      @keydown="onKeydown"
    />
    <div class="materin-ui-splitter__pane" :style="paneStyle(1)"><slot name="second" /></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'MiSplitter' })

interface SplitterProps {
  direction?: 'horizontal' | 'vertical'
  /** 第一栏初始百分比 */
  initial?: number
  min?: number
  max?: number
}

const props = withDefaults(defineProps<SplitterProps>(), {
  direction: 'horizontal',
  initial: 50,
  min: 15,
  max: 85
})

const rootRef = ref<HTMLElement>()
const percent = ref(props.initial)
const dragging = ref(false)

const clamp = (value: number) => Math.min(props.max, Math.max(props.min, value))

const startDrag = (event: PointerEvent) => {
  dragging.value = true
  const move = (e: PointerEvent) => {
    const rect = rootRef.value?.getBoundingClientRect()
    if (!rect) return
    const raw = props.direction === 'horizontal'
      ? ((e.clientX - rect.left) / rect.width) * 100
      : ((e.clientY - rect.top) / rect.height) * 100
    percent.value = clamp(raw)
  }
  const up = () => {
    dragging.value = false
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }
}

const onKeydown = (event: KeyboardEvent) => {
  const delta = props.direction === 'horizontal' ? 2 : 2
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    percent.value = clamp(percent.value - delta)
  } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    percent.value = clamp(percent.value + delta)
  }
}

const paneStyle = (index: 0 | 1) => {
  const size = index === 0 ? percent.value : 100 - percent.value
  const key = props.direction === 'horizontal' ? 'width' : 'height'
  return { [key]: `${size}%` }
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-splitter {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 120px;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }

  &__pane {
    min-width: 0;
    min-height: 0;
    overflow: auto;
  }

  &__handle {
    flex: 0 0 6px;
    background: $materin-surface-4;
    cursor: col-resize;
    transition: background $materin-duration-fast $materin-ease-standard;

    &:hover,
    &:focus-visible {
      background: $materin-accent;
      outline: none;
    }
  }

  &--vertical &__handle {
    cursor: row-resize;
  }

  &.is-dragging {
    user-select: none;
    cursor: col-resize;
  }
}
</style>
