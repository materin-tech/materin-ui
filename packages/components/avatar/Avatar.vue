<template>
  <span class="materin-ui-avatar" :class="avatarClasses" :style="avatarStyle">
    <img v-if="src" class="materin-ui-avatar__img" :src="src" :alt="alt" />
    <span v-else-if="$slots.default" class="materin-ui-avatar__text"><slot /></span>
    <span v-else class="materin-ui-avatar__icon" aria-hidden="true">
      <slot name="icon">
        <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="currentColor" stroke-width="1.6">
          <circle cx="12" cy="8.5" r="3.6" />
          <path d="M4.6 20c1.3-3.6 4-5.4 7.4-5.4S18.1 16.4 19.4 20" stroke-linecap="round" />
        </svg>
      </slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiAvatar' })

type AvatarSize = 'sm' | 'md' | 'lg' | number

interface AvatarProps {
  src?: string
  alt?: string
  size?: AvatarSize
  shape?: 'circle' | 'square'
  /** 圆形时取首字母的备用显示名 */
  name?: string
}

const props = withDefaults(defineProps<AvatarProps>(), {
  alt: '',
  size: 'md',
  shape: 'circle'
})

const SIZES: Record<'sm' | 'md' | 'lg', number> = { sm: 24, md: 32, lg: 40 }

const px = computed(() => (typeof props.size === 'number' ? props.size : SIZES[props.size]))
const initials = computed(() => (props.name ? props.name.trim().slice(0, 1).toUpperCase() : ''))

const avatarClasses = computed(() => [`materin-ui-avatar--${props.shape}`])

const avatarStyle = computed(() => {
  const size = `${px.value}px`
  return {
    width: size,
    height: size,
    fontSize: `${Math.max(11, Math.round(px.value * 0.42))}px`
  }
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  overflow: hidden;
  color: $materin-text;
  background: $materin-glass-bg-subtle;
  border: 1px solid $materin-glass-border;
  font-weight: $materin-font-weight-medium;
  user-select: none;

  &--circle {
    border-radius: 50%;
  }

  &--square {
    border-radius: $materin-radius;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__text,
  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>
