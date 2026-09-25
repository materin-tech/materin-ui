<template>
  <div class="materin-ui-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { COLLAPSE_KEY, type CollapseContext } from './types'

defineOptions({ name: 'MiCollapse' })

interface CollapseProps {
  /** 受控：当前展开的 name 集合 */
  modelValue?: (string | number)[]
  /** 手风琴：同时只展开一个 */
  accordion?: boolean
}

const props = withDefaults(defineProps<CollapseProps>(), {
  modelValue: undefined,
  accordion: false
})

const emit = defineEmits<{ (e: 'update:modelValue', value: (string | number)[]): void }>()

const inner = ref<Set<string | number>>(new Set())

const current = computed(() => (props.modelValue ? new Set(props.modelValue) : inner.value))

const toggle = (name: string | number) => {
  const next = new Set(current.value)
  if (next.has(name)) {
    next.delete(name)
  } else if (props.accordion) {
    inner.value = new Set([name])
    emit('update:modelValue', [name])
    return
  } else {
    next.add(name)
  }
  inner.value = next
  emit('update:modelValue', [...next])
}

const registered = computed(() => {
  const map: Record<string, boolean> = {}
  current.value.forEach((name) => {
    map[String(name)] = true
  })
  return map
})

watch(() => props.modelValue, (value) => {
  if (value) inner.value = new Set(value)
})

provide(COLLAPSE_KEY, { registered, toggle } satisfies CollapseContext)
</script>

<style lang="scss">
.materin-ui-collapse {
  display: block;
}
</style>
