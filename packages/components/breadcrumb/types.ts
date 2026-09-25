export interface Crumb {
  label: string
  to?: string
}

export interface BreadcrumbProps {
  crumbs?: Crumb[]
}
