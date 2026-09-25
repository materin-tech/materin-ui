<template>
  <div class="materin-ui-result" :class="`materin-ui-result--${status}`">
    <span class="materin-ui-result__icon" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3">
        <template v-if="status === 'success'">
          <circle cx="24" cy="24" r="20" />
          <path d="M15 24.5l6.5 6.5L33.5 18" stroke-linecap="round" stroke-linejoin="round" />
        </template>
        <template v-else-if="status === 'error'">
          <circle cx="24" cy="24" r="20" />
          <path d="M16.5 16.5l15 15M31.5 16.5l-15 15" stroke-linecap="round" />
        </template>
        <template v-else-if="status === 'warning'">
          <path d="M24 5L45 41H3L24 5z" stroke-linejoin="round" />
          <path d="M24 19v11" stroke-linecap="round" />
          <circle cx="24" cy="35.5" r="1" fill="currentColor" stroke="none" />
        </template>
        <template v-else>
          <circle cx="24" cy="24" r="20" />
          <path d="M24 16v10" stroke-linecap="round" />
          <circle cx="24" cy="32.5" r="1" fill="currentColor" stroke="none" />
        </template>
      </svg>
    </span>
    <h3 class="materin-ui-result__title">
      <slot name="title">{{ title }}</slot>
    </h3>
    <p v-if="description || $slots.default" class="materin-ui-result__description">
      <slot>{{ description }}</slot>
    </p>
    <div v-if="$slots.extra" class="materin-ui-result__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiResult' })

interface ResultProps {
  status?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  description?: string
}

withDefaults(defineProps<ResultProps>(), {
  status: 'info',
  title: '',
  description: ''
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $materin-space-2;
  padding: $materin-space-6 $materin-space-5;
  text-align: center;

  &__icon {
    display: inline-flex;

    svg {
      width: 48px;
      height: 48px;
    }
  }

  &__title {
    margin: $materin-space-1 0 0;
    color: $materin-text;
    font-size: $materin-font-size-h3;
    font-weight: $materin-font-weight-medium;
  }

  &__description {
    max-width: 420px;
    margin: 0;
    color: $materin-text-muted;
    font-size: $materin-font-size-body;
    line-height: $materin-line-height-normal;
  }

  &__extra {
    display: flex;
    gap: $materin-space-2;
    margin-top: $materin-space-3;
  }

  &--success &__icon { color: $materin-ok; }
  &--error &__icon { color: $materin-error; }
  &--warning &__icon { color: $materin-warn; }
  &--info &__icon { color: $materin-accent; }
}
</style>
