import type { PopperPlacement } from '../_shared/popper'

export interface TooltipProps {
  content?: string
  placement?: PopperPlacement
  disabled?: boolean
  showAfter?: number
  hideAfter?: number
}
