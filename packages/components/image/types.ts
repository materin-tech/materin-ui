export interface ImageProps {
  src: string
  alt?: string
  width?: number | string
  height?: number | string
  fit?: 'cover' | 'contain' | 'fill' | 'none'
  rounded?: boolean
  lazy?: boolean
  fallbackText?: string
}
