export interface QRCodeProps {
  value: string
  typeNumber?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  errorLevel?: 'L' | 'M' | 'Q' | 'H'
  size?: number
  color?: string
  bordered?: boolean
}
