<template>
  <ul class="materin-ui-tree" role="tree">
    <li v-for="node in nodes" :key="keyOf(node)" role="treeitem">
      <div class="materin-ui-tree__row">
        <span
          v-if="node.children?.length"
          class="materin-ui-tree__expand"
          :class="{ 'is-expanded': expanded.has(keyOf(node)) }"
          @click="toggle(node)"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </span>
        <span v-else class="materin-ui-tree__indent" />

        <input
          v-if="checkable"
          class="materin-ui-tree__checkbox"
          type="checkbox"
          :checked="isChecked(node)"
          @change="toggleCheck(node)"
        />

        <span class="materin-ui-tree__label">{{ node.label }}</span>
      </div>

      <MiTree
        v-if="node.children?.length && expanded.has(keyOf(node))"
        class="materin-ui-tree__children"
        :nodes="node.children"
        :checkable="checkable"
        :model-value="modelValue"
        role="group"
        @update:model-value="reemit"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TreeNode } from './types'

defineOptions({ name: 'MiTree' })

interface TreeProps {
  nodes?: TreeNode[]
  checkable?: boolean
  /** 受控：勾选的 key 集合 */
  modelValue?: (string | number)[]
  defaultExpandedKeys?: (string | number)[]
}

const props = withDefaults(defineProps<TreeProps>(), {
  nodes: () => [],
  checkable: false,
  modelValue: () => [],
  defaultExpandedKeys: () => []
})

const emit = defineEmits<{ (e: 'update:modelValue', value: (string | number)[]): void }>()

const expanded = ref<Set<string | number>>(new Set(props.defaultExpandedKeys))

const keyOf = (node: TreeNode) => node.key ?? node.label

const toggle = (node: TreeNode) => {
  const key = keyOf(node)
  const next = new Set(expanded.value)
  if (next.has(key)) {
    next.delete(key)
  } else {
    next.add(key)
  }
  expanded.value = next
}

const isChecked = (node: TreeNode) => props.modelValue.includes(keyOf(node))

const toggleCheck = (node: TreeNode) => {
  const key = keyOf(node)
  const next = new Set(props.modelValue)
  if (next.has(key)) {
    next.delete(key)
  } else {
    next.add(key)
  }
  emit('update:modelValue', [...next])
}

const reemit = (value: (string | number)[]) => emit('update:modelValue', value)
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-tree {
  margin: 0;
  padding: 0;
  list-style: none;

  &__row {
    display: flex;
    align-items: center;
    gap: $materin-space-2;
    padding: $materin-space-1 $materin-space-2;
    border-radius: $materin-radius;

    &:hover {
      background: $materin-surface-4;
    }
  }

  &__expand {
    display: inline-flex;
    padding: 2px;
    color: $materin-text-muted;
    cursor: pointer;
    transition: transform $materin-duration-fast $materin-ease-standard;

    svg {
      width: 12px;
      height: 12px;
    }

    &.is-expanded {
      transform: rotate(90deg);
    }
  }

  &__indent {
    display: inline-block;
    width: 16px;
  }

  &__checkbox {
    cursor: pointer;
  }

  &__label {
    color: $materin-text;
    font-size: $materin-font-size-small;
  }

  &__children {
    margin: 0;
    padding: 0 0 0 $materin-space-5;
    list-style: none;
  }
}
</style>
