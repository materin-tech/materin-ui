<template>
  <div class="materin-ui-badge" :class="badgeClasses">
    <div v-if="!standalone" class="materin-ui-badge__content">
      <slot />
    </div>
    <span v-if="!hidden" class="materin-ui-badge__value" :aria-label="ariaLabel">
      <slot name="value">{{ displayValue }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiBadge' })

type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps {
  value?: string | number
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: BadgeType
  /** 不包内容，只显示徽标本体 */
  standalone?: boolean
}

const props = withDefaults(defineProps<BadgeProps>(), {
  max: 99,
  isDot: false,
  hidden: false,
  type: 'danger',
  standalone: false
})

const displayValue = computed(() => {
  if (props.isDot || props.value === undefined) return ''
  if (typeof props.value === 'number' && props.value > props.max) return `${props.max}+`
  return String(props.value)
})

const badgeClasses = computed(() => [
  `materin-ui-badge--${props.type}`,
  {
    'materin-ui-badge--dot': props.isDot,
    'materin-ui-badge--standalone': props.standalone
  }
])

const ariaLabel = computed(() => (props.isDot ? undefined : displayValue.value))
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-badge {
  position: relative;
  display: inline-flex;
  vertical-align: middle;

  &__content {
    display: inline-flex;
  }

  &__value {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 $materin-space-1;
    border-radius: 999px;
    background: $materin-error;
    color: $materin-on-accent;
    font-size: $materin-font-size-caption;
    font-weight: $materin-font-weight-bold;
    line-height: 1;
    white-space: nowrap;
    box-shadow: $materin-elev-1;
  }

  &--dot &__value {
    min-width: 8px;
    width: 8px;
    height: 8px;
    padding: 0;
  }

  &--standalone {
    position: static;

    .materin-ui-badge__value {
      position: static;
      transform: none;
    }
  }

  &--primary &__value {
    background: $materin-accent;
  }

  &--success &__value {
    background: $materin-ok;
  }

  &--warning &__value {
    background: $materin-warn;
  }

  &--danger &__value {
    background: $materin-error;
  }

  &--info &__value {
    background: $materin-info;
  }
}
</style>
