<template>
  <li class="materin-ui-timeline-item" :class="`materin-ui-timeline-item--${color}`">
    <span class="materin-ui-timeline-item__node" aria-hidden="true" />
    <div class="materin-ui-timeline-item__body">
      <p v-if="timestamp" class="materin-ui-timeline-item__timestamp">{{ timestamp }}</p>
      <div class="materin-ui-timeline-item__content">
        <slot />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiTimelineItem' })

interface TimelineItemProps {
  timestamp?: string
  color?: 'primary' | 'success' | 'warning' | 'error' | 'muted'
}

withDefaults(defineProps<TimelineItemProps>(), {
  timestamp: '',
  color: 'primary'
})

// 是否最后一项由容器样式（:last-child）决定，组件里不用判断
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-timeline-item {
  position: relative;
  display: flex;
  gap: $materin-space-3;
  padding-bottom: $materin-space-4;

  &__node {
    position: relative;
    flex: 0 0 auto;
    width: 10px;
    height: 10px;
    margin-top: 4px;
    background: $materin-accent;
    border-radius: 50%;

    &::after {
      content: '';
      position: absolute;
      top: 12px;
      left: 50%;
      bottom: -20px;
      width: 1px;
      background: $materin-border;
      transform: translateX(-50%);
    }
  }

  &--success &__node { background: $materin-ok; }
  &--warning &__node { background: $materin-warn; }
  &--error &__node { background: $materin-error; }
  &--muted &__node { background: $materin-text-faint; }

  &.is-last &__node::after {
    display: none;
  }

  &__body {
    flex: 1 1 auto;
    min-width: 0;
  }

  &__timestamp {
    margin: 0 0 $materin-space-1;
    color: $materin-text-faint;
    font-size: $materin-font-size-caption;
    font-variant-numeric: tabular-nums;
  }

  &__content {
    color: $materin-text;
    font-size: $materin-font-size-body;
    line-height: $materin-line-height-normal;
  }
}
</style>
