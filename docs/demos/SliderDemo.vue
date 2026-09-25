<template>
  <MiSpace direction="vertical" :size="16" fill>
    <MiSlider v-model="value" />
    <MiSlider :model-value="[20, 80]" range />
    <MiText size="sm">值：{{ value }}</MiText>
  </MiSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MiSlider, MiSpace, MiText } from '@/materin-ui/index'

const value = ref(40)
</script>
