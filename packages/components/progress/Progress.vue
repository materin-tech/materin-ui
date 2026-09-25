<template>
  <div class="materin-ui-progress" :class="[`materin-ui-progress--${props.size}`, { 'materin-ui-progress--indeterminate': props.indeterminate }]">
    <div v-if="type === 'line'" class="materin-ui-progress__runway" role="progressbar" :aria-valuenow="indeterminate ? undefined : clamped" aria-valuemin="0" aria-valuemax="100">
      <div class="materin-ui-progress__bar" :class="[`materin-ui-progress__bar--${status}`]" :style="{ width: barWidth }" />
    </div>
    <svg v-else class="materin-ui-progress__ring" :width="ringSize" :height="ringSize" viewBox="0 0 100 100" role="progressbar" :aria-valuenow="indeterminate ? undefined : clamped" aria-valuemin="0" aria-valuemax="100">
      <circle class="materin-ui-progress__ring-runway" cx="50" cy="50" :r="ringRadius" fill="none" :stroke-width="strokeWidth" />
      <circle
        class="materin-ui-progress__ring-bar"
        :class="[`materin-ui-progress__ring-bar--${status}`]"
        cx="50" cy="50" :r="ringRadius" fill="none" :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <span v-if="showText" class="materin-ui-progress__text">
      <slot :percent="clamped">{{ indeterminate ? '…' : `${clamped}%` }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiProgress' })

interface ProgressProps {
  /** 百分比 0-100 */
  percent?: number
  type?: 'line' | 'ring'
  status?: 'primary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  /** 不确定进度（转条） */
  indeterminate?: boolean
  /** 环形尺寸（px，仅 ring） */
  ringSize?: number
}

const props = withDefaults(defineProps<ProgressProps>(), {
  percent: 0,
  type: 'line',
  status: 'primary',
  size: 'md',
  showText: true,
  indeterminate: false,
  ringSize: 44
})

const clamped = computed(() => Math.min(100, Math.max(0, Math.round(props.percent))))
const barWidth = computed(() => (props.indeterminate ? '100%' : `${clamped.value}%`))

const ringRadius = 42
const strokeWidth = 8
const circumference = 2 * Math.PI * ringRadius
const dashArray = `${circumference}`
const dashOffset = computed(() => `${circumference * (1 - clamped.value / 100)}`)
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-progress {
  display: flex;
  align-items: center;
  gap: $materin-space-3;

  &__runway {
    flex: 1 1 auto;
    height: 8px;
    overflow: hidden;
    background: $materin-surface-4;
    border-radius: 999px;
  }

  &__bar {
    height: 100%;
    border-radius: 999px;
    background: $materin-accent;
    transition: width $materin-duration-slow $materin-ease-standard;

    &--success { background: $materin-ok; }
    &--warning { background: $materin-warn; }
    &--error { background: $materin-error; }
  }

  &__text {
    flex: 0 0 auto;
    min-width: 36px;
    color: $materin-text-muted;
    font-size: $materin-font-size-small;
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  &__ring {
    display: block;
  }

  &__ring-runway {
    stroke: $materin-surface-4;
  }

  &__ring-bar {
    stroke: $materin-accent;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    transition: stroke-dashoffset $materin-duration-slow $materin-ease-standard;

    &--success { stroke: $materin-ok; }
    &--warning { stroke: $materin-warn; }
    &--error { stroke: $materin-error; }
  }

  &--sm &__runway { height: 5px; }
  &--lg &__runway { height: 12px; }

  &--indeterminate &__bar {
    width: 40% !important;
    animation: materin-ui-progress-slide 1.2s $materin-ease-standard infinite;
  }
}

@keyframes materin-ui-progress-slide {
  from { transform: translateX(-100%); }
  to { transform: translateX(350%); }
}
</style>
