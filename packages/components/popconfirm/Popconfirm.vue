<template>
  <span class="materin-ui-popconfirm" ref="rootRef" :class="confirmClasses">
    <span class="materin-ui-popconfirm__trigger" @click="toggle">
      <slot name="reference" />
    </span>

    <div
      v-if="visible"
      class="materin-ui-popconfirm__popper"
      :class="`materin-ui-popconfirm--${placement}`"
      role="dialog"
      @click.stop
    >
      <div class="materin-ui-popconfirm__head">
        <span class="materin-ui-popconfirm__icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="10" cy="10" r="8" />
            <path d="M10 6.2v5" stroke-linecap="round" />
            <circle cx="10" cy="14" r="0.7" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <p class="materin-ui-popconfirm__title">
          <slot name="title">{{ title }}</slot>
        </p>
      </div>

      <div class="materin-ui-popconfirm__actions">
        <button class="materin-ui-popconfirm__cancel" type="button" @click="handleCancel">
          {{ cancelText }}
        </button>
        <button class="materin-ui-popconfirm__confirm" type="button" @click="handleConfirm">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useClickOutside, type PopperPlacement } from '../_shared/popper'

defineOptions({ name: 'MiPopconfirm' })

interface PopconfirmProps {
  title?: string
  confirmText?: string
  cancelText?: string
  placement?: PopperPlacement
  /** 确认按钮的语气 */
  type?: 'primary' | 'danger'
  disabled?: boolean
}

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: '确定要执行吗？',
  confirmText: '确定',
  cancelText: '取消',
  placement: 'top',
  type: 'primary',
  disabled: false
})

const emit = defineEmits<{
  (e: 'confirm', event: MouseEvent): void
  (e: 'cancel', event: MouseEvent): void
}>()

const rootRef = ref<HTMLElement>()
const visible = ref(false)

const toggle = () => {
  if (props.disabled) return
  visible.value = !visible.value
}

const close = () => {
  visible.value = false
}

useClickOutside(rootRef, close)

const handleConfirm = (event: MouseEvent) => {
  visible.value = false
  emit('confirm', event)
}

const handleCancel = (event: MouseEvent) => {
  visible.value = false
  emit('cancel', event)
}

const confirmClasses = computed(() => [
  {
    'is-open': visible.value,
    'is-disabled': props.disabled,
    'materin-ui-popconfirm--danger': props.type === 'danger'
  }
])
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-popconfirm {
  position: relative;
  display: inline-flex;

  &__trigger {
    display: inline-flex;
  }

  &__popper {
    position: absolute;
    z-index: 2100;
    min-width: 200px;
    max-width: 300px;
    padding: $materin-space-3;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius-lg;
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur;
    -webkit-backdrop-filter: $materin-glass-blur;
    box-shadow: $materin-elev-2;
    color: $materin-text;
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

  &__head {
    display: flex;
    align-items: flex-start;
    gap: $materin-space-2;
  }

  &__icon {
    display: inline-flex;
    flex: 0 0 auto;
    color: $materin-warn;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  &__title {
    margin: 0;
    font-size: $materin-font-size-small;
    line-height: $materin-line-height-normal;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: $materin-space-2;
    margin-top: $materin-space-3;
  }

  &__cancel,
  &__confirm {
    padding: $materin-space-1 $materin-space-3;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius;
    font-family: $materin-font-ui;
    font-size: $materin-font-size-small;
    cursor: pointer;
    transition: all $materin-duration-fast $materin-ease-standard;
  }

  &__cancel {
    background: transparent;
    color: $materin-text;

    &:hover {
      background: $materin-surface-4;
    }
  }

  &__confirm {
    border-color: transparent;
    color: $materin-on-accent;
    background: $materin-accent;

    &:hover {
      background: $materin-accent-strong;
    }
  }

  &--danger &__confirm {
    background: $materin-error;

    &:hover {
      opacity: 0.88;
    }
  }
}
</style>
