<template>
  <div class="materin-ui-tabs">
    <div class="materin-ui-tabs__list" role="tablist">
      <button
        v-for="(pane, i) in panes"
        :key="pane.name"
        class="materin-ui-tabs__tab"
        :class="{ 'is-active': pane.name === current }"
        type="button"
        role="tab"
        :aria-selected="pane.name === current"
        @click="select(i)"
      >
        {{ pane.label }}
      </button>
    </div>
    <div class="materin-ui-tabs__panels">
      <div
        v-for="pane in panes"
        :key="pane.name"
        v-show="pane.name === current"
        class="materin-ui-tabs__panel"
        role="tabpanel"
      >
        <component :is="pane.vnode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue'
import type { TabPane } from './types'

defineOptions({ name: 'MiTabs' })

interface TabsProps {
  modelValue?: string
}

const props = withDefaults(defineProps<TabsProps>(), { modelValue: undefined })
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const slots = useSlots()

const paneOf = (vnode: unknown) => (vnode as { props?: Record<string, unknown> }).props ?? {}

const panes = computed<TabPane[]>(() =>
  (slots.default?.() ?? [])
    .filter((vnode) => paneOf(vnode).name !== undefined)
    .map((vnode) => {
      const props_ = paneOf(vnode)
      const name = String(props_.name)
      return { name, label: String(props_.label ?? name), vnode }
    })
)

const inner = ref(props.modelValue ?? panes.value[0]?.name ?? '')
const current = computed(() => props.modelValue ?? inner.value)

watch(() => props.modelValue, (value) => {
  if (value !== undefined) inner.value = value
})

const select = (index: number) => {
  const pane = panes.value[index]
  if (!pane || pane.name === current.value) return
  inner.value = pane.name
  emit('update:modelValue', pane.name)
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-tabs {
  &__list {
    display: flex;
    gap: $materin-space-1;
    border-bottom: 1px solid $materin-border;
  }

  &__tab {
    padding: $materin-space-2 $materin-space-3;
    border: none;
    border-bottom: 2px solid transparent;
    background: transparent;
    color: $materin-text-muted;
    font-family: $materin-font-ui;
    font-size: $materin-font-size-body;
    cursor: pointer;
    transition: all $materin-duration-fast $materin-ease-standard;

    &:hover {
      color: $materin-text;
    }

    &.is-active {
      border-bottom-color: $materin-accent;
      color: $materin-text;
      font-weight: $materin-font-weight-medium;
    }
  }

  &__panels {
    padding: $materin-space-4 0;
  }

  &__panel {
    color: $materin-text;
    font-size: $materin-font-size-body;
    line-height: $materin-line-height-normal;
  }
}
</style>
