<template>
  <div>
    <MiButton @click="visible = true">打开对话框</MiButton>
    <MiDialog v-model="visible" title="确认操作">
      <p style="margin: 0">打开时会锁滚动，ESC 或点遮罩关闭。</p>
      <template #footer>
        <MiButton size="sm" variant="ghost" @click="visible = false">取消</MiButton>
        <MiButton size="sm" @click="visible = false">确定</MiButton>
      </template>
    </MiDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MiButton, MiDialog } from '@/materin-ui/index'

const visible = ref(false)
</script>
