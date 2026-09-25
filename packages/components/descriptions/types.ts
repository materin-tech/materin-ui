export interface DescriptionsItem {
  label: string
  value: string
}

export interface DescriptionsProps {
  title?: string
  items?: DescriptionsItem[]
  direction?: 'horizontal' | 'vertical'
  border?: boolean
}
