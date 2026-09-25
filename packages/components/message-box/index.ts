import { createApp, type App } from 'vue'
import MessageBoxHost from './MessageBox.vue'

export interface MessageBoxOptions {
  title?: string
  message?: string
  type?: 'confirm' | 'alert'
  showInput?: boolean
  placeholder?: string
  confirmButtonText?: string
  cancelButtonText?: string
}

export interface MessageBoxService {
  (options?: MessageBoxOptions): Promise<boolean>
  confirm: (options?: MessageBoxOptions) => Promise<boolean>
  alert: (options?: MessageBoxOptions) => Promise<boolean>
  /** 输入型弹窗：确认时返回输入值，取消返回 null */
  prompt: (options?: MessageBoxOptions) => Promise<string | null>
}

let hostApp: App | null = null
let host: { open: (options: MessageBoxOptions) => Promise<boolean> } | null = null

const ensureHost = () => {
  if (typeof document === 'undefined') return null
  if (!hostApp) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    hostApp = createApp(MessageBoxHost)
    host = hostApp.mount(container) as unknown as { open: (options: MessageBoxOptions) => Promise<boolean> }
  }
  return host
}

const MiMessageBox = ((options: MessageBoxOptions = {}) => {
  const hostInstance = ensureHost()
  if (!hostInstance) return Promise.resolve(false)
  return hostInstance.open(options)
}) as MessageBoxService

MiMessageBox.confirm = (options) => MiMessageBox({ type: 'confirm', ...options })
MiMessageBox.alert = (options) => MiMessageBox({ type: 'alert', ...options })
MiMessageBox.prompt = async (options) => {
  const ok = await MiMessageBox({ type: 'confirm', showInput: true, ...options })
  if (!ok) return null
  const container = document.body.querySelector('.materin-ui-dialog input') as HTMLInputElement | null
  return container?.value ?? null
}

export { MiMessageBox }
export default MiMessageBox
