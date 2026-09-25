<template>
  <div class="materin-ui-menu__group">
    <p class="materin-ui-menu__group-title">{{ title }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiMenuGroup' })

defineProps<{ title?: string }>()
</script>
<style lang="scss">
.materin-ui-menu__group {
  display: block;
}
</style>
