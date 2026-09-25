<template>
  <div v-if="visible" class="materin-ui-alert" :class="alertClasses" role="alert">
    <span v-if="showIcon" class="materin-ui-alert__icon" aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
        <circle cx="10" cy="10" r="8" />
        <path v-if="type === 'success'" d="M6.4 10.4l2.5 2.5 4.7-5.3" stroke-linecap="round" stroke-linejoin="round" />
        <template v-else-if="type === 'error'">
          <path d="M7 7l6 6M13 7l-6 6" stroke-linecap="round" />
        </template>
        <template v-else>
          <path d="M10 6.4v5" stroke-linecap="round" />
          <circle cx="10" cy="13.8" r="0.6" fill="currentColor" stroke="none" />
        </template>
      </svg>
    </span>

    <div class="materin-ui-alert__content">
      <p v-if="title || $slots.title" class="materin-ui-alert__title">
        <slot name="title">{{ title }}</slot>
      </p>
      <p v-if="description || $slots.default" class="materin-ui-alert__description">
        <slot>{{ description }}</slot>
      </p>
    </div>

    <button
      v-if="closable"
      class="materin-ui-alert__close"
      type="button"
      :aria-label="'关闭提示'"
      @click="handleClose"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'MiAlert' })

type AlertType = 'info' | 'success' | 'warning' | 'error'

interface AlertProps {
  type?: AlertType
  title?: string
  description?: string
  closable?: boolean
  showIcon?: boolean
  center?: boolean
  /** 玻璃底（默认实色底，玻璃底用于压在图片或渐变上） */
  glass?: boolean
}

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  title: '',
  description: '',
  closable: true,
  showIcon: true,
  center: false,
  glass: false
})

const emit = defineEmits<{ (e: 'close', event: MouseEvent): void }>()

const visible = ref(true)

const alertClasses = computed(() => [
  `materin-ui-alert--${props.type}`,
  {
    'materin-ui-alert--center': props.center,
    'materin-ui-alert--glass': props.glass
  }
])

const handleClose = (event: MouseEvent) => {
  visible.value = false
  emit('close', event)
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-alert {
  display: flex;
  align-items: flex-start;
  gap: $materin-space-3;
  padding: $materin-space-3 $materin-space-4;
  border: 1px solid $materin-border;
  border-radius: $materin-radius-lg;
  background: $materin-surface-3;
  color: $materin-text;

  &__icon {
    display: inline-flex;
    flex: 0 0 auto;
    margin-top: 1px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__content {
    flex: 1 1 auto;
    min-width: 0;
  }

  &__title {
    margin: 0;
    font-weight: $materin-font-weight-medium;
    font-size: $materin-font-size-body;
  }

  &__description {
    margin: $materin-space-1 0 0;
    color: $materin-text-muted;
    font-size: $materin-font-size-small;
    line-height: $materin-line-height-normal;
  }

  &__title + &__description {
    margin-top: $materin-space-1;
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

  &--center {
    justify-content: center;
    text-align: center;

    .materin-ui-alert__content {
      flex: 0 1 auto;
    }
  }

  &--glass {
    @include materin-glass('subtle');
  }

  &--info {
    border-color: $materin-accent-border;
    background: $materin-accent-soft;
    color: $materin-accent;
  }

  &--success {
    border-color: $materin-ok-border;
    background: $materin-ok-soft;
    color: $materin-ok;
  }

  &--warning {
    border-color: $materin-warn-border;
    background: $materin-warn-soft;
    color: $materin-warn;
  }

  &--error {
    border-color: $materin-error-border;
    background: $materin-error-soft;
    color: $materin-error;
  }

  &--info &__title,
  &--success &__title,
  &--warning &__title,
  &--error &__title {
    color: $materin-text;
  }

  &--info &__description,
  &--success &__description,
  &--warning &__description,
  &--error &__description {
    color: $materin-text;
    opacity: 0.78;
  }
}
</style>
