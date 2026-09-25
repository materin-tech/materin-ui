<template>
  <div class="materin-ui-statistic" :class="{ 'materin-ui-statistic--danger': props.status === 'error', 'materin-ui-statistic--success': props.status === 'success' }">
    <p v-if="title || $slots.title" class="materin-ui-statistic__title">
      <slot name="title">{{ title }}</slot>
    </p>
    <p class="materin-ui-statistic__value">
      <span v-if="prefix || $slots.prefix" class="materin-ui-statistic__prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span class="materin-ui-statistic__number">{{ displayValue }}</span>
      <span v-if="suffix || $slots.suffix" class="materin-ui-statistic__suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiStatistic' })

interface StatisticProps {
  title?: string
  value?: number | string
  /** 千分位分隔 */
  grouped?: boolean
  /** 保留小数位 */
  precision?: number
  prefix?: string
  suffix?: string
  status?: 'default' | 'success' | 'error'
}

const props = withDefaults(defineProps<StatisticProps>(), {
  title: '',
  value: 0,
  grouped: true,
  precision: undefined,
  prefix: '',
  suffix: '',
  status: 'default'
})

const displayValue = computed(() => {
  const raw = props.value
  if (typeof raw === 'string') return raw
  const factor = 10 ** (props.precision ?? 0)
  const rounded = Math.round(raw * factor) / factor
  return props.grouped
    ? rounded.toLocaleString('en-US', { minimumFractionDigits: props.precision, maximumFractionDigits: props.precision ?? 20 })
    : String(rounded)
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-statistic {
  &__title {
    margin: 0 0 $materin-space-1;
    color: $materin-text-muted;
    font-size: $materin-font-size-small;
  }

  &__value {
    display: flex;
    align-items: baseline;
    gap: $materin-space-1;
    margin: 0;
    color: $materin-text;
    font-size: $materin-font-size-h2;
    font-weight: $materin-font-weight-medium;
    font-variant-numeric: tabular-nums;
    line-height: 1.2;
  }

  &__number {
    font-variant-numeric: tabular-nums;
  }

  &__prefix,
  &__suffix {
    color: $materin-text-muted;
    font-size: $materin-font-size-body;
  }

  &--success &__value { color: $materin-ok; }
  &--danger &__value { color: $materin-error; }
}
</style>
