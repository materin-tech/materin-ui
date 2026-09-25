export type LinkType = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'

export interface LinkProps {
  type?: LinkType
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  underline?: boolean
  disabled?: boolean
}
