<template>
  <span
    class="materin-ui-tooltip"
    :class="tooltipClasses"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @focusin="handleEnter"
    @focusout="handleLeave"
  >
    <slot />
    <span
      v-if="visible && (content || $slots.content)"
      class="materin-ui-tooltip__popper"
      :class="`materin-ui-tooltip--${placement}`"
      role="tooltip"
    >
      <slot name="content">{{ content }}</slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { type PopperPlacement } from '../_shared/popper'

defineOptions({ name: 'MiTooltip' })

interface TooltipProps {
  content?: string
  placement?: PopperPlacement
  disabled?: boolean
  /** 出现延迟（毫秒） */
  showAfter?: number
  /** 消失延迟（毫秒） */
  hideAfter?: number
}

const props = withDefaults(defineProps<TooltipProps>(), {
  content: '',
  placement: 'top',
  disabled: false,
  showAfter: 120,
  hideAfter: 60
})

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

const clear = () => {
  if (timer) clearTimeout(timer)
  timer = undefined
}

const handleEnter = () => {
  if (props.disabled) return
  clear()
  timer = setTimeout(() => {
    visible.value = true
  }, props.showAfter)
}

const handleLeave = () => {
  clear()
  if (!visible.value) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.hideAfter)
}

onUnmounted(clear)

const tooltipClasses = computed(() => [{ 'is-disabled': props.disabled }])
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-tooltip {
  position: relative;
  display: inline-flex;

  &__popper {
    position: absolute;
    z-index: 2100;
    max-width: 260px;
    padding: $materin-space-2 $materin-space-3;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius;
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur-sm;
    -webkit-backdrop-filter: $materin-glass-blur-sm;
    box-shadow: $materin-elev-2;
    color: $materin-text;
    font-size: $materin-font-size-small;
    line-height: $materin-line-height-normal;
    white-space: nowrap;
    animation: materin-ui-popper-in $materin-duration-fast $materin-ease-out;
  }

  &--top {
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }

  &--bottom {
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }

  &--left {
    right: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }

  &--right {
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }
}

@keyframes materin-ui-popper-in {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
}
</style>
