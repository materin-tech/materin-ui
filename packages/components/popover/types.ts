import type { PopperPlacement } from '../_shared/popper'

export interface PopoverProps {
  modelValue?: boolean
  trigger?: 'click' | 'hover' | 'focus'
  title?: string
  placement?: PopperPlacement
  width?: number | string
  disabled?: boolean
}
