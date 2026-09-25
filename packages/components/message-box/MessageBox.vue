<template>
  <MiDialog :model-value="visible" :title="title" :width="380" :close-on-click-modal="false" @update:model-value="onVisible">
    <MiSpace direction="vertical" :size="10">
      <MiText v-if="message">{{ message }}</MiText>
      <MiInput v-if="showInput" v-model="inputValue" :placeholder="placeholder" />
    </MiSpace>
    <template #footer>
      <MiButton size="sm" variant="ghost" @click="resolve(false)">{{ cancelButtonText }}</MiButton>
      <MiButton size="sm" :type="type === 'confirm' ? 'primary' : 'danger'" @click="resolve(true)">{{ confirmButtonText }}</MiButton>
    </template>
  </MiDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MiButton from '../button/Button.vue'
import MiDialog from '../dialog/Dialog.vue'
import MiInput from '../input/Input.vue'
import MiSpace from '../space/Space.vue'
import MiText from '../text/Text.vue'

defineOptions({ name: 'MiMessageBoxHost' })

const visible = ref(false)
const title = ref('')
const message = ref('')
const type = ref<'confirm' | 'alert'>('confirm')
const showInput = ref(false)
const placeholder = ref('')
const inputValue = ref('')
const confirmButtonText = ref('确定')
const cancelButtonText = ref('取消')
let pending: ((value: boolean) => void) | null = null

const open = (options: {
  title?: string
  message?: string
  type?: 'confirm' | 'alert'
  showInput?: boolean
  placeholder?: string
  confirmButtonText?: string
  cancelButtonText?: string
}) => {
  title.value = options.title ?? ''
  message.value = options.message ?? ''
  type.value = options.type ?? 'confirm'
  showInput.value = options.showInput ?? false
  placeholder.value = options.placeholder ?? ''
  inputValue.value = ''
  confirmButtonText.value = options.confirmButtonText ?? '确定'
  cancelButtonText.value = options.cancelButtonText ?? '取消'
  visible.value = true
  return new Promise<boolean>((resolvePromise) => {
    pending = resolvePromise
  })
}

const resolve = (value: boolean) => {
  visible.value = false
  pending?.(showInput.value ? value && inputValue.value !== '' : value)
  pending = null
}

const onVisible = (value: boolean) => {
  if (!value) resolve(false)
}

defineExpose({ open })
</script>
