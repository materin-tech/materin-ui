import type { FormRule } from '../_shared/form'

export interface FormProps {
  model: Record<string, unknown>
  rules?: Record<string, FormRule[]>
  labelWidth?: string | number
  labelPosition?: 'left' | 'right' | 'top'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  inline?: boolean
  showMessage?: boolean
  hideRequiredAsterisk?: boolean
}

export type { FormRule }
