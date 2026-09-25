export interface DrawerProps {
  modelValue?: boolean
  title?: string
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
  size?: number | string
  showClose?: boolean
  withHeader?: boolean
  modal?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  lockScroll?: boolean
  appendToBody?: boolean
  glass?: boolean
}
