export interface TourStep {
  /** CSS 选择器，指向要高亮的元素 */
  target: string
  title: string
  description?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export interface TourProps {
  modelValue?: number
  steps?: TourStep[]
  showClose?: boolean
  gap?: number
  prevText?: string
  nextText?: string
  finishText?: string
  scrollToTarget?: boolean
}
