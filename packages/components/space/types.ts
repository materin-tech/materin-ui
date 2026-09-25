export interface SpaceProps {
  direction?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg' | number
  wrap?: boolean
  fill?: boolean
  align?: 'start' | 'center' | 'end' | 'baseline'
  tag?: string
}
