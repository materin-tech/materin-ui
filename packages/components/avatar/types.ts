export type AvatarSize = 'sm' | 'md' | 'lg' | number

export interface AvatarProps {
  src?: string
  alt?: string
  size?: AvatarSize
  shape?: 'circle' | 'square'
  name?: string
}
