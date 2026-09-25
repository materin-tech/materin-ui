export type CardVariant = 'default' | 'glass' | 'hero'
export type CardShadow = 'none' | 'elev-1' | 'elev-2'

export interface CardProps {
  variant?: CardVariant
  shadow?: CardShadow
  hoverable?: boolean
  bordered?: boolean
  title?: string
  subtitle?: string
  cover?: string
  alt?: string
  width?: string | number
}

export interface CardSlots {
  default?: () => any
  header?: () => any
  footer?: () => any
  cover?: () => any
}