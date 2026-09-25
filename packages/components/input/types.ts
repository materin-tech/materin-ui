export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps {
  modelValue?: string | number
  type?: InputType
  size?: InputSize
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  clearable?: boolean
  maxlength?: number
  label?: string
  hint?: string
  error?: string
}

export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

export interface InputSlots {
  prefix?: () => any
  suffix?: () => any
}