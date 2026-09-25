export type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeProps {
  value?: string | number
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: BadgeType
  standalone?: boolean
}
