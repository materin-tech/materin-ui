<template>
  <component :is="tag" class="materin-ui-main">
    <slot />
  </component>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiMain' })

interface MainProps {
  tag?: string
}

const props = withDefaults(defineProps<MainProps>(), {
  tag: 'main'
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-main {
  @include materin-component-base;

  display: block;
  flex: 1 1 auto;
  min-width: 0;
  padding: $materin-space-4;
  overflow: auto;
}
</style>
