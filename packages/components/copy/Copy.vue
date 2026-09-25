<template>
  <span class="materin-ui-copy">
    <button class="materin-ui-copy__button" type="button" :aria-label="'复制'" @click="copy">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
        <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
      </svg>
    </button>
    <Transition name="mi-copy-fade">
      <span v-if="copied" class="materin-ui-copy__feedback">{{ copiedText }}</span>
    </Transition>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'MiCopy' })

interface CopyProps {
  text: string
  copiedText?: string
}

const props = withDefaults(defineProps<CopyProps>(), { copiedText: '已复制' })

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

const copy = async () => {
  if (typeof navigator === 'undefined') return
  await navigator.clipboard.writeText(props.text)
  copied.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    copied.value = false
  }, 1500)
}
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-copy {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: $materin-space-2;

  &__button {
    display: inline-flex;
    padding: $materin-space-1;
    border: 1px solid $materin-border;
    border-radius: $materin-radius;
    background: $materin-surface-3;
    color: $materin-text-muted;
    cursor: pointer;

    svg {
      width: 13px;
      height: 13px;
    }

    &:hover {
      color: $materin-text;
      background: $materin-surface-4;
    }
  }

  &__feedback {
    color: $materin-ok;
    font-size: $materin-font-size-caption;
  }
}

.mi-copy-fade-enter-active,
.mi-copy-fade-leave-active {
  transition: opacity $materin-duration-fast $materin-ease-standard;
}

.mi-copy-fade-enter-from,
.mi-copy-fade-leave-to {
  opacity: 0;
}
</style>
