export type TitleType = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'

export interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  type?: TitleType
}
