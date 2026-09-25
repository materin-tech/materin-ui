<template>
  <header class="materin-ui-page-header">
    <div class="materin-ui-page-header__left">
      <slot name="back" />
      <div>
        <h3 v-if="title" class="materin-ui-page-header__title">{{ title }}</h3>
        <p v-if="description || $slots.description" class="materin-ui-page-header__description">
          <slot name="description">{{ description }}</slot>
        </p>
      </div>
    </div>
    <div v-if="$slots.extra" class="materin-ui-page-header__extra">
      <slot name="extra" />
    </div>
  </header>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiPageHeader' })

interface PageHeaderProps {
  title?: string
  description?: string
}

withDefaults(defineProps<PageHeaderProps>(), { title: '', description: '' })
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: $materin-space-3;
  padding-bottom: $materin-space-3;
  border-bottom: 1px solid $materin-border;

  &__left {
    display: flex;
    align-items: flex-start;
    gap: $materin-space-3;
  }

  &__title {
    margin: 0;
    color: $materin-text;
    font-size: $materin-font-size-h3;
    font-weight: $materin-font-weight-medium;
  }

  &__description {
    margin: $materin-space-1 0 0;
    color: $materin-text-muted;
    font-size: $materin-font-size-small;
  }

  &__extra {
    display: flex;
    gap: $materin-space-2;
  }
}
</style>
