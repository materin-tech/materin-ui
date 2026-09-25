export type ButtonType = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonNativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  /** 按钮类型 */
  type?: ButtonType
  /** 按钮尺寸 */
  size?: ButtonSize
  /** 是否块级 */
  block?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 原生 button 类型 */
  nativeType?: ButtonNativeType
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}

export interface ButtonSlots {
  default?: () => any
  icon?: () => any
}