<template>
  <span class="materin-ui-method-tag" :class="`materin-ui-method-tag--${normalized}`">{{ normalized }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MiMethodTag' })

interface MethodTagProps {
  method?: string
}

const props = withDefaults(defineProps<MethodTagProps>(), { method: 'GET' })

const normalized = computed(() => props.method.toUpperCase())
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-method-tag {
  display: inline-block;
  padding: 1px $materin-space-2;
  border-radius: $materin-radius;
  background: $materin-accent-soft;
  color: $materin-accent;
  font-family: $materin-font-mono, monospace;
  font-size: $materin-font-size-caption;
  font-weight: $materin-font-weight-medium;
  letter-spacing: 0.03em;

  &--get {
    background: $materin-accent-soft;
    color: $materin-accent;
  }

  &--post {
    background: $materin-ok-soft;
    color: $materin-ok;
  }

  &--put,
  &--patch {
    background: $materin-warn-soft;
    color: $materin-warn;
  }

  &--delete {
    background: $materin-error-soft;
    color: $materin-error;
  }
}
</style>
