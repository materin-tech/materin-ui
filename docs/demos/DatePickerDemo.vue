<template>
  <MiSpace direction="vertical" :size="12">
    <MiDatePicker v-model="date" disable-past />
    <MiText size="sm" type="muted">选中：{{ date || '（未选）' }}</MiText>
  </MiSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MiDatePicker, MiSpace, MiText } from '@/materin-ui/index'

const date = ref('')
</script>
