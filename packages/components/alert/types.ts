export type AlertType = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps {
  type?: AlertType
  title?: string
  description?: string
  closable?: boolean
  showIcon?: boolean
  center?: boolean
  glass?: boolean
}
