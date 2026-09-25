import type { FormRule } from '../_shared/form'

export interface FormItemProps {
  prop?: string
  label?: string
  labelWidth?: string | number
  required?: boolean
  rules?: FormRule[]
  error?: string
  hint?: string
  showMessage?: boolean
}
