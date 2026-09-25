export type TagType = 'primary' | 'secondary' | 'ok' | 'warn' | 'error' | 'neutral'
export type TagSize = 'sm' | 'md' | 'lg'

export interface TagProps {
  type?: TagType
  size?: TagSize
  closable?: boolean
  disabled?: boolean
}

export interface TagEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'close', event: MouseEvent): void
}

export interface TagSlots {
  default?: () => any
  icon?: () => any
}