export interface TableColumn {
  key: string
  title: string
  width?: number
}

export interface TableProps {
  columns?: TableColumn[]
  rows?: Record<string, unknown>[]
  striped?: boolean
  bordered?: boolean
  emptyText?: string
}
