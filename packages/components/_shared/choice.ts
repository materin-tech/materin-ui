import type { InjectionKey, Ref } from 'vue'

export type ChoiceValue = string | number | boolean

export interface CheckboxGroupContext {
  value: Ref<ChoiceValue[]>
  disabled: boolean
  size: 'sm' | 'md' | 'lg'
  toggle: (value: ChoiceValue) => void
  notifyChange: () => void
}

export interface RadioGroupContext {
  value: Ref<ChoiceValue | undefined>
  disabled: boolean
  size: 'sm' | 'md' | 'lg'
  select: (value: ChoiceValue) => void
  notifyChange: () => void
}

export const CHECKBOX_GROUP_KEY: InjectionKey<CheckboxGroupContext> = Symbol('materin-ui-checkbox-group')
export const RADIO_GROUP_KEY: InjectionKey<RadioGroupContext> = Symbol('materin-ui-radio-group')

/* ---------- Select 上下文 ---------- */

export interface SelectOption {
  value: ChoiceValue
  label: string
  disabled?: boolean
}

export interface SelectContext {
  isSelected: (value: ChoiceValue) => boolean
  select: (value: ChoiceValue) => void
  register: (option: SelectOption & { id: string }) => void
  unregister: (id: string) => void
  isActive: (id: string) => boolean
  setActive: (id: string) => void
  size: 'sm' | 'md' | 'lg'
  multiple: boolean
}

export const SELECT_KEY: InjectionKey<SelectContext> = Symbol('materin-ui-select')
