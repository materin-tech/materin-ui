<template>
  <MiSpace wrap :size="10">
    <MiButton>默认</MiButton>
    <MiButton type="primary">主要</MiButton>
    <MiButton variant="ghost">幽灵</MiButton>
    <MiButton type="danger">危险</MiButton>
    <MiButton loading>加载中</MiButton>
    <MiButton disabled>禁用</MiButton>
  </MiSpace>
</template>

<script setup lang="ts">
import { MiButton, MiSpace } from '@/materin-ui/index'
</script>
