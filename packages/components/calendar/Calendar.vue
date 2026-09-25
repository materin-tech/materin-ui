<template>
  <div class="materin-ui-calendar">
    <header class="materin-ui-calendar__head">
      <button class="materin-ui-calendar__nav" type="button" aria-label="上一月" @click="shift(-1)">‹</button>
      <span class="materin-ui-calendar__month">{{ year }} / {{ String(month + 1).padStart(2, '0') }}</span>
      <button class="materin-ui-calendar__nav" type="button" aria-label="下一月" @click="shift(1)">›</button>
    </header>

    <div class="materin-ui-calendar__grid">
      <span v-for="day in weekdays" :key="day" class="materin-ui-calendar__weekday">{{ day }}</span>
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
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'MiCalendar' })

interface CalendarProps {
  /** ISO 日期（受控） */
  modelValue?: string
  disablePast?: boolean
}

const props = withDefaults(defineProps<CalendarProps>(), { modelValue: '', disablePast: false })

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const weekdays = ['日', '一', '二', '三', '四', '五', '六']
const now = new Date()
const year = ref(now.getFullYear())
const month = ref(now.getMonth())

const shift = (delta: number) => {
  const next = new Date(year.value, month.value + delta, 1)
  year.value = next.getFullYear()
  month.value = next.getMonth()
}

const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

interface DayCell {
  key: string
  day: number
  iso: string
  outside: boolean
  today: boolean
  selected: boolean
  disabled: boolean
}

const cells = computed<DayCell[]>(() => {
  const first = new Date(year.value, month.value, 1)
  const startOffset = first.getDay()
  const todayIso = iso(now.getFullYear(), now.getMonth(), now.getDate())
  const result: DayCell[] = []
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

const pick = (cell: DayCell) => {
  if (cell.disabled) return
  emit('update:modelValue', cell.iso)
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-calendar {
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
    width: 26px;
    height: 26px;
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
    grid-template-columns: repeat(7, 32px);
    gap: 2px;
  }

  &__weekday {
    padding: $materin-space-1 0;
    color: $materin-text-faint;
    font-size: $materin-font-size-caption;
    text-align: center;
  }

  &__cell {
    height: 30px;
    border: none;
    border-radius: $materin-radius;
    background: transparent;
    color: $materin-text;
    font-size: $materin-font-size-small;
    font-variant-numeric: tabular-nums;
    cursor: pointer;

    &.is-outside {
      color: $materin-text-faint;
      opacity: 0.5;
    }

    &.is-today {
      border: 1px solid $materin-accent;
    }

    &.is-selected {
      background: $materin-accent;
      color: $materin-on-accent;
    }

    &.is-disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    &:not(.is-disabled):hover {
      background: $materin-surface-4;
    }
  }
}
</style>
