<template>
  <span ref="rootRef" class="materin-ui-date-picker" :class="{ 'is-open': open }">
    <input
      class="materin-ui-date-picker__field materin-ui-field__inner"
      type="text"
      :value="displayText"
      :placeholder="placeholder"
      readonly
      @click="open = !open"
    />

    <div v-if="open" class="materin-ui-date-picker__panel" role="dialog">
      <header class="materin-ui-date-picker__head">
        <button class="materin-ui-date-picker__nav" type="button" aria-label="上一月" @click="shiftMonth(-1)">‹</button>
        <span class="materin-ui-date-picker__month">{{ year }} / {{ String(month + 1).padStart(2, '0') }}</span>
        <button class="materin-ui-date-picker__nav" type="button" aria-label="下一月" @click="shiftMonth(1)">›</button>
      </header>

      <div class="materin-ui-calendar__grid materin-ui-date-picker__grid">
        <span v-for="day in weekdayLabels" :key="day" class="materin-ui-calendar__weekday">{{ day }}</span>
        <button
          v-for="cell in cells"
          :key="cell.key"
          class="materin-ui-calendar__cell"
          :class="{
            'is-outside': cell.outside,
            'is-today': cell.today,
            'is-selected': cell.selected,
            'is-disabled': cell.disabled
          }"
          type="button"
          :disabled="cell.disabled"
          @click="pick(cell)"
        >
          {{ cell.day }}
        </button>
      </div>
    </div>
  </span>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

defineOptions({ name: 'MiDatePicker' })

interface DatePickerProps {
  /** ISO 日期（YYYY-MM-DD） */
  modelValue?: string
  placeholder?: string
  /** 禁用今天之前的日期 */
  disablePast?: boolean
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: '',
  placeholder: '选择日期',
  disablePast: false
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const rootRef = ref<HTMLElement>()
const open = ref(false)

const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth())

const weekdayLabels = ['日', '一', '二', '三', '四', '五', '六']

const shiftMonth = (delta: number) => {
  const next = new Date(year.value, month.value + delta, 1)
  year.value = next.getFullYear()
  month.value = next.getMonth()
}

const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

interface Cell {
  key: string
  day: number
  iso: string
  outside: boolean
  today: boolean
  selected: boolean
  disabled: boolean
}

const cells = computed<Cell[]>(() => {
  const first = new Date(year.value, month.value, 1)
  const startOffset = first.getDay()
  const result: Cell[] = []
  const todayIso = iso(today.getFullYear(), today.getMonth(), today.getDate())
  for (let i = 0; i < 42; i += 1) {
    const date = new Date(year.value, month.value, 1 - startOffset + i)
    const cellIso = iso(date.getFullYear(), date.getMonth(), date.getDate())
    result.push({
      key: cellIso,
      day: date.getDate(),
      iso: cellIso,
      outside: date.getMonth() !== month.value,
      today: cellIso === todayIso,
      selected: cellIso === props.modelValue,
      disabled: props.disablePast && cellIso < todayIso
    })
  }
  return result
})

const displayText = computed(() => props.modelValue || '')

const pick = (cell: Cell) => {
  if (cell.disabled) return
  emit('update:modelValue', cell.iso)
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

.materin-ui-date-picker {
  position: relative;
  display: inline-block;

  &__field {
    min-width: 140px;
    cursor: pointer;
  }

  &__panel {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 2100;
    padding: $materin-space-3;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius-lg;
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur;
    -webkit-backdrop-filter: $materin-glass-blur;
    box-shadow: $materin-elev-2;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $materin-space-2;
  }

  &__month {
    color: $materin-text;
    font-size: $materin-font-size-small;
    font-variant-numeric: tabular-nums;
  }

  &__nav {
    width: 24px;
    height: 24px;
    border: none;
    border-radius: $materin-radius;
    background: transparent;
    color: $materin-text-muted;
    cursor: pointer;

    &:hover {
      background: $materin-surface-4;
      color: $materin-text;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 28px);
    gap: 2px;
  }
}
</style>
