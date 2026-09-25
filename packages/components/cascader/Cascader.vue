<template>
  <span ref="rootRef" class="materin-ui-cascader" :class="{ 'is-open': open && activePath.length > 0 }">
    <button class="materin-ui-cascader__field materin-ui-field__inner" type="button" @click="open = !open">
      {{ displayText || placeholder }} ▾
    </button>

    <div v-if="open" class="materin-ui-cascader__columns">
      <ul
        v-for="(column, ci) in columns"
        :key="ci"
        class="materin-ui-cascader__column"
      >
        <li
          v-for="option in column"
          :key="String(option.value)"
          class="materin-ui-cascader__option"
          :class="{ 'is-active': isActive(option, ci) }"
          @click="pick(option, ci)"
        >
          {{ option.label }}
          <span v-if="option.children?.length" class="materin-ui-cascader__arrow">›</span>
        </li>
      </ul>
    </div>
  </span>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import type { CascaderOption } from './types'

defineOptions({ name: 'MiCascader' })

interface CascaderProps {
  options?: CascaderOption[]
  /** 各级 value 路径（受控） */
  modelValue?: (string | number)[]
  placeholder?: string
}

const props = withDefaults(defineProps<CascaderProps>(), {
  options: () => [],
  modelValue: () => [],
  placeholder: '请选择'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'change', path: CascaderOption[]): void
}>()

const rootRef = ref<HTMLElement>()
const open = ref(false)
const activePath = ref<CascaderOption[]>([])

const columns = computed<CascaderOption[][]>(() => {
  const result: CascaderOption[][] = [props.options]
  let level = props.options
  for (const chosen of activePath.value) {
    const next = level.find((option) => option.value === chosen.value)?.children ?? []
    if (next.length === 0) break
    result.push(next)
    level = next
  }
  return result
})

const displayText = computed(() => activePath.value.map((option) => option.label).join(' / '))

const isActive = (option: CascaderOption, depth: number) =>
  activePath.value[depth]?.value === option.value

const pick = (option: CascaderOption, depth: number) => {
  activePath.value = activePath.value.slice(0, depth)
  activePath.value.push(option)
  if (!option.children?.length) {
    open.value = false
    emit('update:modelValue', activePath.value.map((item) => item.value))
    emit('change', [...activePath.value])
  }
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

.materin-ui-cascader {
  position: relative;
  display: inline-block;

  &__field {
    min-width: 160px;
    text-align: left;
    cursor: pointer;
  }

  &__columns {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 2100;
    display: flex;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius;
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur;
    -webkit-backdrop-filter: $materin-glass-blur;
    box-shadow: $materin-elev-2;
  }

  &__column {
    min-width: 150px;
    max-height: 240px;
    margin: 0;
    padding: $materin-space-1;
    list-style: none;
    overflow: auto;

    & + & {
      border-left: 1px solid $materin-border;
    }
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $materin-space-2;
    padding: $materin-space-2 $materin-space-3;
    border-radius: $materin-radius;
    color: $materin-text;
    font-size: $materin-font-size-small;
    cursor: pointer;

    &:hover {
      background: $materin-surface-4;
    }

    &.is-active {
      background: $materin-accent-soft;
      color: $materin-accent;
    }
  }

  &__arrow {
    color: $materin-text-faint;
  }
}
</style>
