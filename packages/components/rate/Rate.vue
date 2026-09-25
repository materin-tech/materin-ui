<template>
  <div class="materin-ui-rate" :class="rateClasses" role="radiogroup" :aria-label="ariaLabel">
    <button
      v-for="index in max"
      :key="index"
      class="materin-ui-rate__item"
      type="button"
      role="radio"
      :aria-checked="index <= current"
      :disabled="disabled"
      :aria-label="`${index}`"
      @click="pick(index)"
      @mouseenter="hovered = index"
      @mouseleave="hovered = 0"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3.6l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 17l-5.3 2.8 1.1-5.9L3.5 9.8l5.9-.8z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <span v-if="showText" class="materin-ui-rate__text">{{ displayText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'MiRate' })

interface RateProps {
  modelValue?: number
  max?: number
  disabled?: boolean
  allowClear?: boolean
  showText?: boolean
  texts?: string[]
  ariaLabel?: string
}

const props = withDefaults(defineProps<RateProps>(), {
  modelValue: 0,
  max: 5,
  disabled: false,
  allowClear: true,
  showText: false,
  ariaLabel: '评分'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const hovered = ref(0)
const current = computed(() => hovered.value || props.modelValue)
const displayText = computed(() => props.texts?.[props.modelValue - 1] || `${props.modelValue} / ${props.max}`)

const rateClasses = computed(() => [
  { 'is-disabled': props.disabled, 'is-active': current.value > 0 }
])

const pick = (index: number) => {
  if (props.disabled) return
  const next = props.allowClear && props.modelValue === index ? 0 : index
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-rate {
  display: inline-flex;
  align-items: center;
  gap: $materin-space-1;

  &__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    padding: 0;
    border: none;
    background: transparent;
    color: $materin-surface-4;
    cursor: pointer;
    transition: color $materin-duration-fast $materin-ease-standard, transform $materin-duration-fast $materin-ease-standard;

    svg {
      width: 18px;
      height: 18px;
    }

    &:hover {
      transform: scale(1.12);
    }

    &[aria-checked='true'] {
      color: $materin-warn;
    }
  }

  &__text {
    margin-left: $materin-space-2;
    color: $materin-text-muted;
    font-size: $materin-font-size-small;
  }

  &.is-disabled {
    opacity: 0.55;

    .materin-ui-rate__item {
      cursor: not-allowed;

      &:hover {
        transform: none;
      }
    }
  }
}
</style>
