<template>
  <MiTable :columns="columns" :rows="rows" striped bordered />
</template>

<script setup lang="ts">
import { MiTable } from '@/materin-ui/index'

const columns = [
  { key: 'name', title: '组件' },
  { key: 'klass', title: '根类名' },
  { key: 'status', title: '状态' }
]
const rows = [
  { name: 'Table', klass: 'materin-ui-table', status: 'done' },
  { name: 'Tree', klass: 'materin-ui-tree', status: 'done' },
  { name: 'Pagination', klass: 'materin-ui-pagination', status: 'done' }
]
</script>
