<template>
  <div class="materin-ui-notification__item" :class="`materin-ui-notification__item--${record.type}`" role="alert">
    <header class="materin-ui-notification__header">
      <p class="materin-ui-notification__title">{{ record.title }}</p>
      <button v-if="record.showClose" class="materin-ui-notification__close" type="button" aria-label="关闭" @click="close">
        ×
      </button>
    </header>
    <p v-if="record.message" class="materin-ui-notification__content">{{ record.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { removeNotification, type NotificationRecord } from '../notification/store'

defineOptions({ name: 'MiNotificationItem' })

const props = defineProps<{ record: NotificationRecord }>()

let timer: ReturnType<typeof setTimeout> | undefined

const close = () => {
  if (timer) clearTimeout(timer)
  removeNotification(props.record.id)
  props.record.onClose?.()
}

onMounted(() => {
  if (props.record.duration > 0) timer = setTimeout(close, props.record.duration)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-notification__item {
  width: 320px;
  padding: $materin-space-3 $materin-space-4;
  border: 1px solid $materin-border;
  border-radius: $materin-radius-lg;
  background: $materin-glass-bg-strong;
  backdrop-filter: $materin-glass-blur;
  -webkit-backdrop-filter: $materin-glass-blur;
  box-shadow: $materin-elev-2;
  color: $materin-text;
  cursor: pointer;
  animation: materin-ui-notification-in $materin-duration-normal $materin-ease-out;

  &--info {
    border-left: 3px solid $materin-accent;
  }

  &--success {
    border-left: 3px solid $materin-ok;
  }

  &--warning {
    border-left: 3px solid $materin-warn;
  }

  &--error {
    border-left: 3px solid $materin-error;
  }
}

.materin-ui-notification__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: $materin-space-2;
}

.materin-ui-notification__title {
  margin: 0;
  font-size: $materin-font-size-body;
  font-weight: $materin-font-weight-medium;
}

.materin-ui-notification__close {
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

.materin-ui-notification__content {
  margin: $materin-space-1 0 0;
  color: $materin-text-muted;
  font-size: $materin-font-size-small;
  line-height: $materin-line-height-normal;
}

@keyframes materin-ui-notification-in {
  from {
    opacity: 0;
    transform: translateX(16px);
  }
}
</style>
