<template>
  <MiSpace :size="16">
    <MiSwitch v-model="on" />
    <MiSwitch v-model="on" disabled />
    <MiText size="sm">{{ on ? '开' : '关' }}</MiText>
  </MiSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MiSwitch, MiText } from '@/materin-ui/index'

const on = ref(true)
</script>
