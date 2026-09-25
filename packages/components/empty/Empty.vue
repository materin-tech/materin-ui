<template>
  <div class="materin-ui-empty" :class="`materin-ui-empty--${size}`">
    <div class="materin-ui-empty__image">
      <slot name="image">
        <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <rect x="2.5" y="6.5" width="59" height="35" rx="4" />
          <path d="M2.5 32.5l15-11 12 9 9-6 23 14" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="45" cy="16" r="4" />
        </svg>
      </slot>
    </div>
    <p class="materin-ui-empty__description">
      <slot>{{ description }}</slot>
    </p>
    <div v-if="$slots.bottom" class="materin-ui-empty__bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiEmpty' })

interface EmptyProps {
  description?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<EmptyProps>(), {
  description: '暂无内容',
  size: 'md'
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $materin-space-3;
  padding: $materin-space-6 $materin-space-4;
  color: $materin-text-muted;
  text-align: center;

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    color: $materin-text-faint;
    opacity: 0.9;
  }

  &__description {
    margin: 0;
    font-size: $materin-font-size-small;
  }

  &__bottom {
    display: flex;
    gap: $materin-space-2;
  }

  &--sm &__image {
    width: 72px;
  }

  &--md &__image {
    width: 120px;
  }

  &--lg &__image {
    width: 180px;
  }
}
</style>
