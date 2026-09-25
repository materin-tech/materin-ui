<template>
  <div ref="rootRef" class="materin-ui-infinite-scroll" :class="{ 'is-disabled': disabled }">
    <slot />
    <p v-if="loading" class="materin-ui-infinite-scroll__tip">{{ loadingText }}</p>
    <p v-else-if="finished" class="materin-ui-infinite-scroll__tip">{{ finishedText }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineOptions({ name: 'MiInfiniteScroll' })

interface InfiniteScrollProps {
  disabled?: boolean
  loading?: boolean
  /** 没有更多了（显示 finishedText 并停止触发） */
  finished?: boolean
  /** 距底部多少像素触发 */
  threshold?: number
  loadingText?: string
  finishedText?: string
}

const props = withDefaults(defineProps<InfiniteScrollProps>(), {
  disabled: false,
  loading: false,
  finished: false,
  threshold: 40,
  loadingText: '加载中…',
  finishedText: '没有更多了'
})

const emit = defineEmits<{ (e: 'loadMore'): void }>()

const rootRef = ref<HTMLElement>()
let io: IntersectionObserver | undefined

const arm = () => {
  io?.disconnect()
  if (typeof IntersectionObserver === 'undefined') return
  io = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting)
      if (!visible || props.disabled || props.loading || props.finished) return
      emit('loadMore')
    },
    { rootMargin: `0px 0px ${props.threshold}px 0px` }
  )
  const sentinel = document.createElement('div')
  sentinel.className = 'materin-ui-infinite-scroll__sentinel'
  rootRef.value?.appendChild(sentinel)
  io.observe(sentinel)
}

onMounted(arm)

onUnmounted(() => io?.disconnect())

defineExpose({ rearm: arm })
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-infinite-scroll {
  display: block;

  &__sentinel {
    width: 100%;
    height: 1px;
  }

  &__tip {
    margin: $materin-space-3 0 0;
    color: $materin-text-faint;
    font-size: $materin-font-size-small;
    text-align: center;
  }

  &.is-disabled &__tip {
    display: none;
  }
}
</style>
