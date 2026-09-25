import { createApp, type App } from 'vue'
import MiNotificationHost from './NotificationHost.vue'
import {
  clearNotifications,
  pushNotification,
  removeNotification,
  type NotificationHandle,
  type NotificationOptions,
  type NotificationType
} from './store'

export type {
  NotificationHandle,
  NotificationOptions,
  NotificationPosition,
  NotificationRecord,
  NotificationType
} from './store'

let hostApp: App | null = null
let seed = 0

const ensureHost = (): boolean => {
  if (typeof document === 'undefined') return false
  if (hostApp) return true
  const container = document.createElement('div')
  document.body.appendChild(container)
  hostApp = createApp(MiNotificationHost)
  hostApp.mount(container)
  return true
}

const notify = (options: NotificationOptions, type: NotificationType): NotificationHandle => {
  if (!ensureHost()) return { close: () => undefined }
  const id = ++seed
  pushNotification({
    id,
    title: options.title ?? '',
    message: options.message ?? '',
    type,
    position: options.position ?? 'top-right',
    duration: options.duration ?? 4500,
    showClose: options.showClose ?? true,
    onClick: options.onClick,
    onClose: options.onClose
  })
  return { close: () => removeNotification(id) }
}

export interface NotificationService {
  (options: NotificationOptions): NotificationHandle
  success: (options: NotificationOptions) => NotificationHandle
  warning: (options: NotificationOptions) => NotificationHandle
  error: (options: NotificationOptions) => NotificationHandle
  info: (options: NotificationOptions) => NotificationHandle
  closeAll: () => void
}

const MiNotification = ((options: NotificationOptions) =>
  notify(options, options.type ?? 'info')) as NotificationService

MiNotification.success = (options) => notify(options, 'success')
MiNotification.warning = (options) => notify(options, 'warning')
MiNotification.error = (options) => notify(options, 'error')
MiNotification.info = (options) => notify(options, 'info')
MiNotification.closeAll = () => clearNotifications()

export { MiNotification }
export default MiNotification
