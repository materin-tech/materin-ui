<template>
  <span ref="rootRef" class="materin-ui-tree-select" :class="{ 'is-open': open }">
    <button class="materin-ui-tree-select__field materin-ui-field__inner" type="button" @click="open = !open">
      {{ displayLabel || placeholder }} ▾
    </button>

    <div v-if="open" class="materin-ui-tree-select__panel">
      <MiTree :nodes="nodes" :checkable="multiple" :model-value="checkedKeys" @update:model-value="onCheck" />
    </div>
  </span>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import MiTree from '../tree/Tree.vue'
import type { TreeNode } from '../tree/types'

defineOptions({ name: 'MiTreeSelect' })

interface TreeSelectProps {
  nodes?: TreeNode[]
  /** 叶子节点的 key（受控；多选为数组） */
  modelValue?: string | number | (string | number)[]
  multiple?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<TreeSelectProps>(), {
  nodes: () => [],
  modelValue: '',
  multiple: false,
  placeholder: '请选择'
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string | number | (string | number)[]): void }>()

const rootRef = ref<HTMLElement>()
const open = ref(false)

const labelOf = new Map<string | number, string>()
const walk = (nodes: TreeNode[]) => {
  nodes.forEach((node) => {
    labelOf.set(node.key ?? node.label, node.label)
    if (node.children) walk(node.children)
  })
}
walk(props.nodes)

const checkedKeys = computed(() =>
  props.multiple
    ? (props.modelValue as (string | number)[])
    : props.modelValue
      ? [props.modelValue as string | number]
      : []
)

const displayLabel = computed(() => {
  const keys = props.multiple
    ? (props.modelValue as (string | number)[])
    : props.modelValue
      ? [props.modelValue as string | number]
      : []
  return keys.map((key) => labelOf.get(key) ?? String(key)).join('、')
})

const onCheck = (value: (string | number)[]) => {
  emit('update:modelValue', props.multiple ? value : (value[value.length - 1] ?? ''))
}

const onDocClick = (event: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) open.value = false
}

if (typeof document !== 'undefined') document.addEventListener('click', onDocClick, true)
onUnmounted(() => {
  if (typeof document !== 'undefined') document.removeEventListener('click', onDocClick, true)
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-tree-select {
  position: relative;
  display: inline-block;

  &__field {
    min-width: 170px;
    text-align: left;
    cursor: pointer;
  }

  &__panel {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 2100;
    min-width: 220px;
    max-height: 260px;
    padding: $materin-space-2;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius;
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur;
    -webkit-backdrop-filter: $materin-glass-blur;
    box-shadow: $materin-elev-2;
    overflow: auto;
  }
}
</style>
