export interface ColSize {
  span?: number
  offset?: number
}

export interface ColProps {
  span?: number
  offset?: number
  order?: number
  xs?: number | ColSize
  sm?: number | ColSize
  md?: number | ColSize
  lg?: number | ColSize
  xl?: number | ColSize
  tag?: string
}
