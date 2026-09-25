export type SkeletonVariant =
  | 'text'
  | 'caption'
  | 'h1'
  | 'h3'
  | 'h5'
  | 'paragraph'
  | 'button'
  | 'image'
  | 'circle'
  | 'rect'

export interface SkeletonItemProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
}
