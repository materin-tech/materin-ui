<template>
  <Teleport to="body" :disabled="!appendToBody">
    <div
      v-if="modelValue"
      class="materin-ui-dialog"
      :class="dialogClasses"
      role="dialog"
      aria-modal="true"
      :aria-label="title || undefined"
    >
      <div v-if="modal" class="materin-ui-dialog__overlay" @click="handleOverlayClick" />
      <div ref="panelRef" class="materin-ui-dialog__panel" role="document" :style="panelStyle" tabindex="-1">
        <header class="materin-ui-dialog__header">
          <slot name="header">
            <h3 class="materin-ui-dialog__title">{{ title }}</h3>
          </slot>
          <button v-if="showClose" class="materin-ui-dialog__close" type="button" aria-label="关闭" @click="handleClose">
            ×
          </button>
        </header>

        <div class="materin-ui-dialog__body">
          <slot />
        </div>

        <footer v-if="$slots.footer" class="materin-ui-dialog__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { useScrollLock } from '../_shared/popper'

defineOptions({ name: 'MiDialog' })

interface DialogProps {
  modelValue?: boolean
  title?: string
  width?: number | string
  /** 距顶部的距离 */
  top?: string
  alignCenter?: boolean
  fullscreen?: boolean
  showClose?: boolean
  modal?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  lockScroll?: boolean
  appendToBody?: boolean
  glass?: boolean
}

const props = withDefaults(defineProps<DialogProps>(), {
  modelValue: false,
  title: '',
  width: '520px',
  top: '15vh',
  alignCenter: false,
  fullscreen: false,
  showClose: true,
  modal: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  lockScroll: true,
  appendToBody: true,
  glass: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
}>()

const panelRef = ref<HTMLElement>()
const lock = useScrollLock(computed(() => props.modelValue && props.lockScroll))

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleClose = () => close()

const handleOverlayClick = () => {
  if (props.closeOnClickModal) close()
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnPressEscape) close()
}

watch(
  () => props.modelValue,
  async (value) => {
    lock.sync()
    if (value) {
      if (typeof document !== 'undefined') document.addEventListener('keydown', onKeydown)
      emit('open')
      await nextTick()
      panelRef.value?.focus()
    } else if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', onKeydown)
    }
  }
)

onUnmounted(() => {
  if (typeof document !== 'undefined') document.removeEventListener('keydown', onKeydown)
  lock.release()
})

const dialogClasses = computed(() => [
  {
    'materin-ui-dialog--center': props.alignCenter,
    'materin-ui-dialog--fullscreen': props.fullscreen,
    'materin-ui-dialog--glass': props.glass
  }
])

const panelStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.fullscreen) return style
  if (props.alignCenter) return style
  style.marginTop = props.top
  style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  return style
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-dialog {
  position: fixed;
  inset: 0;
  z-index: 2000;
  overflow: auto;

  &__overlay {
    position: absolute;
    inset: 0;
    background: color-mix(in srgb, $materin-surface 72%, transparent);
    backdrop-filter: $materin-glass-blur-sm;
    -webkit-backdrop-filter: $materin-glass-blur-sm;
  }

  &__panel {
    position: relative;
    margin: 0 auto;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius-lg;
    background: $materin-surface-2;
    box-shadow: $materin-elev-2;
    color: $materin-text;
    animation: materin-ui-dialog-in $materin-duration-normal $materin-ease-out;
    outline: none;

    &:focus-visible {
      border-color: $materin-accent-border;
    }
  }

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: $materin-space-3;
    padding: $materin-space-4 $materin-space-5 $materin-space-2;
  }

  &__title {
    margin: 0;
    font-size: $materin-font-size-h3;
    font-weight: $materin-font-weight-medium;
  }

  &__close {
    flex: 0 0 auto;
    padding: 0 $materin-space-1;
    border: none;
    background: transparent;
    color: $materin-text-muted;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;

    &:hover {
      color: $materin-text;
    }
  }

  &__body {
    padding: $materin-space-2 $materin-space-5 $materin-space-4;
    font-size: $materin-font-size-body;
    line-height: $materin-line-height-normal;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: $materin-space-2;
    padding: $materin-space-3 $materin-space-5 $materin-space-5;
  }

  &--center {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $materin-space-4;

    .materin-ui-dialog__panel {
      margin: auto;
    }
  }

  &--fullscreen .materin-ui-dialog__panel {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    margin: 0;
    border-radius: 0;
  }

  &--glass .materin-ui-dialog__panel {
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur;
    -webkit-backdrop-filter: $materin-glass-blur;
  }
}

@keyframes materin-ui-dialog-in {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.99);
  }
}
</style>
