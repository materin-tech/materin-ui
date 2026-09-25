import type { ChoiceValue } from '../_shared/choice'

export interface CheckboxProps {
  modelValue?: boolean
  value?: ChoiceValue
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}
