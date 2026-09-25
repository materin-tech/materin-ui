<template>
  <component :is="tag" class="materin-ui-text" :class="textClasses" :style="textStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiText' })

type TextType = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
type TextSize = 'sm' | 'md' | 'lg'

interface TextProps {
  type?: TextType
  size?: TextSize
  strong?: boolean
  italic?: boolean
  truncated?: boolean
  /** 限制行数，超出省略（需要 truncated 一起用） */
  lineClamp?: number
  tag?: string
}

const props = withDefaults(defineProps<TextProps>(), {
  type: 'default',
  size: 'md',
  strong: false,
  italic: false,
  truncated: false,
  tag: 'span'
})

const textClasses = computed(() => [
  `materin-ui-text--${props.type}`,
  `materin-ui-text--${props.size}`,
  {
    'materin-ui-text--strong': props.strong,
    'materin-ui-text--italic': props.italic,
    'materin-ui-text--truncated': props.truncated,
    'materin-ui-text--line-clamp': props.truncated && !!props.lineClamp
  }
])

const textStyle = computed(() =>
  props.truncated && props.lineClamp ? { webkitLineClamp: String(props.lineClamp) } : undefined
)
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-text {
  font-size: $materin-font-size-body;
  line-height: $materin-line-height-normal;

  &--sm {
    font-size: $materin-font-size-small;
  }

  &--md {
    font-size: $materin-font-size-body;
  }

  &--lg {
    font-size: 16px;
  }

  &--default {
    color: $materin-text;
  }

  &--primary {
    color: $materin-accent;
  }

  &--secondary {
    color: $materin-text-muted;
  }

  &--success {
    color: $materin-ok;
  }

  &--warning {
    color: $materin-warn;
  }

  &--danger {
    color: $materin-error;
  }

  &--info {
    color: $materin-info;
  }

  &--strong {
    font-weight: $materin-font-weight-bold;
  }

  &--italic {
    font-style: italic;
  }

  &--truncated {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &--line-clamp {
    display: -webkit-box;
    white-space: normal;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
