export interface TreeNode {
  label: string
  key?: string | number
  children?: TreeNode[]
}

export interface TreeProps {
  nodes?: TreeNode[]
  checkable?: boolean
  /** 受控：勾选的 key 集合 */
  modelValue?: (string | number)[]
  defaultExpandedKeys?: (string | number)[]
}
