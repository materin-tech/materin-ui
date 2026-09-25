<template>
  <div class="materin-ui-divider" :class="dividerClasses">
    <span v-if="direction === 'horizontal' && $slots.default" class="materin-ui-divider__text">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiDivider' })

type BorderStyle = 'solid' | 'dashed' | 'dotted'
type ContentPosition = 'left' | 'center' | 'right'

interface DividerProps {
  direction?: 'horizontal' | 'vertical'
  borderStyle?: BorderStyle
  contentPosition?: ContentPosition
}

const props = withDefaults(defineProps<DividerProps>(), {
  direction: 'horizontal',
  borderStyle: 'solid',
  contentPosition: 'center'
})

const dividerClasses = computed(() => [
  `materin-ui-divider--${props.direction}`,
  `materin-ui-divider--${props.borderStyle}`,
  `materin-ui-divider--${props.contentPosition}`
])
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-divider {
  display: flex;
  align-items: center;
  width: 100%;
  margin: $materin-space-4 0;
  color: $materin-text-muted;
  font-size: $materin-font-size-small;

  &::before,
  &::after {
    content: '';
    flex: 1 1 auto;
    height: 1px;
    background: $materin-border;
  }

  &__text {
    padding: 0 $materin-space-3;
    white-space: nowrap;
  }

  // 横向（默认）：整行铺开
  &--horizontal {
    width: 100%;
  }

  // 文字居中（默认）：两侧等分
  &--center::before,
  &--center::after {
    flex: 1 1 auto;
  }

  // 线型
  &--solid::before,
  &--solid::after {
    border-top-style: solid;
  }

  &--dashed::before,
  &--dashed::after {
    background: none;
    border-top: 1px dashed $materin-border;
  }

  &--dotted::before,
  &--dotted::after {
    background: none;
    border-top: 1px dotted $materin-border;
  }

  // 文字位置
  &--left::before {
    flex: 0 0 $materin-space-5;
  }

  &--right::after {
    flex: 0 0 $materin-space-5;
  }

  // 竖分割线
  &--vertical {
    display: inline-block;
    width: 1px;
    height: 1em;
    margin: 0 $materin-space-2;
    vertical-align: middle;
    background: $materin-border;

    &::before,
    &::after {
      content: none;
    }
  }
}
</style>
