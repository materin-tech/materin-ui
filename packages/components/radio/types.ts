import type { ChoiceValue } from '../_shared/choice'

export interface RadioProps {
  modelValue?: ChoiceValue
  value?: ChoiceValue
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}
