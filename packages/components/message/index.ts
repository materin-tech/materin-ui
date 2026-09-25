import { createApp, type App } from 'vue'
import MiMessageHost from './MessageHost.vue'
import {
  clearMessages,
  pushMessage,
  removeMessage,
  type MessageHandle,
  type MessageOptions,
  type MessageType
} from './store'

export type { MessageHandle, MessageOptions, MessageRecord, MessageType } from './store'

let hostApp: App | null = null
let seed = 0

const ensureHost = (): boolean => {
  if (typeof document === 'undefined') return false
  if (hostApp) return true
  const container = document.createElement('div')
  document.body.appendChild(container)
  hostApp = createApp(MiMessageHost)
  hostApp.mount(container)
  return true
}

const notify = (message: string, type: MessageType, options: MessageOptions = {}): MessageHandle => {
  if (!ensureHost()) return { close: () => undefined }
  const id = ++seed
  pushMessage({
    id,
    message,
    type,
    duration: options.duration ?? 3000,
    showClose: options.showClose ?? false,
    onClose: options.onClose
  })
  return { close: () => removeMessage(id) }
}

export interface MessageService {
  (message: string, options?: MessageOptions): MessageHandle
  success: (message: string, options?: MessageOptions) => MessageHandle
  warning: (message: string, options?: MessageOptions) => MessageHandle
  error: (message: string, options?: MessageOptions) => MessageHandle
  info: (message: string, options?: MessageOptions) => MessageHandle
  closeAll: () => void
}

const MiMessage = ((message: string, options: MessageOptions = {}) =>
  notify(message, options.type ?? 'info', options)) as MessageService

MiMessage.success = (message, options) => notify(message, 'success', options)
MiMessage.warning = (message, options) => notify(message, 'warning', options)
MiMessage.error = (message, options) => notify(message, 'error', options)
MiMessage.info = (message, options) => notify(message, 'info', options)
MiMessage.closeAll = () => clearMessages()

export { MiMessage }
export default MiMessage
