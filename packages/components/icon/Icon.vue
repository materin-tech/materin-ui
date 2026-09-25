<template>
  <span class="materin-ui-icon" :class="[`materin-ui-icon--${size}`]" :aria-hidden="label ? undefined : 'true'" :aria-label="label || undefined">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path v-for="(d, i) in paths" :key="i" :d="d" />
    </svg>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiIcon' })

const GLYPHS: Record<string, string[]> = {
  search: ['M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z', 'M20 20l-4-4'],
  plus: ['M12 5v14', 'M5 12h14'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  check: ['M5 13l4 4L19 7'],
  arrowUp: ['M12 19V5', 'M6 11l6-6 6 6'],
  arrowDown: ['M12 5v14', 'M6 13l6 6 6-6'],
  copy: ['M9 9h10v10H9z', 'M5 15V5h10'],
  external: ['M14 5h5v5', 'M19 5l-8 8', 'M19 14v5H5V5h5'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16']
}

interface IconProps {
  name?: keyof typeof GLYPHS | string
  size?: 'sm' | 'md' | 'lg'
  /** 无障碍名称；给了图标就对读屏可见 */
  label?: string
}

const props = withDefaults(defineProps<IconProps>(), { name: 'check', size: 'md', label: '' })

const paths = computed(() => GLYPHS[props.name] ?? GLYPHS.check)
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-icon {
  display: inline-flex;
  color: currentColor;

  svg {
    width: 18px;
    height: 18px;
  }

  &--sm svg {
    width: 14px;
    height: 14px;
  }

  &--lg svg {
    width: 22px;
    height: 22px;
  }
}
</style>
