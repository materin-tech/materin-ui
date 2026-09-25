<template>
  <MiSpace direction="vertical" :size="12">
    <MiPagination :total="930" :page-size="30" :current-page="page" @change="page = $event" />
    <MiText size="sm" type="muted">当前页 {{ page }}</MiText>
  </MiSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MiPagination, MiSpace, MiText } from '@/materin-ui/index'

const page = ref(3)
</script>
