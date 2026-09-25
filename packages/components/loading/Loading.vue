<template>
  <div class="materin-ui-loading" :class="loadingClasses">
    <Teleport to="body" :disabled="!fullscreen">
      <div v-if="loading" class="materin-ui-loading__mask" :class="{ 'materin-ui-loading--fullscreen': fullscreen }">
        <span class="materin-ui-loading__spinner" aria-hidden="true" />
        <p v-if="text" class="materin-ui-loading__text">{{ text }}</p>
      </div>
    </Teleport>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiLoading' })

interface LoadingProps {
  loading?: boolean
  text?: string
  fullscreen?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<LoadingProps>(), {
  loading: false,
  text: '',
  fullscreen: false,
  size: 'md'
})

const loadingClasses = computed(() => [`materin-ui-loading--${props.size}`])
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-loading {
  position: relative;
  display: block;

  &__mask {
    position: absolute;
    inset: 0;
    z-index: 40;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $materin-space-2;
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur-sm;
    -webkit-backdrop-filter: $materin-glass-blur-sm;

  }

  &__spinner {
    display: block;
    width: 22px;
    height: 22px;
    border: 2px solid $materin-accent-soft;
    border-top-color: $materin-accent;
    border-radius: 50%;
    animation: materin-ui-loading-spin 0.8s linear infinite;
  }

  &__text {
    margin: 0;
    color: $materin-text-muted;
    font-size: $materin-font-size-small;
  }

  &--fullscreen &__mask {
    position: fixed;
    z-index: 2000;
    background: $materin-glass-bg-strong;
  }

  &--sm &__spinner {
    width: 16px;
    height: 16px;
    border-width: 2px;
  }

  &--md &__spinner {
    width: 22px;
    height: 22px;
  }

  &--lg &__spinner {
    width: 30px;
    height: 30px;
    border-width: 3px;
  }
}

@keyframes materin-ui-loading-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
