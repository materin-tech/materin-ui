<template>
  <div class="materin-ui-menu__sub-wrap">
    <slot name="title" />
    <div class="materin-ui-menu__sub">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiMenuSub' })
</script>
<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-menu__sub-wrap {
  position: relative;
  display: block;
}
</style>
