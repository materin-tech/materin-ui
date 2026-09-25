<template>
  <div class="materin-ui-descriptions" :class="[`materin-ui-descriptions--${direction}`, { 'materin-ui-descriptions--bordered': border }]">
    <p v-if="title || $slots.title" class="materin-ui-descriptions__title">
      <slot name="title">{{ title }}</slot>
    </p>
    <dl class="materin-ui-descriptions__body">
      <div v-for="(item, i) in items" :key="i" class="materin-ui-descriptions__row">
        <dt class="materin-ui-descriptions__label">{{ item.label }}</dt>
        <dd class="materin-ui-descriptions__value">{{ item.value }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiDescriptions' })

interface DescriptionsItem {
  label: string
  value: string
}

interface DescriptionsProps {
  title?: string
  items?: DescriptionsItem[]
  /** 标签在值上方（否则同排） */
  direction?: 'horizontal' | 'vertical'
  border?: boolean
}

withDefaults(defineProps<DescriptionsProps>(), {
  title: '',
  items: () => [],
  direction: 'horizontal',
  border: false
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-descriptions {
  &__title {
    margin: 0 0 $materin-space-3;
    color: $materin-text;
    font-size: $materin-font-size-h3;
    font-weight: $materin-font-weight-medium;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: $materin-space-2;
    margin: 0;
  }

  &__row {
    display: flex;
    align-items: baseline;
    gap: $materin-space-3;
    padding: $materin-space-2 0;
    border-bottom: 1px solid $materin-border;

    &:last-child {
      border-bottom: none;
    }
  }

  &__label {
    flex: 0 0 auto;
    min-width: 84px;
    color: $materin-text-muted;
    font-size: $materin-font-size-small;
  }

  &__value {
    flex: 1 1 auto;
    margin: 0;
    color: $materin-text;
    font-size: $materin-font-size-body;
    line-height: $materin-line-height-normal;
  }

  &--vertical &__row {
    flex-direction: column;
    gap: $materin-space-1;
  }

  &--bordered &__row {
    padding: $materin-space-2 $materin-space-3;
    border: 1px solid $materin-border;
    border-radius: $materin-radius;
  }
}
</style>
