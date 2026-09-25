<template>
  <div class="materin-ui-collapse-item" :class="{ 'is-open': open }">
    <button class="materin-ui-collapse-item__head" type="button" :aria-expanded="open" @click="toggle">
      <span class="materin-ui-collapse-item__title"><slot name="title">{{ title }}</slot></span>
      <span class="materin-ui-collapse-item__arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6l4 4 4-4" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </span>
    </button>
    <div v-show="open" class="materin-ui-collapse-item__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { COLLAPSE_KEY, type CollapseContext } from '../collapse/types'

defineOptions({ name: 'MiCollapseItem' })

interface CollapseItemProps {
  title?: string
  name?: string | number
}

const props = withDefaults(defineProps<CollapseItemProps>(), {
  title: '',
  name: undefined
})

const group = inject< CollapseContext | null>(COLLAPSE_KEY as unknown as symbol, null)
const selfOpen = ref(false)

// 在 MiCollapse 里时展开状态由组下发；独立使用时自己管自己
const open = computed(() => {
  if (group) return Boolean(group.registered.value[String(props.name ?? '')])
  return selfOpen.value
})

const toggle = () => {
  if (group) {
    group.toggle(props.name ?? '')
  } else {
    selfOpen.value = !selfOpen.value
  }
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-collapse-item {
  border-bottom: 1px solid $materin-border;

  &:last-child {
    border-bottom: none;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $materin-space-3;
    width: 100%;
    padding: $materin-space-3 $materin-space-1;
    border: none;
    background: transparent;
    color: $materin-text;
    font-family: $materin-font-ui;
    font-size: $materin-font-size-body;
    text-align: left;
    cursor: pointer;

    &:hover {
      color: $materin-accent;
    }
  }

  &__title {
    flex: 1 1 auto;
  }

  &__arrow {
    display: inline-flex;
    flex: 0 0 auto;
    color: $materin-text-muted;
    transition: transform $materin-duration-fast $materin-ease-standard;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  &.is-open &__arrow {
    transform: rotate(180deg);
  }

  &__content {
    padding: 0 $materin-space-1 $materin-space-3;
    color: $materin-text-muted;
    font-size: $materin-font-size-body;
    line-height: $materin-line-height-normal;
  }
}
</style>
