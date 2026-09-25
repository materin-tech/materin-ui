<template>
  <span ref="rootRef" class="materin-ui-time-select" :class="{ 'is-open': open }">
    <button class="materin-ui-time-select__field materin-ui-field__inner" type="button" @click="open = !open">
      {{ modelValue || placeholder }} ▾
    </button>

    <ul v-if="open" class="materin-ui-time-select__panel">
      <li
        v-for="slot in slots"
        :key="slot"
        class="materin-ui-time-select__option"
        :class="{ 'is-active': slot === modelValue }"
        @click="pick(slot)"
      >
        {{ slot }}
      </li>
    </ul>
  </span>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

defineOptions({ name: 'MiTimeSelect' })

interface TimeSelectProps {
  modelValue?: string
  /** HH:mm 起始 */
  start?: string
  /** HH:mm 结束 */
  end?: string
  /** 步进（分钟） */
  step?: number
  placeholder?: string
}

const props = withDefaults(defineProps<TimeSelectProps>(), {
  modelValue: '',
  start: '09:00',
  end: '18:00',
  step: 30,
  placeholder: '选择时间'
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const rootRef = ref<HTMLElement>()
const open = ref(false)

const toMinutes = (value: string) => {
  const [h, m] = value.split(':').map(Number)
  return h * 60 + m
}

const slots = computed(() => {
  const result: string[] = []
  for (let minutes = toMinutes(props.start); minutes <= toMinutes(props.end); minutes += props.step) {
    result.push(`${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`)
  }
  return result
})

const pick = (slot: string) => {
  emit('update:modelValue', slot)
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

.materin-ui-time-select {
  position: relative;
  display: inline-block;

  &__field {
    min-width: 110px;
    text-align: left;
    cursor: pointer;
  }

  &__panel {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 2100;
    min-width: 110px;
    max-height: 220px;
    margin: 0;
    padding: $materin-space-1;
    border: 1px solid $materin-glass-border;
    border-radius: $materin-radius;
    background: $materin-glass-bg-strong;
    backdrop-filter: $materin-glass-blur;
    -webkit-backdrop-filter: $materin-glass-blur;
    box-shadow: $materin-elev-2;
    list-style: none;
    overflow: auto;
  }

  &__option {
    padding: $materin-space-2 $materin-space-3;
    border-radius: $materin-radius;
    color: $materin-text;
    font-size: $materin-font-size-small;
    font-variant-numeric: tabular-nums;
    cursor: pointer;

    &:hover {
      background: $materin-surface-4;
    }

    &.is-active {
      background: $materin-accent-soft;
      color: $materin-accent;
    }
  }
}
</style>
