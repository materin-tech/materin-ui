<template>
  <span class="materin-ui-popover" ref="rootRef" :class="popoverClasses">
    <span
      class="materin-ui-popover__trigger"
      @mouseenter="trigger === 'hover' && open()"
      @mouseleave="trigger === 'hover' && close()"
      @click="handleTriggerClick"
      @focusin="trigger === 'focus' && open()"
      @focusout="trigger === 'focus' && close()"
    >
      <slot name="reference" />
    </span>

    <div
      v-if="visible"
      class="materin-ui-popover__popper"
      :class="`materin-ui-popover--${placement}`"
      :style="popperStyle"
      role="dialog"
    >
      <p v-if="title || $slots.title" class="materin-ui-popover__title">
        <slot name="title">{{ title }}</slot>
      </p>
      <div class="materin-ui-popover__content">
        <slot />
      </div>
    </div>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useClickOutside, type PopperPlacement } from '../_shared/popper'

defineOptions({ name: 'MiPopover' })

interface PopoverProps {
  modelValue?: boolean
  trigger?: 'click' | 'hover' | 'focus'
  title?: string
  placement?: PopperPlacement
  width?: number | string
  disabled?: boolean
}

const props = withDefaults(defineProps<PopoverProps>(), {
  modelValue: undefined,
  trigger: 'click',
  title: '',
  placement: 'bottom',
  disabled: false
})

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const rootRef = ref<HTMLElement>()
const inner = ref(props.modelValue ?? false)

const visible = computed(() => (props.modelValue === undefined ? inner.value : props.modelValue))

const setVisible = (value: boolean) => {
  inner.value = value
  emit('update:modelValue', value)
}

const open = () => {
  if (props.disabled) return
  setVisible(true)
}

const close = () => {
  if (props.disabled) return
  setVisible(false)
}

const handleTriggerClick = () => {
  if (props.disabled) return
  if (props.trigger === 'click') {
    visible.value ? close() : open()
  }
}

// 点击触发时，点外部关闭
useClickOutside(rootRef, () => {
  if (props.trigger === 'click' && visible.value) close()
})

const popperStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width !== undefined) style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  return style
})

const popoverClasses = computed(() => [{ 'is-open': visible.value, 'is-disabled': props.disabled }])
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-popover {
  position: relative;
  display: inline-flex;

  &__trigger {
    display: inline-flex;
  }

  &__popper {
    position: absolute;
    z-index: 2100;
    min-width: 160px;
    max-width: 340px;
    padding: $materin-space-3 $materin-space-4;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius-lg;
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur;
    -webkit-backdrop-filter: $materin-glass-blur;
    box-shadow: $materin-elev-2;
    color: $materin-text;
    font-size: $materin-font-size-small;
    animation: materin-ui-popper-in $materin-duration-fast $materin-ease-out;
  }

  &--top {
    bottom: calc(100% + 8px);
    left: 0;
  }

  &--bottom {
    top: calc(100% + 8px);
    left: 0;
  }

  &--left {
    right: calc(100% + 8px);
    top: 0;
  }

  &--right {
    left: calc(100% + 8px);
    top: 0;
  }

  &__title {
    margin: 0 0 $materin-space-2;
    font-weight: $materin-font-weight-medium;
  }

  &__content {
    color: $materin-text-muted;
    line-height: $materin-line-height-normal;
  }
}
</style>
