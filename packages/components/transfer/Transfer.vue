<template>
  <div class="materin-ui-transfer">
    <div class="materin-ui-transfer__panel">
      <p class="materin-ui-transfer__head">{{ sourceTitle }}（{{ leftChecked.length }}/{{ sourceItems.length }}）</p>
      <div class="materin-ui-transfer__list">
        <label v-for="item in sourceItems" :key="item.key" class="materin-ui-transfer__option">
          <input v-model="leftChecked" type="checkbox" :value="item.key" />
          <span>{{ item.label }}</span>
        </label>
      </div>
    </div>

    <div class="materin-ui-transfer__actions">
      <button :disabled="leftChecked.length === 0" @click="toRight">→</button>
      <button :disabled="rightChecked.length === 0" @click="toLeft">←</button>
    </div>

    <div class="materin-ui-transfer__panel">
      <p class="materin-ui-transfer__head">{{ targetTitle }}（{{ rightChecked.length }}/{{ targetItems.length }}）</p>
      <div class="materin-ui-transfer__list">
        <label v-for="item in targetItems" :key="item.key" class="materin-ui-transfer__option">
          <input v-model="rightChecked" type="checkbox" :value="item.key" />
          <span>{{ item.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TransferItem } from './types'

defineOptions({ name: 'MiTransfer' })

interface TransferProps {
  items?: TransferItem[]
  /** 已选 key 集合（受控） */
  modelValue?: (string | number)[]
  sourceTitle?: string
  targetTitle?: string
}

const props = withDefaults(defineProps<TransferProps>(), {
  items: () => [],
  modelValue: () => [],
  sourceTitle: '待选',
  targetTitle: '已选'
})

const emit = defineEmits<{ (e: 'update:modelValue', value: (string | number)[]): void }>()

const leftChecked = ref<(string | number)[]>([])
const rightChecked = ref<(string | number)[]>([])

const sourceItems = computed(() => props.items.filter((item) => !props.modelValue.includes(item.key)))
const targetItems = computed(() => props.items.filter((item) => props.modelValue.includes(item.key)))

const toRight = () => {
  emit('update:modelValue', [...props.modelValue, ...leftChecked.value])
  leftChecked.value = []
}

const toLeft = () => {
  emit('update:modelValue', props.modelValue.filter((key) => !rightChecked.value.includes(key)))
  rightChecked.value = []
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-transfer {
  display: flex;
  align-items: center;
  gap: $materin-space-3;

  &__panel {
    flex: 1 1 0;
    border: 1px solid $materin-border;
    border-radius: $materin-radius;
    background: $materin-surface-2;
    overflow: hidden;
  }

  &__head {
    margin: 0;
    padding: $materin-space-2 $materin-space-3;
    border-bottom: 1px solid $materin-border;
    color: $materin-text-muted;
    font-size: $materin-font-size-caption;
    font-variant-numeric: tabular-nums;
  }

  &__list {
    max-height: 220px;
    overflow: auto;
  }

  &__option {
    display: flex;
    align-items: center;
    gap: $materin-space-2;
    padding: $materin-space-1 $materin-space-3;
    color: $materin-text;
    font-size: $materin-font-size-small;
    cursor: pointer;

    &:hover {
      background: $materin-surface-4;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: $materin-space-2;

    button {
      width: 32px;
      height: 28px;
      border: 1px solid $materin-border;
      border-radius: $materin-radius;
      background: $materin-surface-3;
      color: $materin-text;
      cursor: pointer;

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: $materin-surface-4;
      }
    }
  }
}
</style>
