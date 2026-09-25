<template>
  <span ref="rootRef" class="materin-ui-mention" :class="{ 'is-open': open && filtered.length > 0 }">
    <input
      class="materin-ui-mention__field materin-ui-field__inner"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
      @keydown="onKeydown"
    />

    <ul v-if="open && filtered.length" class="materin-ui-mention__list" role="listbox">
      <li
        v-for="(option, i) in filtered"
        :key="option"
        class="materin-ui-mention__option"
        :class="{ 'is-active': i === cursor }"
        @mousedown.prevent="choose(option)"
      >
        {{ prefix }}{{ option }}
      </li>
    </ul>
  </span>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

defineOptions({ name: 'MiMention' })

interface MentionProps {
  modelValue?: string
  options?: string[]
  /** 触发符 */
  prefix?: string
  placeholder?: string
}

const props = withDefaults(defineProps<MentionProps>(), {
  modelValue: '',
  options: () => [],
  prefix: '@',
  placeholder: ''
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void; (e: 'select', value: string): void }>()

const rootRef = ref<HTMLElement>()
const open = ref(false)
const cursor = ref(0)
const query = ref('')

const filtered = computed(() => {
  if (!query.value) return props.options.slice(0, 6)
  return props.options.filter((item) => item.toLowerCase().includes(query.value.toLowerCase())).slice(0, 6)
})

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  const at = value.lastIndexOf(props.prefix)
  if (at >= 0) {
    query.value = value.slice(at + props.prefix.length)
    cursor.value = 0
    open.value = true
  } else {
    open.value = false
  }
}

const onKeydown = (event: KeyboardEvent) => {
  if (!open.value) return
  if (event.key === 'ArrowDown') {
    cursor.value = Math.min(filtered.value.length - 1, cursor.value + 1)
  } else if (event.key === 'ArrowUp') {
    cursor.value = Math.max(0, cursor.value - 1)
  } else if (event.key === 'Enter') {
    choose(filtered.value[cursor.value] ?? '')
  } else if (event.key === 'Escape') {
    open.value = false
  }
}

const choose = (option: string) => {
  if (!option) return
  const value = props.modelValue
  const at = value.lastIndexOf(props.prefix)
  const next = value.slice(0, at + props.prefix.length) + option + ' '
  emit('update:modelValue', next)
  emit('select', option)
  open.value = false
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

.materin-ui-mention {
  position: relative;
  display: inline-block;

  &__field {
    min-width: 200px;
  }

  &__list {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 2100;
    min-width: 160px;
    margin: 0;
    padding: $materin-space-1;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius;
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur;
    -webkit-backdrop-filter: $materin-glass-blur;
    box-shadow: $materin-elev-1;
    list-style: none;
  }

  &__option {
    padding: $materin-space-2 $materin-space-3;
    border-radius: $materin-radius;
    color: $materin-text;
    font-size: $materin-font-size-small;
    cursor: pointer;

    &.is-active {
      background: $materin-surface-4;
    }
  }
}
</style>
