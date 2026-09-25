export interface DropdownOption {
  label: string
  value?: string | number
  disabled?: boolean
  danger?: boolean
}

export interface DropdownProps {
  title?: string
  options?: DropdownOption[]
  placement?: 'top' | 'bottom'
}
