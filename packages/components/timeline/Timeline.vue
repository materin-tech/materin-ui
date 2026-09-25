<template>
  <ul class="materin-ui-timeline">
    <slot />
  </ul>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiTimeline' })
</script>

<style lang="scss">
.materin-ui-timeline {
  margin: 0;
  padding: 0;
  list-style: none;

  // 最后一个节点的连线不画
  > .materin-ui-timeline-item:last-child .materin-ui-timeline-item__node::after {
    display: none;
  }
}
</style>
