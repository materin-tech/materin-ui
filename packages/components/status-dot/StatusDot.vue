<template>
  <span class="materin-ui-status-dot" :class="`materin-ui-status-dot--${status}`" role="img" :aria-label="status">
    <span class="materin-ui-status-dot__pulse" />
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiStatusDot' })

interface StatusDotProps {
  status?: 'ok' | 'warn' | 'error' | 'info'
}

withDefaults(defineProps<StatusDotProps>(), { status: 'info' })
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-status-dot {
  position: relative;
  display: inline-flex;
  width: 8px;
  height: 8px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: currentColor;
  }

  &--ok { color: $materin-ok; }
  &--warn { color: $materin-warn; }
  &--error { color: $materin-error; }
  &--info { color: $materin-accent; }

  &__pulse {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: currentColor;
    animation: materin-ui-status-pulse 2s $materin-ease-standard infinite;
  }
}

@keyframes materin-ui-status-pulse {
  from {
    opacity: 0.6;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(2.4);
  }
}
</style>
