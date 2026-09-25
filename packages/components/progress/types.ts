export interface ProgressProps {
  percent?: number
  type?: 'line' | 'ring'
  status?: 'primary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  indeterminate?: boolean
  ringSize?: number
}
