<template>
  <component :is="tag" class="materin-ui-container" :class="containerClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { CONTAINER_KEY } from '../_shared/container'

defineOptions({ name: 'MiContainer' })

interface ContainerProps {
  /** 不传则按子元素自动判定：有 Aside 就横向 */
  direction?: 'vertical' | 'horizontal' | ''
  tag?: string
}

const props = withDefaults(defineProps<ContainerProps>(), {
  direction: '',
  tag: 'section'
})

const hasAside = ref(false)
provide(CONTAINER_KEY, { hasAside })

const isHorizontal = computed(
  () => props.direction === 'horizontal' || (props.direction === '' && hasAside.value)
)

const containerClasses = computed(() => [
  `materin-ui-container--${isHorizontal.value ? 'horizontal' : 'vertical'}`
])
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-container {
  @include materin-component-base;

  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: $materin-radius-lg;
  overflow: hidden;

  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;
  }
}
</style>
