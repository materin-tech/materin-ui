<template>
  <MiTree :nodes="nodes" checkable :model-value="checked" @update:model-value="checked = $event" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MiTree } from '@/materin-ui/index'

const nodes = [
  {
    label: 'packages',
    key: 'packages',
    children: [
      { label: 'components', key: 'components' },
      { label: 'styles', key: 'styles' }
    ]
  },
  { label: 'docs', key: 'docs' },
  { label: 'tools', key: 'tools' }
]
const checked = ref<(string | number)[]>(['docs'])
</script>
