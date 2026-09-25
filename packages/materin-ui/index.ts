/**
 * materin-ui 库主入口
 *
 * 使用：
 *   import { createApp } from 'vue'
 *   import MaterinUI from '@materin-tech/materin-ui'
 *   import '@materin-tech/materin-ui/styles'   // 组件样式
 *   import '@materin-tech/materin-ui/tokens'   // Materin UI 令牌表
 *   createApp(App).use(MaterinUI).mount('#app')
 *
 * 命名契约：materin-<scope>-<component>[__part][--variant]
 * scope: ui (共享件) | site | docs | office | view | ctx
 *
 * 本文件由 tools/gen-index.py 生成（新增组件后重跑），不要手改 import 列表。
 */

import type { App } from 'vue'

declare const __MI_VERSION__: string

import MiAside from '../components/aside'
import MiAvatar from '../components/avatar'
import MiBadge from '../components/badge'
import MiButton from '../components/button'
import MiCard from '../components/card'
import MiCol from '../components/col'
import MiContainer from '../components/container'
import MiDivider from '../components/divider'
import MiEmpty from '../components/empty'
import MiFooter from '../components/footer'
import MiHeader from '../components/header'
import MiInput from '../components/input'
import MiLink from '../components/link'
import MiMain from '../components/main'
import MiRow from '../components/row'
import MiSkeleton from '../components/skeleton'
import MiSkeletonItem from '../components/skeleton-item'
import MiSpace from '../components/space'
import MiTag from '../components/tag'
import MiText from '../components/text'
import MiTitle from '../components/title'

const components = [MiAside, MiAvatar, MiBadge, MiButton, MiCard, MiCol, MiContainer, MiDivider, MiEmpty, MiFooter, MiHeader, MiInput, MiLink, MiMain, MiRow, MiSkeleton, MiSkeletonItem, MiSpace, MiTag, MiText, MiTitle]

const install = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name || component.__name || 'MiComponent', component)
  })
}

export {MiAside, MiAvatar, MiBadge, MiButton, MiCard, MiCol, MiContainer, MiDivider, MiEmpty, MiFooter, MiHeader, MiInput, MiLink, MiMain, MiRow, MiSkeleton, MiSkeletonItem, MiSpace, MiTag, MiText, MiTitle}

export default {
  install,
  version: typeof __MI_VERSION__ === 'string' ? __MI_VERSION__ : '0.0.0-dev'
}

export type { AsideProps } from '../components/aside/types'
export type { AvatarProps, AvatarSize } from '../components/avatar/types'
export type { BadgeProps, BadgeType } from '../components/badge/types'
export type { ButtonProps, ButtonEmits } from '../components/button/types'
export type { CardProps } from '../components/card/types'
export type { ColProps, ColSize } from '../components/col/types'
export type { ContainerProps } from '../components/container/types'
export type { DividerProps } from '../components/divider/types'
export type { EmptyProps } from '../components/empty/types'
export type { FooterProps } from '../components/footer/types'
export type { HeaderProps } from '../components/header/types'
export type { InputProps, InputEmits } from '../components/input/types'
export type { LinkProps, LinkType } from '../components/link/types'
export type { MainProps } from '../components/main/types'
export type { RowProps } from '../components/row/types'
export type { SkeletonProps } from '../components/skeleton/types'
export type { SkeletonItemProps, SkeletonVariant } from '../components/skeleton-item/types'
export type { SpaceProps } from '../components/space/types'
export type { TagProps, TagEmits } from '../components/tag/types'
export type { TextProps, TextType, TextSize } from '../components/text/types'
export type { TitleProps, TitleType } from '../components/title/types'
