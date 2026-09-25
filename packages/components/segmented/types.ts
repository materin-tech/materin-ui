export interface SegmentedOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface SegmentedProps {
  options?: SegmentedOption[]
  modelValue?: string | number
  size?: 'sm' | 'md'
  block?: boolean
}
