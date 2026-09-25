export interface SwitchProps {
  modelValue?: boolean | string | number
  activeValue?: boolean | string | number
  inactiveValue?: boolean | string | number
  activeText?: string
  inactiveText?: string
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
}
