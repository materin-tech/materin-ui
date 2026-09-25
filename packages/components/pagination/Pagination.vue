<template>
  <nav v-if="pageCount > 1" class="materin-ui-pagination" :class="[`materin-ui-pagination--${size}`]" aria-label="分页">
    <button class="materin-ui-pagination__prev" type="button" :disabled="page <= 1" aria-label="上一页" @click="go(page - 1)">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 3L5 8l5 5" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>

    <button
      v-for="p in pages"
      :key="p.key"
      class="materin-ui-pagination__page"
      :class="{ 'is-active': p.value === page, 'is-gap': p.value === 0 }"
      type="button"
      :disabled="p.value === 0"
      :aria-current="p.value === page ? 'page' : undefined"
      @click="p.value !== 0 && go(p.value)"
    >
      {{ p.value === 0 ? '…' : p.value }}
    </button>

    <button class="materin-ui-pagination__next" type="button" :disabled="page >= pageCount" aria-label="下一页" @click="go(page + 1)">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3l5 5-5 5" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>

    <span v-if="totalText" class="materin-ui-pagination__total">{{ totalText }}</span>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'MiPagination' })

interface PaginationProps {
  total: number
  /** 每页条数 */
  pageSize?: number
  /** 当前页（从 1 起）；传了就是受控 */
  currentPage?: number
  /** 页码按钮最多显示几个（含省略号占位） */
  pagerCount?: number
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSize: 10,
  currentPage: undefined,
  pagerCount: 7,
  size: 'md'
})

const emit = defineEmits<{
  (e: 'update:currentPage', value: number): void
  (e: 'change', value: number): void
}>()

const inner = ref(1)
const page = computed(() => props.currentPage ?? inner.value)
const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const go = (target: number) => {
  const next = Math.min(pageCount.value, Math.max(1, target))
  inner.value = next
  emit('update:currentPage', next)
  if (next !== page.value) emit('change', next)
}

/** 页码 + 省略号（0 = 省略号占位） */
const pages = computed(() => {
  const count = pageCount.value
  const max = Math.max(5, props.pagerCount)
  if (count <= max) {
    return Array.from({ length: count }, (_, i) => ({ key: String(i + 1), value: i + 1 }))
  }
  const list: { key: string; value: number }[] = [{ key: '1', value: 1 }]
  const half = Math.floor(max / 2)
  let start = Math.max(2, page.value - half)
  const end = Math.min(count - 1, start + max - 5)
  start = Math.max(2, end - (max - 5))
  if (start > 2) list.push({ key: 'gl', value: 0 })
  for (let i = start; i <= end; i += 1) list.push({ key: String(i), value: i })
  if (end < count - 1) list.push({ key: 'gr', value: 0 })
  list.push({ key: String(count), value: count })
  return list
})

const totalText = computed(() => `${props.total}`)
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-pagination {
  display: flex;
  align-items: center;
  gap: $materin-space-1;

  &__prev,
  &__next,
  &__page {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    height: 30px;
    padding: 0 $materin-space-1;
    border: 1px solid transparent;
    border-radius: $materin-radius;
    background: transparent;
    color: $materin-text-muted;
    font-family: $materin-font-ui;
    font-size: $materin-font-size-small;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
    transition: all $materin-duration-fast $materin-ease-standard;

    svg {
      width: 13px;
      height: 13px;
    }

    &:hover:not(:disabled):not(.is-active) {
      background: $materin-surface-4;
      color: $materin-text;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__page.is-active {
    background: $materin-accent;
    color: $materin-on-accent;
  }

  &__page.is-gap {
    cursor: default;
  }

  &__total {
    margin-left: $materin-space-2;
    color: $materin-text-faint;
    font-size: $materin-font-size-caption;
    font-variant-numeric: tabular-nums;
  }

  &--sm &__prev,
  &--sm &__next,
  &--sm &__page {
    min-width: 26px;
    height: 26px;
    font-size: $materin-font-size-caption;
  }
}
</style>
