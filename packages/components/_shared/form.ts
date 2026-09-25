import type { InjectionKey, Ref } from 'vue'

export type FormTrigger = 'blur' | 'change'

export interface FormRule {
  required?: boolean
  message?: string
  /** 字符串长度 / 数字大小 / 数组长度 */
  min?: number
  max?: number
  len?: number
  type?: 'string' | 'number' | 'email' | 'url' | 'array'
  pattern?: RegExp
  /** 自定义校验：返回 true 通过；返回字符串即错误信息；也可返回 Promise */
  validator?: (
    value: unknown,
    model: Record<string, unknown>
  ) => boolean | string | Promise<boolean | string>
  trigger?: FormTrigger | FormTrigger[]
}

export interface FormContext {
  model: Record<string, unknown>
  rules: Record<string, FormRule[]>
  labelWidth: string
  labelPosition: 'left' | 'right' | 'top'
  size: 'sm' | 'md' | 'lg'
  disabled: boolean
  showMessage: boolean
  hideRequiredAsterisk: boolean
  addField: (field: FormField) => void
  removeField: (field: FormField) => void
}

export interface FormField {
  prop: string
  validate: (trigger?: FormTrigger) => Promise<boolean>
  clearValidate: () => void
  resetField: () => void
}

export const FORM_KEY: InjectionKey<FormContext> = Symbol('materin-ui-form')

export interface FormItemContext {
  inputId: string
  describedby: string
  isError: boolean
  disabled: boolean
  size: 'sm' | 'md' | 'lg'
  /** 让子控件把变化报给表单项，触发 change 校验 */
  notifyChange: () => void
  notifyBlur: () => void
}

export const FORM_ITEM_KEY: InjectionKey<FormItemContext> = Symbol('materin-ui-form-item')

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL = /^(https?:\/\/)[^\s]+$/

function isEmpty(value: unknown): boolean {
  if (value === undefined || value === null || value === '') return true
  if (Array.isArray(value)) return value.length === 0
  return false
}

/**
 * 跑一组规则，返回第一条错误信息（无错返回 null）。
 * 刻意保持简单：够用、可预测，且不引第三方校验库。
 */
export async function runRules(
  value: unknown,
  rules: FormRule[] | undefined,
  model: Record<string, unknown>,
  trigger?: FormTrigger
): Promise<string | null> {
  if (!rules || rules.length === 0) return null

  for (const rule of rules) {
    if (trigger) {
      const triggers = rule.trigger === undefined ? ['blur', 'change'] : [rule.trigger].flat()
      if (!triggers.includes(trigger)) continue
    }

    const label = rule.message || '校验未通过'

    if (rule.required && isEmpty(value)) {
      return rule.message || '此项为必填'
    }

    const empty = isEmpty(value)
    if (empty) continue // 非必填且为空，其余规则不适用

    if (rule.type) {
      if (rule.type === 'number' && typeof value !== 'number' && Number.isNaN(Number(value))) {
        return rule.message || '必须是数字'
      }
      if (rule.type === 'array' && !Array.isArray(value)) {
        return rule.message || '必须是数组'
      }
      if (rule.type === 'string' && typeof value !== 'string') {
        return rule.message || '必须是文本'
      }
      if (rule.type === 'email' && !EMAIL.test(String(value))) {
        return rule.message || '邮箱格式不正确'
      }
      if (rule.type === 'url' && !URL.test(String(value))) {
        return rule.message || '链接格式不正确'
      }
    }

    if (rule.pattern && !rule.pattern.test(String(value))) {
      return label
    }

    if (rule.len !== undefined) {
      const size = Array.isArray(value) ? value.length : String(value).length
      if (size !== rule.len) return label
    }

    if (rule.min !== undefined) {
      const size = Array.isArray(value) ? value.length : typeof value === 'number' ? value : String(value).length
      if (size < rule.min) return label
    }

    if (rule.max !== undefined) {
      const size = Array.isArray(value) ? value.length : typeof value === 'number' ? value : String(value).length
      if (size > rule.max) return label
    }

    if (rule.validator) {
      const result = await rule.validator(value, model)
      if (result !== true) {
        return typeof result === 'string' ? result : label
      }
    }
  }

  return null
}

export function toLabelWidth(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

export function useFieldId(): string {
  return `materin-ui-field-${Math.random().toString(36).slice(2, 9)}`
}
