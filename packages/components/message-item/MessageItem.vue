<template>
  <div class="materin-ui-message__item" :class="`materin-ui-message__item--${record.type}`" role="status">
    <span class="materin-ui-message__icon" aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
        <circle cx="10" cy="10" r="8" />
        <path v-if="record.type === 'success'" d="M6.4 10.4l2.5 2.5 4.7-5.3" stroke-linecap="round" stroke-linejoin="round" />
        <template v-else-if="record.type === 'error'">
          <path d="M7 7l6 6M13 7l-6 6" stroke-linecap="round" />
        </template>
        <template v-else>
          <path d="M10 6.4v5" stroke-linecap="round" />
          <circle cx="10" cy="13.8" r="0.6" fill="currentColor" stroke="none" />
        </template>
      </svg>
    </span>

    <p class="materin-ui-message__text">{{ record.message }}</p>

    <button v-if="record.showClose" class="materin-ui-message__close" type="button" aria-label="关闭" @click="close">
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { removeMessage, type MessageRecord } from '../message/store'

defineOptions({ name: 'MiMessageItem' })

const props = defineProps<{ record: MessageRecord }>()

let timer: ReturnType<typeof setTimeout> | undefined

const close = () => {
  if (timer) clearTimeout(timer)
  removeMessage(props.record.id)
  props.record.onClose?.()
}

onMounted(() => {
  if (props.record.duration > 0) {
    timer = setTimeout(close, props.record.duration)
  }
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-message__item {
  display: flex;
  align-items: center;
  gap: $materin-space-2;
  min-width: 260px;
  max-width: 420px;
  padding: $materin-space-3 $materin-space-4;
  border: 1px solid $materin-border;
  border-radius: $materin-radius-lg;
  background: $materin-surface-2;
  box-shadow: $materin-elev-2;
  color: $materin-text;
  font-size: $materin-font-size-body;
  animation: materin-ui-message-in $materin-duration-normal $materin-ease-out;

  &--info {
    border-color: $materin-accent-border;
  }

  &--success {
    border-color: $materin-ok-border;
  }

  &--warning {
    border-color: $materin-warn-border;
  }

  &--error {
    border-color: $materin-error-border;
  }
}

.materin-ui-message__icon {
  display: inline-flex;
  flex: 0 0 auto;

  svg {
    width: 18px;
    height: 18px;
  }
}

.materin-ui-message__item--info .materin-ui-message__icon {
  color: $materin-accent;
}

.materin-ui-message__item--success .materin-ui-message__icon {
  color: $materin-ok;
}

.materin-ui-message__item--warning .materin-ui-message__icon {
  color: $materin-warn;
}

.materin-ui-message__item--error .materin-ui-message__icon {
  color: $materin-error;
}

.materin-ui-message__text {
  flex: 1 1 auto;
  margin: 0;
  line-height: $materin-line-height-normal;
}

.materin-ui-message__close {
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

@keyframes materin-ui-message-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
