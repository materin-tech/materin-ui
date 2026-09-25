<template>
  <MiSpace direction="vertical" :size="12" fill>
    <MiInput v-model="text" placeholder="写点什么…" clearable />
    <MiInput v-model="text" size="sm" placeholder="小尺寸" />
    <MiInput v-model="text" disabled placeholder="禁用" />
    <MiText size="sm" type="muted">值：{{ text || '（空）' }}</MiText>
  </MiSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MiInput, MiSpace, MiText } from '@/materin-ui/index'

const text = ref('')
</script>
