<template>
  <MiSpace wrap :size="10">
    <MiTag>默认</MiTag>
    <MiTag type="primary">主要</MiTag>
    <MiTag type="success">成功</MiTag>
    <MiTag type="warning">警告</MiTag>
    <MiTag type="danger">危险</MiTag>
    <MiTag closable>可关闭</MiTag>
  </MiSpace>
</template>

<script setup lang="ts">
import { MiTag } from '@/materin-ui/index'
</script>
