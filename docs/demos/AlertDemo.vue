<template>
  <MiSpace direction="vertical" :size="10" fill>
    <MiAlert type="info" title="信息" description="说明性内容。" />
    <MiAlert type="success" title="成功" description="已完成。" />
    <MiAlert type="warning" title="警告" description="请留意。" />
    <MiAlert type="error" title="错误" description="可以重试。" />
  </MiSpace>
</template>

<script setup lang="ts">
import { MiAlert, MiSpace } from '@/materin-ui/index'
</script>
