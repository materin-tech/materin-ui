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

import type { App, Component } from 'vue'

declare const __MI_VERSION__: string

import MiAlert from '../components/alert'
import MiAside from '../components/aside'
import MiAvatar from '../components/avatar'
import MiBadge from '../components/badge'
import MiButton from '../components/button'
import MiCard from '../components/card'
import MiCheckbox from '../components/checkbox'
import MiCheckboxGroup from '../components/checkbox-group'
import MiCol from '../components/col'
import MiCollapse from '../components/collapse'
import MiCollapseItem from '../components/collapse-item'
import MiContainer from '../components/container'
import MiDescriptions from '../components/descriptions'
import MiDialog from '../components/dialog'
import MiDivider from '../components/divider'
import MiDrawer from '../components/drawer'
import MiEmpty from '../components/empty'
import MiFooter from '../components/footer'
import MiForm from '../components/form'
import MiFormItem from '../components/form-item'
import MiHeader from '../components/header'
import MiImage from '../components/image'
import MiInput from '../components/input'
import MiInputNumber from '../components/input-number'
import MiLink from '../components/link'
import MiLoading from '../components/loading'
import MiMain from '../components/main'
import MiMessage from '../components/message'
import MiMessageItem from '../components/message-item'
import MiNotification from '../components/notification'
import MiNotificationItem from '../components/notification-item'
import MiOption from '../components/option'
import MiOptionGroup from '../components/option-group'
import MiPagination from '../components/pagination'
import MiPopconfirm from '../components/popconfirm'
import MiPopover from '../components/popover'
import MiProgress from '../components/progress'
import MiRadio from '../components/radio'
import MiRadioGroup from '../components/radio-group'
import MiRate from '../components/rate'
import MiResult from '../components/result'
import MiRow from '../components/row'
import MiSegmented from '../components/segmented'
import MiSelect from '../components/select'
import MiSkeleton from '../components/skeleton'
import MiSkeletonItem from '../components/skeleton-item'
import MiSlider from '../components/slider'
import MiSpace from '../components/space'
import MiStatistic from '../components/statistic'
import MiSwitch from '../components/switch'
import MiTag from '../components/tag'
import MiText from '../components/text'
import MiTimeline from '../components/timeline'
import MiTimelineItem from '../components/timeline-item'
import MiTitle from '../components/title'
import MiTooltip from '../components/tooltip'
import MiTour from '../components/tour'

const components = [MiAlert, MiAside, MiAvatar, MiBadge, MiButton, MiCard, MiCheckbox, MiCheckboxGroup, MiCol, MiCollapse, MiCollapseItem, MiContainer, MiDescriptions, MiDialog, MiDivider, MiDrawer, MiEmpty, MiFooter, MiForm, MiFormItem, MiHeader, MiImage, MiInput, MiInputNumber, MiLink, MiLoading, MiMain, MiMessage, MiMessageItem, MiNotification, MiNotificationItem, MiOption, MiOptionGroup, MiPagination, MiPopconfirm, MiPopover, MiProgress, MiRadio, MiRadioGroup, MiRate, MiResult, MiRow, MiSegmented, MiSelect, MiSkeleton, MiSkeletonItem, MiSlider, MiSpace, MiStatistic, MiSwitch, MiTag, MiText, MiTimeline, MiTimelineItem, MiTitle, MiTooltip, MiTour]

const install = (app: App): void => {
  components.forEach((component) => {
    // 命令式服务（如 MiMessage / MiNotification）是函数，不是组件，不注册
    if (typeof component === 'function') return
    const named = component as unknown as { name?: string; __name?: string }
    app.component(named.name || named.__name || 'MiComponent', component as unknown as Component)
  })
}

export {MiAlert, MiAside, MiAvatar, MiBadge, MiButton, MiCard, MiCheckbox, MiCheckboxGroup, MiCol, MiCollapse, MiCollapseItem, MiContainer, MiDescriptions, MiDialog, MiDivider, MiDrawer, MiEmpty, MiFooter, MiForm, MiFormItem, MiHeader, MiImage, MiInput, MiInputNumber, MiLink, MiLoading, MiMain, MiMessage, MiMessageItem, MiNotification, MiNotificationItem, MiOption, MiOptionGroup, MiPagination, MiPopconfirm, MiPopover, MiProgress, MiRadio, MiRadioGroup, MiRate, MiResult, MiRow, MiSegmented, MiSelect, MiSkeleton, MiSkeletonItem, MiSlider, MiSpace, MiStatistic, MiSwitch, MiTag, MiText, MiTimeline, MiTimelineItem, MiTitle, MiTooltip, MiTour}

export default {
  install,
  version: typeof __MI_VERSION__ === 'string' ? __MI_VERSION__ : '0.0.0-dev'
}

export type { AlertProps, AlertType } from '../components/alert/types'
export type { AsideProps } from '../components/aside/types'
export type { AvatarProps, AvatarSize } from '../components/avatar/types'
export type { BadgeProps, BadgeType } from '../components/badge/types'
export type { ButtonProps, ButtonEmits } from '../components/button/types'
export type { CardProps } from '../components/card/types'
export type { CheckboxProps } from '../components/checkbox/types'
export type { CheckboxGroupProps } from '../components/checkbox-group/types'
export type { ColProps, ColSize } from '../components/col/types'
export type { CollapseProps, CollapseItemProps, CollapseContext } from '../components/collapse/types'
export type { ContainerProps } from '../components/container/types'
export type { DescriptionsProps, DescriptionsItem } from '../components/descriptions/types'
export type { DialogProps } from '../components/dialog/types'
export type { DividerProps } from '../components/divider/types'
export type { DrawerProps } from '../components/drawer/types'
export type { EmptyProps } from '../components/empty/types'
export type { FooterProps } from '../components/footer/types'
export type { FormProps, FormRule } from '../components/form/types'
export type { FormItemProps } from '../components/form-item/types'
export type { HeaderProps } from '../components/header/types'
export type { ImageProps } from '../components/image/types'
export type { InputProps, InputEmits } from '../components/input/types'
export type { InputNumberProps } from '../components/input-number/types'
export type { LinkProps, LinkType } from '../components/link/types'
export type { LoadingProps } from '../components/loading/types'
export type { MainProps } from '../components/main/types'
export type { MessageHandle, MessageOptions, MessageRecord, MessageType } from '../components/message/types'
export type { OptionProps } from '../components/option/types'
export type { OptionGroupProps } from '../components/option-group/types'
export type { PaginationProps } from '../components/pagination/types'
export type { PopconfirmProps } from '../components/popconfirm/types'
export type { PopoverProps } from '../components/popover/types'
export type { ProgressProps } from '../components/progress/types'
export type { RadioProps } from '../components/radio/types'
export type { RadioGroupProps } from '../components/radio-group/types'
export type { RateProps } from '../components/rate/types'
export type { ResultProps } from '../components/result/types'
export type { RowProps } from '../components/row/types'
export type { SegmentedProps, SegmentedOption } from '../components/segmented/types'
export type { SelectProps } from '../components/select/types'
export type { SkeletonProps } from '../components/skeleton/types'
export type { SkeletonItemProps, SkeletonVariant } from '../components/skeleton-item/types'
export type { SliderProps } from '../components/slider/types'
export type { SpaceProps } from '../components/space/types'
export type { StatisticProps } from '../components/statistic/types'
export type { SwitchProps } from '../components/switch/types'
export type { TagProps, TagEmits } from '../components/tag/types'
export type { TextProps, TextType, TextSize } from '../components/text/types'
export type { TimelineProps, TimelineItemProps } from '../components/timeline/types'
export type { TitleProps, TitleType } from '../components/title/types'
export type { TooltipProps } from '../components/tooltip/types'
export type { TourProps, TourStep } from '../components/tour/types'
