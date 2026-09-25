<template>
  <div class="materin-ui-upload">
    <label class="materin-ui-upload__trigger materin-ui-btn materin-ui-btn--secondary">
      <input class="materin-ui-upload__input" type="file" multiple hidden @change="onChange" />
      {{ buttonText }}
    </label>

    <ul v-if="items.length" class="materin-ui-upload__list">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="materin-ui-upload__item"
        :class="{ 'is-error': item.status === 'error' }"
      >
        <span class="materin-ui-upload__name">{{ item.name }}</span>
        <span class="materin-ui-upload__size">{{ formatSize(item.size) }}</span>
        <span v-if="item.status === 'error'" class="materin-ui-upload__error">
          <button class="materin-ui-upload__retry" type="button" @click="retry(i)">重试</button>
        </span>
        <button class="materin-ui-upload__remove" type="button" aria-label="移除" @click="remove(i)">×</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadItem } from './types'

defineOptions({ name: 'MiUpload' })

interface UploadProps {
  buttonText?: string
  /** 最大字节数 */
  maxSize?: number
}

const props = withDefaults(defineProps<UploadProps>(), {
  buttonText: '选择文件',
  maxSize: undefined
})

const items = ref<UploadItem[]>([])

const formatSize = (size: number) => {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / 1024 / 1024).toFixed(1)} MB`
}

const onChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  for (const file of Array.from(input.files ?? [])) {
    if (props.maxSize && file.size > props.maxSize) {
      items.value.push({ name: file.name, size: file.size, status: 'error', file })
    } else {
      items.value.push({ name: file.name, size: file.size, status: 'ready', file })
    }
  }
  input.value = ''
}

const remove = (index: number) => {
  items.value.splice(index, 1)
}

const retry = (index: number) => {
  const item = items.value[index]
  if (item) item.status = 'ready'
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-upload {
  &__trigger {
    display: inline-flex;
    cursor: pointer;
  }

  &__input {
    display: none;
  }

  &__list {
    margin: $materin-space-3 0 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $materin-space-3;
    padding: $materin-space-2 $materin-space-3;
    border-bottom: 1px solid $materin-border;

    &.is-error &__name {
      color: $materin-error;
    }
  }

  &__name {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    color: $materin-text;
    font-size: $materin-font-size-small;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__size {
    flex: 0 0 auto;
    color: $materin-text-faint;
    font-size: $materin-font-size-caption;
    font-variant-numeric: tabular-nums;
  }

  &__error {
    flex: 0 0 auto;
  }

  &__retry {
    border: none;
    background: transparent;
    color: $materin-accent;
    font-size: $materin-font-size-caption;
    cursor: pointer;
  }

  &__remove {
    flex: 0 0 auto;
    border: none;
    background: transparent;
    color: $materin-text-muted;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: $materin-text;
    }
  }
}
</style>
