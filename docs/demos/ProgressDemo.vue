<template>
  <MiSpace direction="vertical" :size="14" fill>
    <MiProgress :percent="30" />
    <MiProgress :percent="65" status="success" />
    <MiProgress :percent="90" status="warning" size="sm" />
    <MiProgress :percent="65" type="ring" :ring-size="48" />
  </MiSpace>
</template>

<script setup lang="ts">
import { MiProgress, MiSpace } from '@/materin-ui/index'
</script>
