import { ref } from 'vue'

export type MessageType = 'info' | 'success' | 'warning' | 'error'

export interface MessageOptions {
  type?: MessageType
  /** 毫秒；0 表示不自动关闭 */
  duration?: number
  showClose?: boolean
  onClose?: () => void
}

export interface MessageRecord {
  id: number
  message: string
  type: MessageType
  duration: number
  showClose: boolean
  onClose?: () => void
}

export interface MessageHandle {
  close: () => void
}

export const messages = ref<MessageRecord[]>([])

export const pushMessage = (record: MessageRecord) => {
  messages.value = [...messages.value, record]
}

export const removeMessage = (id: number) => {
  messages.value = messages.value.filter((item) => item.id !== id)
}

export const clearMessages = () => {
  messages.value = []
}
