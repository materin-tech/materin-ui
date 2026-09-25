<template>
  <div
    v-for="group in groups"
    :key="group.position"
    class="materin-ui-notification"
    :class="`materin-ui-notification--${group.position}`"
  >
    <MiNotificationItem v-for="record in group.items" :key="record.id" :record="record" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MiNotificationItem from '../notification-item/NotificationItem.vue'
import { notifications, type NotificationPosition } from './store'

defineOptions({ name: 'MiNotificationHost' })

const positions: NotificationPosition[] = ['top-right', 'top-left', 'bottom-right', 'bottom-left']

const groups = computed(() =>
  positions
    .map((position) => ({
      position,
      items: notifications.value.filter((item) => item.position === position)
    }))
    .filter((group) => group.items.length > 0)
)
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-notification {
  position: fixed;
  z-index: 2200;
  display: flex;
  flex-direction: column;
  gap: $materin-space-2;

  &--top-right {
    top: $materin-space-5;
    right: $materin-space-5;
  }

  &--top-left {
    top: $materin-space-5;
    left: $materin-space-5;
  }

  &--bottom-right {
    right: $materin-space-5;
    bottom: $materin-space-5;
  }

  &--bottom-left {
    bottom: $materin-space-5;
    left: $materin-space-5;
  }
}
</style>
