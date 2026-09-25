<template>
  <component :is="tag" class="materin-ui-aside" :style="asideStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'
import { CONTAINER_KEY } from '../_shared/container'

defineOptions({ name: 'MiAside' })

interface AsideProps {
  width?: string | number
  tag?: string
}

const props = withDefaults(defineProps<AsideProps>(), {
  width: 300,
  tag: 'aside'
})

// 告诉父容器「有侧栏」，让它转成横向布局
const parent = inject(CONTAINER_KEY, null)
onMounted(() => {
  if (parent) parent.hasAside.value = true
})

const asideStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width
}))
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-aside {
  @include materin-component-base;

  flex: 0 0 auto;
  overflow: auto;
  padding: $materin-space-4;
  background: $materin-glass-bg-subtle;
  backdrop-filter: $materin-glass-blur-sm;
  -webkit-backdrop-filter: $materin-glass-blur-sm;
  border-right: 1px solid $materin-glass-border;
}
</style>
