<template>
  <button
    class="materin-ui-backtop__button"
    :class="{ 'is-visible': visible }"
    type="button"
    aria-label="回到顶部"
    @click="toTop"
  >
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineOptions({ name: 'MiBacktop' })

interface BacktopProps {
  /** 滚动多少像素后出现 */
  threshold?: number
}

const props = withDefaults(defineProps<BacktopProps>(), { threshold: 320 })

const visible = ref(false)

const onScroll = () => {
  visible.value = (typeof window !== 'undefined' ? window.scrollY : 0) > props.threshold
}

const toTop = () => {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  if (typeof window === 'undefined') return
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  if (typeof window !== 'undefined') window.removeEventListener('scroll', onScroll)
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-backtop__button {
  position: fixed;
  right: $materin-space-5;
  bottom: $materin-space-5;
  z-index: 1900;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid $materin-glass-border;
  border-radius: 50%;
  background: $materin-glass-bg-strong;
  backdrop-filter: $materin-glass-blur-sm;
  -webkit-backdrop-filter: $materin-glass-blur-sm;
  box-shadow: $materin-elev-1;
  color: $materin-text;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transform: translateY(6px);
  transition: all $materin-duration-normal $materin-ease-standard;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    background: $materin-accent;
    color: $materin-on-accent;
  }

  &.is-visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
}
</style>
