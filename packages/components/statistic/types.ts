export interface StatisticProps {
  title?: string
  value?: number | string
  grouped?: boolean
  precision?: number
  prefix?: string
  suffix?: string
  status?: 'default' | 'success' | 'error'
}
