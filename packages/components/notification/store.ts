import { ref } from 'vue'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export interface NotificationOptions {
  type?: NotificationType
  title?: string
  message?: string
  position?: NotificationPosition
  duration?: number
  showClose?: boolean
  onClick?: () => void
  onClose?: () => void
}

export interface NotificationRecord {
  id: number
  title: string
  message: string
  type: NotificationType
  position: NotificationPosition
  duration: number
  showClose: boolean
  onClick?: () => void
  onClose?: () => void
}

export interface NotificationHandle {
  close: () => void
}

export const notifications = ref<NotificationRecord[]>([])

export const pushNotification = (record: NotificationRecord) => {
  notifications.value = [...notifications.value, record]
}

export const removeNotification = (id: number) => {
  notifications.value = notifications.value.filter((item) => item.id !== id)
}

export const clearNotifications = () => {
  notifications.value = []
}
