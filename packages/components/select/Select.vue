<template>
  <div class="materin-ui-select" :class="selectClasses" ref="rootEl">
    <div
      class="materin-ui-select__trigger"
      role="combobox"
      tabindex="0"
      :aria-expanded="open"
      :aria-controls="listId"
      :aria-invalid="isError || undefined"
      :aria-describedby="describedby || undefined"
      :aria-disabled="isDisabled || undefined"
      @click="toggleOpen"
      @keydown="handleKeydown"
    >
      <span v-if="multiple && selectedOptions.length" class="materin-ui-select__tags">
        <MiTag
          v-for="option in selectedOptions"
          :key="String(option.value)"
          size="sm"
          closable
          @close="removeValue(option.value)"
        >
          {{ option.label }}
        </MiTag>
      </span>
      <span
        v-else
        class="materin-ui-select__value"
        :class="{ 'is-placeholder': !displayLabel }"
      >
        {{ displayLabel || placeholder }}
      </span>
      <span class="materin-ui-select__arrow" aria-hidden="true">▾</span>
    </div>

    <div v-show="open" class="materin-ui-select__dropdown" :id="listId" role="listbox" :aria-multiselectable="multiple">
      <slot />
      <p v-if="!options.length" class="materin-ui-select__empty">{{ emptyText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onUnmounted, provide, ref, watch } from 'vue'
import MiTag from '../tag/Tag.vue'
import { SELECT_KEY, type ChoiceValue, type SelectOption } from '../_shared/choice'
import { FORM_ITEM_KEY } from '../_shared/form'

defineOptions({ name: 'MiSelect' })

interface SelectProps {
  modelValue?: ChoiceValue | ChoiceValue[] | null
  multiple?: boolean
  placeholder?: string
  emptyText?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: null,
  multiple: false,
  placeholder: '请选择',
  emptyText: '没有可选项'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ChoiceValue | ChoiceValue[] | null): void
  (e: 'change', value: ChoiceValue | ChoiceValue[] | null): void
}>()

const item = inject(FORM_ITEM_KEY, null)

const rootEl = ref<HTMLElement>()
const open = ref(false)
const options = ref<(SelectOption & { id: string })[]>([])
const activeId = ref('')
const listId = `mi-select-list-${Math.random().toString(36).slice(2, 9)}`

const isDisabled = computed(() => props.disabled || (item?.disabled ?? false))
const isError = computed(() => item?.isError ?? false)
const describedby = computed(() => item?.describedby)
const size = computed(() => props.size || item?.size || 'md')

const selectedValues = computed<ChoiceValue[]>(() => {
  if (props.multiple) return Array.isArray(props.modelValue) ? props.modelValue : []
  return props.modelValue === null || props.modelValue === undefined ? [] : [props.modelValue as ChoiceValue]
})

const selectedOptions = computed(() =>
  selectedValues.value.map(
    (value) => options.value.find((option) => option.value === value) || { value, label: String(value), id: String(value) }
  )
)

const displayLabel = computed(() => (selectedOptions.value.length ? selectedOptions.value[0].label : ''))

const selectClasses = computed(() => [
  `materin-ui-select--${size.value}`,
  {
    'is-open': open.value,
    'is-disabled': isDisabled.value,
    'is-error': isError.value,
    'is-multiple': props.multiple
  }
])

const commit = (value: ChoiceValue | ChoiceValue[] | null) => {
  emit('update:modelValue', value)
  emit('change', value)
  item?.notifyChange()
}

const isSelected = (value: ChoiceValue) => selectedValues.value.includes(value)

const selectValue = (value: ChoiceValue) => {
  if (props.multiple) {
    const next = isSelected(value)
      ? selectedValues.value.filter((entry) => entry !== value)
      : [...selectedValues.value, value]
    commit(next)
  } else {
    commit(value)
    open.value = false
    item?.notifyBlur()
  }
}

const removeValue = (value: ChoiceValue) => {
  commit(selectedValues.value.filter((entry) => entry !== value))
}

provide(SELECT_KEY, {
  isSelected,
  select: selectValue,
  register: (option) => {
    if (!options.value.some((entry) => entry.id === option.id)) options.value.push(option)
  },
  unregister: (id) => {
    options.value = options.value.filter((entry) => entry.id !== id)
  },
  isActive: (id) => activeId.value === id,
  setActive: (id) => {
    activeId.value = id
  },
  get size() {
    return size.value
  },
  get multiple() {
    return props.multiple
  }
})

const toggleOpen = () => {
  if (isDisabled.value) return
  open.value = !open.value
}

const moveActive = (step: number) => {
  const selectable = options.value.filter((option) => !option.disabled)
  if (!selectable.length) return
  const index = selectable.findIndex((option) => option.id === activeId.value)
  const nextIndex = (index + step + selectable.length) % selectable.length
  activeId.value = selectable[nextIndex].id
}

const handleKeydown = (event: KeyboardEvent) => {
  if (isDisabled.value) return
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (!open.value) {
        open.value = true
        return
      }
      {
        const active = options.value.find((option) => option.id === activeId.value)
        if (active && !active.disabled) selectValue(active.value)
      }
      break
    case 'ArrowDown':
      event.preventDefault()
      if (!open.value) open.value = true
      moveActive(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!open.value) open.value = true
      moveActive(-1)
      break
    case 'Escape':
      open.value = false
      break
  }
}

const onDocumentClick = (event: MouseEvent) => {
  if (!rootEl.value) return
  if (!rootEl.value.contains(event.target as Node)) open.value = false
}

watch(open, (value) => {
  if (typeof document === 'undefined') return
  if (value) {
    document.addEventListener('click', onDocumentClick, true)
    if (!activeId.value) moveActive(1)
  } else {
    document.removeEventListener('click', onDocumentClick, true)
    item?.notifyBlur()
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') document.removeEventListener('click', onDocumentClick, true)
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-select {
  position: relative;
  display: inline-block;
  min-width: 180px;
  font-size: $materin-font-size-body;

  &__trigger {
    display: flex;
    align-items: center;
    gap: $materin-space-2;
    min-height: 38px;
    padding: $materin-space-2 $materin-space-3;
    background: $materin-glass-bg-subtle;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius;
    color: $materin-text;
    cursor: pointer;
    transition: border-color $materin-duration-fast $materin-ease-standard;

    &:focus-visible {
      outline: none;
      border-color: $materin-accent;
      box-shadow: 0 0 0 3px $materin-accent-soft;
    }
  }

  &__value {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &.is-placeholder {
      color: $materin-text-faint;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $materin-space-1;
    flex: 1 1 auto;
  }

  &__arrow {
    flex: 0 0 auto;
    color: $materin-text-muted;
    font-size: $materin-font-size-caption;
    transition: transform $materin-duration-fast $materin-ease-standard;
  }

  &__dropdown {
    position: absolute;
    z-index: 30;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    max-height: 260px;
    overflow-y: auto;
    padding: $materin-space-1;
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur;
    -webkit-backdrop-filter: $materin-glass-blur;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius-lg;
    box-shadow: $materin-elev-2;
  }

  &__empty {
    margin: 0;
    padding: $materin-space-3;
    color: $materin-text-faint;
    font-size: $materin-font-size-small;
    text-align: center;
  }

  &.is-open &__trigger {
    border-color: $materin-accent;
  }

  &.is-open &__arrow {
    transform: rotate(180deg);
  }

  &.is-disabled &__trigger {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.is-error &__trigger {
    border-color: $materin-error;
  }

  &--md {
    font-size: $materin-font-size-body;
  }

  &--sm {
    font-size: $materin-font-size-small;

    .materin-ui-select__trigger {
      min-height: 32px;
      padding: $materin-space-1 $materin-space-2;
    }
  }

  &--lg {
    font-size: 16px;

    .materin-ui-select__trigger {
      min-height: 44px;
      padding: $materin-space-3 $materin-space-4;
    }
  }
}
</style>
