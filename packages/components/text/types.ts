export type TextType = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
export type TextSize = 'sm' | 'md' | 'lg'

export interface TextProps {
  type?: TextType
  size?: TextSize
  strong?: boolean
  italic?: boolean
  truncated?: boolean
  lineClamp?: number
  tag?: string
}
