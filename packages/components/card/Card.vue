<template>
  <article :class="cardClasses" :style="customStyle">
    <div v-if="$slots.cover || cover" class="materin-ui-card__cover">
      <slot name="cover">
        <img v-if="cover" :src="cover" :alt="alt" />
      </slot>
    </div>

    <div v-if="$slots.header || title || subtitle" class="materin-ui-card__header">
      <slot name="header">
        <h3 v-if="title" class="materin-ui-card__title">{{ title }}</h3>
        <p v-if="subtitle" class="materin-ui-card__subtitle">{{ subtitle }}</p>
      </slot>
    </div>

    <div class="materin-ui-card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="materin-ui-card__footer">
      <slot name="footer" />
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface CardProps {
  variant?: 'default' | 'glass' | 'hero'
  shadow?: 'none' | 'elev-1' | 'elev-2'
  hoverable?: boolean
  bordered?: boolean
  title?: string
  subtitle?: string
  cover?: string
  alt?: string
  width?: string | number
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  shadow: 'elev-1',
  hoverable: false,
  bordered: true
})

const cardClasses = computed(() => {
  const classes: string[] = ['materin-ui-card']
  // default 是基类外观，不额外挂变体类
  if (props.variant !== 'default') classes.push(`materin-ui-card--${props.variant}`)
  if (props.hoverable) classes.push('materin-ui-card--hoverable')
  return classes
})

// 阴影 / 描边 / 宽度走行内样式，值一律引用令牌
const customStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.shadow === 'none') style.boxShadow = 'none'
  else if (props.shadow === 'elev-2') style.boxShadow = 'var(--materin-elev-2)'
  else style.boxShadow = 'var(--materin-elev-1)'
  if (!props.bordered) style.border = 'none'
  if (props.width !== undefined) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  return style
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

// 命名：materin-ui-card（scope=ui 共享件）
.materin-ui-card {
  display: flex;
  flex-direction: column;
  background: $materin-surface-3;
  border-radius: $materin-radius-lg;
  overflow: hidden;
  transition: all $materin-duration-normal $materin-ease-standard;

  // 玻璃变体
  &.materin-ui-card--glass,
  .materin-ui-card--glass & {
    @include materin-glass('normal');
  }

  &.materin-ui-card--hero {
    @include materin-glass-hero;
  }

  &__cover {
    position: relative;
    overflow: hidden;
    background: $materin-surface-2;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__header {
    padding: $materin-space-5 $materin-space-5 $materin-space-3;
    border-bottom: 1px solid $materin-border;
  }

  &__title {
    font-size: $materin-font-size-h3;
    font-weight: $materin-font-weight-bold;
    color: $materin-text;
    margin: 0;
    letter-spacing: -0.01em;
    line-height: $materin-line-height-tight;
  }

  &__subtitle {
    margin: $materin-space-1 0 0;
    font-size: $materin-font-size-caption;
    color: $materin-text-muted;
    line-height: $materin-line-height-normal;
  }

  &__body {
    padding: $materin-space-5;
    color: $materin-text;
    line-height: $materin-line-height-loose;
  }

  &__footer {
    padding: $materin-space-3 $materin-space-5;
    border-top: 1px solid $materin-border;
    background: $materin-surface-2;
  }

  // Hoverable - 玻璃风悬浮
  &.materin-ui-card--hoverable {
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: $materin-elev-2;
      border-color: $materin-accent-soft;
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>