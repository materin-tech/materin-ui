<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px">
    <MiCard title="默认卡片">内容区走令牌底色。</MiCard>
    <MiCard title="毛玻璃" glass>毛玻璃底，不支持时自动降级。</MiCard>
  </div>
</template>

<script setup lang="ts">
import { MiCard } from '@/materin-ui/index'
</script>
