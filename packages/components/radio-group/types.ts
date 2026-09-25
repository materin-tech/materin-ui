import type { ChoiceValue } from '../_shared/choice'

export interface RadioGroupProps {
  modelValue?: ChoiceValue
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  direction?: 'horizontal' | 'vertical'
}
