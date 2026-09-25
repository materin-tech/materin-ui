export interface TransferItem {
  key: string | number
  label: string
}

export interface TransferProps {
  items?: TransferItem[]
  modelValue?: (string | number)[]
  sourceTitle?: string
  targetTitle?: string
}
