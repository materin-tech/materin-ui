import type { TreeNode } from '../tree/types'

export interface TreeSelectProps {
  nodes?: TreeNode[]
  modelValue?: string | number | (string | number)[]
  multiple?: boolean
  placeholder?: string
}
