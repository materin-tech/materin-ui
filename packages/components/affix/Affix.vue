<template>
  <div ref="placeholderRef" class="materin-ui-affix" :style="placeholderStyle">
    <div class="materin-ui-affix__inner" :class="{ 'is-fixed': fixed }" :style="fixedStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

defineOptions({ name: 'MiAffix' })

interface AffixProps {
  /** 距视口顶多少像素时固定 */
  offset?: number
}

const props = withDefaults(defineProps<AffixProps>(), { offset: 0 })

const placeholderRef = ref<HTMLElement>()
const fixed = ref(false)
const width = ref('')

const onScroll = () => {
  const el = placeholderRef.value
  if (!el || typeof window === 'undefined') return
  const rect = el.getBoundingClientRect()
  const next = rect.top <= props.offset
  if (next && !fixed.value) width.value = `${rect.width}px`
  fixed.value = next
}

const placeholderStyle = computed(() => (fixed.value ? { width: width.value, height: '1px' } : undefined))

const fixedStyle = computed<Record<string, string> | undefined>(() =>
  fixed.value
    ? { position: 'fixed', top: `${props.offset}px`, width: width.value, zIndex: '100' }
    : undefined
)

onMounted(() => {
  if (typeof window === 'undefined') return
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  onScroll()
})

onUnmounted(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<style lang="scss">
.materin-ui-affix {
  display: block;

  &__inner.is-fixed {
    // 行内样式接管定位，这里只做阴影提示
    box-shadow: var(--materin-elev-2);
  }
}
</style>
