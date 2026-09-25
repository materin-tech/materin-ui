<template>
  <MiSpace direction="vertical" :size="12" fill>
    <MiSelect v-model="value" placeholder="选一个方案">
      <MiOption label="免费版" value="free" />
      <MiOption label="专业版" value="pro" />
      <MiOption label="团队版" value="team" disabled />
    </MiSelect>
    <MiText size="sm" type="muted">选中：{{ value || '（未选）' }}</MiText>
  </MiSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MiSelect, MiOption, MiSpace, MiText } from '@/materin-ui/index'

const value = ref('')
</script>
