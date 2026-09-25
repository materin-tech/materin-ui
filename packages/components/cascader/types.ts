export interface CascaderOption {
  label: string
  value: string | number
  children?: CascaderOption[]
}

export interface CascaderProps {
  options?: CascaderOption[]
  modelValue?: (string | number)[]
  placeholder?: string
}
