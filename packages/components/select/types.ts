import type { ChoiceValue } from '../_shared/choice'

export interface SelectProps {
  modelValue?: ChoiceValue | ChoiceValue[] | null
  multiple?: boolean
  placeholder?: string
  emptyText?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}
