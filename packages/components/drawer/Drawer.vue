<template>
  <Teleport to="body" :disabled="!appendToBody">
    <div
      v-if="modelValue"
      class="materin-ui-drawer"
      :class="drawerClasses"
      role="dialog"
      aria-modal="true"
      :aria-label="title || undefined"
    >
      <div v-if="modal" class="materin-ui-drawer__overlay" @click="handleOverlayClick" />

      <div class="materin-ui-drawer__panel" :style="panelStyle" tabindex="-1" ref="panelRef">
        <header v-if="withHeader" class="materin-ui-drawer__header">
          <slot name="header">
            <h3 class="materin-ui-drawer__title">{{ title }}</h3>
          </slot>
          <button v-if="showClose" class="materin-ui-drawer__close" type="button" aria-label="关闭" @click="handleClose">
            ×
          </button>
        </header>

        <div class="materin-ui-drawer__body">
          <slot />
        </div>

        <footer v-if="$slots.footer" class="materin-ui-drawer__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { useScrollLock } from '../_shared/popper'

defineOptions({ name: 'MiDrawer' })

interface DrawerProps {
  modelValue?: boolean
  title?: string
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
  size?: number | string
  showClose?: boolean
  withHeader?: boolean
  modal?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  lockScroll?: boolean
  appendToBody?: boolean
  glass?: boolean
}

const props = withDefaults(defineProps<DrawerProps>(), {
  modelValue: false,
  title: '',
  direction: 'rtl',
  size: '30%',
  showClose: true,
  withHeader: true,
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

const drawerClasses = computed(() => [`materin-ui-drawer--${props.direction}`, { 'materin-ui-drawer--glass': props.glass }])

const isHorizontal = computed(() => props.direction === 'rtl' || props.direction === 'ltr')

const panelStyle = computed(() => {
  const value = typeof props.size === 'number' ? `${props.size}px` : props.size
  return isHorizontal.value ? { width: value } : { height: value }
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-drawer {
  position: fixed;
  inset: 0;
  z-index: 2000;

  &__overlay {
    position: absolute;
    inset: 0;
    background: color-mix(in srgb, $materin-surface 72%, transparent);
    backdrop-filter: $materin-glass-blur-sm;
    -webkit-backdrop-filter: $materin-glass-blur-sm;
  }

  &__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    background: $materin-surface-2;
    color: $materin-text;
    box-shadow: $materin-elev-2;
    outline: none;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $materin-space-3;
    padding: $materin-space-4 $materin-space-5;
    border-bottom: 1px solid $materin-border;
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
    flex: 1 1 auto;
    padding: $materin-space-4 $materin-space-5;
    overflow: auto;
    font-size: $materin-font-size-body;
    line-height: $materin-line-height-normal;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: $materin-space-2;
    padding: $materin-space-3 $materin-space-5;
    border-top: 1px solid $materin-border;
  }

  &--rtl .materin-ui-drawer__panel {
    top: 0;
    right: 0;
    height: 100%;
    border-left: 1px solid $materin-glass-border;
    animation: materin-ui-drawer-in-right $materin-duration-normal $materin-ease-out;
  }

  &--ltr .materin-ui-drawer__panel {
    top: 0;
    left: 0;
    height: 100%;
    border-right: 1px solid $materin-glass-border;
    animation: materin-ui-drawer-in-left $materin-duration-normal $materin-ease-out;
  }

  &--ttb .materin-ui-drawer__panel {
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid $materin-glass-border;
    animation: materin-ui-drawer-in-down $materin-duration-normal $materin-ease-out;
  }

  &--btt .materin-ui-drawer__panel {
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid $materin-glass-border;
    animation: materin-ui-drawer-in-up $materin-duration-normal $materin-ease-out;
  }

  &--glass .materin-ui-drawer__panel {
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur;
    -webkit-backdrop-filter: $materin-glass-blur;
  }
}

@keyframes materin-ui-drawer-in-right {
  from {
    transform: translateX(100%);
  }
}

@keyframes materin-ui-drawer-in-left {
  from {
    transform: translateX(-100%);
  }
}

@keyframes materin-ui-drawer-in-down {
  from {
    transform: translateY(-100%);
  }
}

@keyframes materin-ui-drawer-in-up {
  from {
    transform: translateY(100%);
  }
}
</style>
