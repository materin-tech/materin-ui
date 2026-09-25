<template>
  <div
    v-if="loading"
    class="materin-ui-skeleton"
    :class="{ 'materin-ui-skeleton--animated': animated }"
    :aria-busy="true"
    aria-live="polite"
  >
    <div class="materin-ui-skeleton__items">
      <MiSkeletonItem
        v-for="row in rows"
        :key="row"
        variant="text"
        :width="rows > 1 && row === rows ? '62%' : '100%'"
      />
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import MiSkeletonItem from '../skeleton-item/SkeletonItem.vue'

defineOptions({ name: 'MiSkeleton' })

interface SkeletonProps {
  /** 行数 */
  rows?: number
  /** 是否显示占位（false 时渲染默认插槽的真实内容） */
  loading?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  rows: 3,
  loading: true,
  animated: true
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-skeleton {
  display: block;
  width: 100%;

  &__items {
    display: flex;
    flex-direction: column;
    gap: $materin-space-2;
  }

  &--animated .materin-ui-skeleton-item {
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      transform: translateX(-100%);
      background: linear-gradient(
        90deg,
        transparent,
        $materin-glass-highlight,
        transparent
      );
      animation: materin-ui-skeleton-sweep 1.4s $materin-ease-standard infinite;
    }
  }
}

@keyframes materin-ui-skeleton-sweep {
  100% {
    transform: translateX(100%);
  }
}
</style>
