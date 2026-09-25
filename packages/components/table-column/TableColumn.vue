<template>
  <!-- 配置型组件：不渲染 DOM，列信息由 MiTable 直接吃配置 -->
  <span hidden />
</template>

<script setup lang="ts">
defineOptions({ name: 'MiTableColumn' })

defineProps<{ keyName?: string; title?: string; width?: number }>()
</script>
