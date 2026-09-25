<template>
  <ol class="materin-ui-steps">
    <li
      v-for="(step, i) in steps"
      :key="i"
      class="materin-ui-steps__item"
      :class="{ 'is-done': i < current, 'is-current': i === current }"
    >
      <span class="materin-ui-steps__index">
        <svg v-if="i < current" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3.5 8.5l3 3 6-7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <template v-else>{{ i + 1 }}</template>
      </span>
      <span class="materin-ui-steps__title">{{ step.title }}</span>
      <span v-if="i < steps.length - 1" class="materin-ui-steps__connector" aria-hidden="true" />
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { StepDef } from './types'

defineOptions({ name: 'MiSteps' })

interface StepsProps {
  steps?: StepDef[]
  /** 当前进行到的步骤（从 0 起） */
  current?: number
}

withDefaults(defineProps<StepsProps>(), { steps: () => [], current: 0 })
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-steps {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;

  &__item {
    position: relative;
    display: flex;
    flex: 1 1 0;
    align-items: center;
    gap: $materin-space-2;

    &:last-child {
      flex: 0 0 auto;
    }
  }

  &__index {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 26px;
    height: 26px;
    border: 1px solid $materin-border;
    border-radius: 50%;
    background: $materin-surface-2;
    color: $materin-text-muted;
    font-size: $materin-font-size-small;
    font-variant-numeric: tabular-nums;

    svg {
      width: 12px;
      height: 12px;
    }
  }

  &__title {
    color: $materin-text-muted;
    font-size: $materin-font-size-small;
    white-space: nowrap;
  }

  &__connector {
    flex: 1 1 auto;
    height: 1px;
    margin: 0 $materin-space-3;
    background: $materin-border;
  }

  &__item.is-done &__index {
    border-color: transparent;
    background: $materin-ok;
    color: $materin-on-accent;
  }

  &__item.is-current &__index {
    border-color: $materin-accent;
    color: $materin-accent;
  }

  &__item.is-current &__title {
    color: $materin-text;
    font-weight: $materin-font-weight-medium;
  }
}
</style>
