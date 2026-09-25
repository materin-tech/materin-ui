export interface TimelineProps {
  items?: unknown[]
}

export interface TimelineItemProps {
  timestamp?: string
  color?: 'primary' | 'success' | 'warning' | 'error' | 'muted'
}
