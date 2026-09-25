<template>
  <nav class="materin-ui-breadcrumb" aria-label="breadcrumb">
    <template v-for="(crumb, i) in crumbs" :key="i">
      <span class="materin-ui-breadcrumb__item" :class="{ 'is-current': i === crumbs.length - 1 }">
        {{ crumb.label }}
      </span>
      <span v-if="i < crumbs.length - 1" class="materin-ui-breadcrumb__sep" aria-hidden="true">/</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
import type { Crumb } from './types'

defineOptions({ name: 'MiBreadcrumb' })

interface BreadcrumbProps {
  crumbs?: Crumb[]
}

withDefaults(defineProps<BreadcrumbProps>(), { crumbs: () => [] })
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-breadcrumb {
  display: flex;
  align-items: center;
  gap: $materin-space-2;
  font-size: $materin-font-size-small;

  &__item {
    color: $materin-text-muted;

    &.is-current {
      color: $materin-text;
      font-weight: $materin-font-weight-medium;
    }
  }

  &__sep {
    color: $materin-text-faint;
  }
}
</style>
