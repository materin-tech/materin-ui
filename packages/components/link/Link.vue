<template>
  <component
    :is="href ? 'a' : 'span'"
    class="materin-ui-link"
    :class="linkClasses"
    :href="disabled ? undefined : href"
    :target="href ? target : undefined"
    :rel="href ? rel : undefined"
    :aria-disabled="disabled || undefined"
    @click="handleClick"
  >
    <span v-if="$slots.icon" class="materin-ui-link__icon">
      <slot name="icon" />
    </span>
    <span class="materin-ui-link__content"><slot /></span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiLink' })

type LinkType = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'

interface LinkProps {
  type?: LinkType
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  underline?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<LinkProps>(), {
  type: 'primary',
  target: '_self',
  rel: 'noopener',
  underline: true,
  disabled: false
})

const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>()

const linkClasses = computed(() => [
  `materin-ui-link--${props.type}`,
  {
    'materin-ui-link--underline': props.underline,
    'materin-ui-link--disabled': props.disabled
  }
])

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    event.stopImmediatePropagation()
    return
  }
  emit('click', event)
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-link {
  @include materin-component-base;

  display: inline-flex;
  align-items: center;
  gap: $materin-space-1;
  color: $materin-accent;
  font-size: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: color $materin-duration-fast $materin-ease-standard;

  &--underline {
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
  }

  &:hover {
    color: $materin-accent-strong;
  }

  &--default {
    color: $materin-text;

    &:hover {
      color: $materin-accent;
    }
  }

  &--primary {
    color: $materin-accent;
  }

  &--secondary {
    color: $materin-secondary;

    &:hover {
      color: $materin-secondary;
      opacity: 0.85;
    }
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

  &--disabled {
    color: $materin-text-faint;
    cursor: not-allowed;
    text-decoration: none;
    pointer-events: none;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
  }

  &__content {
    display: inline-flex;
    align-items: center;
  }
}
</style>
