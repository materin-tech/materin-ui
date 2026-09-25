import type { PopperPlacement } from '../_shared/popper'

export interface PopconfirmProps {
  title?: string
  confirmText?: string
  cancelText?: string
  placement?: PopperPlacement
  type?: 'primary' | 'danger'
  disabled?: boolean
}
