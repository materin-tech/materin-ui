<template>
  <div class="materin-ui-message" role="log" aria-live="polite">
    <MiMessageItem v-for="record in messages" :key="record.id" :record="record" />
  </div>
</template>

<script setup lang="ts">
import MiMessageItem from '../message-item/MessageItem.vue'
import { messages } from './store'

defineOptions({ name: 'MiMessageHost' })
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-message {
  position: fixed;
  top: $materin-space-5;
  left: 50%;
  z-index: 2200;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $materin-space-2;
  transform: translateX(-50%);
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}
</style>
