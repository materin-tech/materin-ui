<template>
  <div class="materin-ui-table" :class="{ 'materin-ui-table--striped': striped, 'materin-ui-table--bordered': bordered }">
    <div class="materin-ui-table__wrap">
      <table>
        <thead class="materin-ui-table__head">
          <tr>
            <th v-for="col in columns" :key="col.key" :style="{ width: col.width ? `${col.width}px` : undefined }">
              {{ col.title }}
            </th>
          </tr>
        </thead>
        <tbody class="materin-ui-table__body">
          <tr v-for="(row, ri) in rows" :key="ri">
            <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="rows.length === 0" class="materin-ui-table__empty">{{ emptyText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiTable' })

export interface TableColumn {
  key: string
  title: string
  width?: number
}

interface TableProps {
  columns?: TableColumn[]
  rows?: Record<string, unknown>[]
  striped?: boolean
  bordered?: boolean
  emptyText?: string
}

withDefaults(defineProps<TableProps>(), {
  columns: () => [],
  rows: () => [],
  striped: false,
  bordered: false,
  emptyText: '暂无数据'
})
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-table {
  &__head,
  &__body {
    // 语义钩子：行与表头样式落在 th/td 上
  }

  &__wrap table {
    width: 100%;
    border-collapse: collapse;
    font-size: $materin-font-size-small;
  }

  th,
  td {
    padding: $materin-space-2 $materin-space-3;
    text-align: left;
  }

  th {
    border-bottom: 1px solid $materin-border;
    color: $materin-text-muted;
    font-weight: $materin-font-weight-medium;
    white-space: nowrap;
  }

  td {
    border-bottom: 1px solid $materin-border;
    color: $materin-text;
  }

  &--striped tbody tr:nth-child(even) {
    background: $materin-surface-3;
  }

  &--bordered {
    th,
    td {
      border: 1px solid $materin-border;
    }
  }

  &__empty {
    margin: 0;
    padding: $materin-space-5;
    color: $materin-text-faint;
    font-size: $materin-font-size-small;
    text-align: center;
  }
}
</style>
