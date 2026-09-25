/** 由 tools/gen-docs-manifest.py 生成：组件分组 + API 表。不要手改。 */
export interface DocProp { name: string; required: boolean; type: string }
export interface DocComponent {
  kebab: string; zh: string; en: string; exports: string[]; klass: string;
  purpose: { zh: string; en: string }; parts: string[]; variants: string[]; states: string[];
  props: DocProp[]; hasDemo: boolean
}
export interface DocGroup { id: string; zh: string; en: string; components: DocComponent[] }

export const groups: DocGroup[] = [
  {
    "id": "basic",
    "zh": "基础",
    "en": "Basic",
    "components": [
      {
        "kebab": "divider",
        "zh": "分割线",
        "en": "Divider",
        "exports": [
          "MiDivider"
        ],
        "klass": "materin-ui-divider",
        "purpose": {
          "zh": "分割线：横竖、三种线型、文字位置",
          "en": "Divider: horizontal or vertical, three line styles, text position"
        },
        "parts": [
          "materin-ui-divider__text"
        ],
        "variants": [
          "--horizontal",
          "--vertical",
          "--solid",
          "--dashed",
          "--dotted",
          "--left",
          "--center",
          "--right"
        ],
        "states": [],
        "props": [
          {
            "name": "direction",
            "required": false,
            "type": "'horizontal' | 'vertical'"
          },
          {
            "name": "borderStyle",
            "required": false,
            "type": "'solid' | 'dashed' | 'dotted'"
          },
          {
            "name": "contentPosition",
            "required": false,
            "type": "'left' | 'center' | 'right'"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "card",
        "zh": "卡片",
        "en": "Card",
        "exports": [
          "MiCard"
        ],
        "klass": "materin-ui-card",
        "purpose": {
          "zh": "卡片：default / glass / hero 三种外观 × hoverable",
          "en": "Card: default, glass and hero variants, plus hoverable"
        },
        "parts": [
          "materin-ui-card__cover",
          "materin-ui-card__header",
          "materin-ui-card__title",
          "materin-ui-card__subtitle",
          "materin-ui-card__body",
          "materin-ui-card__footer"
        ],
        "variants": [
          "--glass",
          "--hero",
          "--hoverable"
        ],
        "states": [],
        "props": [
          {
            "name": "variant",
            "required": false,
            "type": "CardVariant"
          },
          {
            "name": "shadow",
            "required": false,
            "type": "CardShadow"
          },
          {
            "name": "hoverable",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "bordered",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "title",
            "required": false,
            "type": "string"
          },
          {
            "name": "subtitle",
            "required": false,
            "type": "string"
          },
          {
            "name": "cover",
            "required": false,
            "type": "string"
          },
          {
            "name": "alt",
            "required": false,
            "type": "string"
          },
          {
            "name": "width",
            "required": false,
            "type": "string | number"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "icon",
        "zh": "图标",
        "en": "Icon",
        "exports": [
          "MiIcon"
        ],
        "klass": "materin-ui-icon",
        "purpose": {
          "zh": "图标：内置一套线性小图标的统一入口",
          "en": "Icon: one entry for the built-in line icon set"
        },
        "parts": [],
        "variants": [
          "--sm",
          "--lg"
        ],
        "states": [],
        "props": [
          {
            "name": "name",
            "required": false,
            "type": "string"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg'"
          },
          {
            "name": "label",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "button",
        "zh": "按钮",
        "en": "Button",
        "exports": [
          "MiButton"
        ],
        "klass": "materin-ui-btn",
        "purpose": {
          "zh": "按钮：4 种类型 × 3 种尺寸 × loading/block",
          "en": "Button: 4 types x 3 sizes, plus loading and block"
        },
        "parts": [
          "materin-ui-btn__content",
          "materin-ui-btn__icon"
        ],
        "variants": [
          "--primary",
          "--secondary",
          "--ghost",
          "--danger",
          "--sm",
          "--lg",
          "--block",
          "--loading",
          "--disabled"
        ],
        "states": [
          "is-loading"
        ],
        "props": [
          {
            "name": "type",
            "required": false,
            "type": "ButtonType"
          },
          {
            "name": "size",
            "required": false,
            "type": "ButtonSize"
          },
          {
            "name": "block",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "loading",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "nativeType",
            "required": false,
            "type": "ButtonNativeType"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "button-group",
        "zh": "按钮组",
        "en": "Button group",
        "exports": [
          "MiButtonGroup"
        ],
        "klass": "materin-ui-button-group",
        "purpose": {
          "zh": "",
          "en": ""
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg'"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "text",
        "zh": "文本",
        "en": "Text",
        "exports": [
          "MiText"
        ],
        "klass": "materin-ui-text",
        "purpose": {
          "zh": "正文文本：语义色、三档字号、加粗斜体、单行/多行省略",
          "en": "Body text: semantic colours, three sizes, bold or italic, single- or multi-line truncation"
        },
        "parts": [],
        "variants": [
          "--default",
          "--primary",
          "--secondary",
          "--success",
          "--warning",
          "--danger",
          "--info",
          "--sm",
          "--md",
          "--lg",
          "--strong",
          "--italic",
          "--truncated",
          "--line-clamp"
        ],
        "states": [],
        "props": [
          {
            "name": "type",
            "required": false,
            "type": "TextType"
          },
          {
            "name": "size",
            "required": false,
            "type": "TextSize"
          },
          {
            "name": "strong",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "italic",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "truncated",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "lineClamp",
            "required": false,
            "type": "number"
          },
          {
            "name": "tag",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "tag",
        "zh": "标签",
        "en": "Tag",
        "exports": [
          "MiTag"
        ],
        "klass": "materin-ui-tag",
        "purpose": {
          "zh": "标签：6 种语义色 × 3 种尺寸 × closable",
          "en": "Tag: 6 semantic colours x 3 sizes, closable"
        },
        "parts": [
          "materin-ui-tag__icon",
          "materin-ui-tag__label",
          "materin-ui-tag__close"
        ],
        "variants": [
          "--primary",
          "--secondary",
          "--ok",
          "--warn",
          "--error",
          "--neutral",
          "--sm",
          "--lg",
          "--closable",
          "--disabled"
        ],
        "states": [],
        "props": [
          {
            "name": "type",
            "required": false,
            "type": "TagType"
          },
          {
            "name": "size",
            "required": false,
            "type": "TagSize"
          },
          {
            "name": "closable",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "title",
        "zh": "标题",
        "en": "Title",
        "exports": [
          "MiTitle"
        ],
        "klass": "materin-ui-title",
        "purpose": {
          "zh": "标题：1–6 级（字号 + 标签同步），可套语义色",
          "en": "Heading: levels 1–6 (size and tag together), with semantic colours"
        },
        "parts": [],
        "variants": [
          "--1",
          "--2",
          "--3",
          "--4",
          "--5",
          "--6",
          "--default",
          "--primary",
          "--secondary",
          "--success",
          "--warning",
          "--danger",
          "--info"
        ],
        "states": [],
        "props": [
          {
            "name": "level",
            "required": false,
            "type": "1 | 2 | 3 | 4 | 5 | 6"
          },
          {
            "name": "type",
            "required": false,
            "type": "TitleType"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "link",
        "zh": "链接",
        "en": "Link",
        "exports": [
          "MiLink"
        ],
        "klass": "materin-ui-link",
        "purpose": {
          "zh": "链接：七种语义色、可选下划线、禁用态、图标插槽",
          "en": "Link: seven semantic colours, optional underline, disabled state, icon slot"
        },
        "parts": [
          "materin-ui-link__icon",
          "materin-ui-link__content"
        ],
        "variants": [
          "--default",
          "--primary",
          "--secondary",
          "--success",
          "--warning",
          "--danger",
          "--info",
          "--underline",
          "--disabled"
        ],
        "states": [],
        "props": [
          {
            "name": "type",
            "required": false,
            "type": "LinkType"
          },
          {
            "name": "href",
            "required": false,
            "type": "string"
          },
          {
            "name": "target",
            "required": false,
            "type": "'_blank' | '_self' | '_parent' | '_top'"
          },
          {
            "name": "rel",
            "required": false,
            "type": "string"
          },
          {
            "name": "underline",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "space",
        "zh": "间距",
        "en": "Space",
        "exports": [
          "MiSpace"
        ],
        "klass": "materin-ui-space",
        "purpose": {
          "zh": "元素间距：横竖排列、自动换行、撑满",
          "en": "Spacing between elements: row or column, wrapping or full width"
        },
        "parts": [],
        "variants": [
          "--horizontal",
          "--vertical",
          "--wrap",
          "--fill"
        ],
        "states": [],
        "props": [
          {
            "name": "direction",
            "required": false,
            "type": "'horizontal' | 'vertical'"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg' | number"
          },
          {
            "name": "wrap",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "fill",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "align",
            "required": false,
            "type": "'start' | 'center' | 'end' | 'baseline'"
          },
          {
            "name": "tag",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      }
    ]
  },
  {
    "id": "layout",
    "zh": "布局",
    "en": "Layout",
    "components": [
      {
        "kebab": "main",
        "zh": "主区",
        "en": "Main",
        "exports": [
          "MiMain"
        ],
        "klass": "materin-ui-main",
        "purpose": {
          "zh": "容器主区：占满剩余空间并独立滚动",
          "en": "Container main region: takes the remaining space and scrolls on its own"
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "tag",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "aside",
        "zh": "侧栏",
        "en": "Aside",
        "exports": [
          "MiAside"
        ],
        "klass": "materin-ui-aside",
        "purpose": {
          "zh": "容器侧栏：可设宽度，挂载即让父容器转为横向",
          "en": "Container side panel: width configurable, switches its parent container to horizontal on mount"
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "width",
            "required": false,
            "type": "string | number"
          },
          {
            "name": "tag",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "splitter",
        "zh": "分栏",
        "en": "Splitter",
        "exports": [
          "MiSplitter"
        ],
        "klass": "materin-ui-splitter",
        "purpose": {
          "zh": "",
          "en": ""
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "direction",
            "required": false,
            "type": "'horizontal' | 'vertical'"
          },
          {
            "name": "initial",
            "required": false,
            "type": "number"
          },
          {
            "name": "min",
            "required": false,
            "type": "number"
          },
          {
            "name": "max",
            "required": false,
            "type": "number"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "container",
        "zh": "容器",
        "en": "Container",
        "exports": [
          "MiContainer"
        ],
        "klass": "materin-ui-container",
        "purpose": {
          "zh": "页面级容器：横竖方向自动判定（有侧栏则横向）",
          "en": "Page-level container: direction resolved automatically (horizontal when an aside is present)"
        },
        "parts": [],
        "variants": [
          "--vertical",
          "--horizontal"
        ],
        "states": [],
        "props": [
          {
            "name": "direction",
            "required": false,
            "type": "'vertical' | 'horizontal' | ''"
          },
          {
            "name": "tag",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "footer",
        "zh": "底栏",
        "en": "Footer",
        "exports": [
          "MiFooter"
        ],
        "klass": "materin-ui-footer",
        "purpose": {
          "zh": "容器页脚",
          "en": "Container footer"
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "height",
            "required": false,
            "type": "string | number"
          },
          {
            "name": "tag",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "row",
        "zh": "栅格",
        "en": "Row",
        "exports": [
          "MiRow"
        ],
        "klass": "materin-ui-row",
        "purpose": {
          "zh": "24 栅格行：下发列间距，负责主轴与交叉轴对齐",
          "en": "24-column grid row: hands the gutter down to columns and controls alignment"
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "gutter",
            "required": false,
            "type": "number"
          },
          {
            "name": "justify",
            "required": false,
            "type": "'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'"
          },
          {
            "name": "align",
            "required": false,
            "type": "'top' | 'middle' | 'bottom' | 'stretch'"
          },
          {
            "name": "tag",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "col",
        "zh": "栅格列",
        "en": "Col",
        "exports": [
          "MiCol"
        ],
        "klass": "materin-ui-col",
        "purpose": {
          "zh": "24 栅格列：span/offset/order + xs~xl 断点覆盖",
          "en": "24-column grid column: span / offset / order with xs–xl breakpoint overrides"
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "span",
            "required": false,
            "type": "number"
          },
          {
            "name": "offset",
            "required": false,
            "type": "number"
          },
          {
            "name": "order",
            "required": false,
            "type": "number"
          },
          {
            "name": "xs",
            "required": false,
            "type": "number | ColSize"
          },
          {
            "name": "sm",
            "required": false,
            "type": "number | ColSize"
          },
          {
            "name": "md",
            "required": false,
            "type": "number | ColSize"
          },
          {
            "name": "lg",
            "required": false,
            "type": "number | ColSize"
          },
          {
            "name": "xl",
            "required": false,
            "type": "number | ColSize"
          },
          {
            "name": "tag",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "page-header",
        "zh": "页头",
        "en": "Page header",
        "exports": [
          "MiPageHeader"
        ],
        "klass": "materin-ui-page-header",
        "purpose": {
          "zh": "",
          "en": ""
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "title",
            "required": false,
            "type": "string"
          },
          {
            "name": "description",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "page-shell",
        "zh": "页面骨架",
        "en": "Page shell",
        "exports": [
          "MiPageShell"
        ],
        "klass": "materin-ui-page-shell",
        "purpose": {
          "zh": "页面骨架：顶栏 + 侧栏 + 主区 + 底栏的整页骨架",
          "en": "Page shell: full-page skeleton with header, aside, main and footer"
        },
        "parts": [
          "materin-ui-page-shell__aside",
          "materin-ui-page-shell__body",
          "materin-ui-page-shell__footer",
          "materin-ui-page-shell__header",
          "materin-ui-page-shell__main"
        ],
        "variants": [],
        "states": [],
        "props": [],
        "hasDemo": false
      },
      {
        "kebab": "header",
        "zh": "顶栏",
        "en": "Header",
        "exports": [
          "MiHeader"
        ],
        "klass": "materin-ui-header",
        "purpose": {
          "zh": "容器顶栏：毛玻璃吸附、可设高度",
          "en": "Container top bar: frosted, height configurable"
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "height",
            "required": false,
            "type": "string | number"
          },
          {
            "name": "tag",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      }
    ]
  },
  {
    "id": "form",
    "zh": "表单",
    "en": "Form",
    "components": [
      {
        "kebab": "upload",
        "zh": "上传",
        "en": "Upload",
        "exports": [
          "MiUpload"
        ],
        "klass": "materin-ui-upload",
        "purpose": {
          "zh": "上传：文件列表、进度、失败重试、多选",
          "en": "Upload: file list, progress, retry on failure, multiple"
        },
        "parts": [
          "materin-ui-upload__error",
          "materin-ui-upload__input",
          "materin-ui-upload__item",
          "materin-ui-upload__list",
          "materin-ui-upload__name",
          "materin-ui-upload__remove",
          "materin-ui-upload__retry",
          "materin-ui-upload__size",
          "materin-ui-upload__trigger"
        ],
        "variants": [],
        "states": [
          "is-error"
        ],
        "props": [
          {
            "name": "buttonText",
            "required": false,
            "type": "string"
          },
          {
            "name": "maxSize",
            "required": false,
            "type": "number"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "radio",
        "zh": "单选",
        "en": "Radio",
        "exports": [
          "MiRadio"
        ],
        "klass": "materin-ui-radio",
        "purpose": {
          "zh": "单选框：单独使用或配合单选组",
          "en": "Radio: standalone or inside a group"
        },
        "parts": [
          "materin-ui-radio__input",
          "materin-ui-radio__dot",
          "materin-ui-radio__label"
        ],
        "variants": [
          "--sm",
          "--md",
          "--lg"
        ],
        "states": [
          "is-checked",
          "is-disabled"
        ],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "ChoiceValue"
          },
          {
            "name": "value",
            "required": false,
            "type": "ChoiceValue"
          },
          {
            "name": "label",
            "required": false,
            "type": "string"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg'"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "radio-group",
        "zh": "单选组",
        "en": "Radio group",
        "exports": [
          "MiRadioGroup"
        ],
        "klass": "materin-ui-radio-group",
        "purpose": {
          "zh": "单选组：同一时刻只选一个，横竖排列",
          "en": "Radio group: one choice at a time, row or column layout"
        },
        "parts": [],
        "variants": [
          "--horizontal",
          "--vertical"
        ],
        "states": [],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "ChoiceValue"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg'"
          },
          {
            "name": "direction",
            "required": false,
            "type": "'horizontal' | 'vertical'"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "checkbox",
        "zh": "多选",
        "en": "Checkbox",
        "exports": [
          "MiCheckbox"
        ],
        "klass": "materin-ui-checkbox",
        "purpose": {
          "zh": "多选框：单独使用或配合多选组，跟随表单的尺寸与禁用",
          "en": "Checkbox: standalone or inside a group, inheriting size and disabled state from the form"
        },
        "parts": [
          "materin-ui-checkbox__input",
          "materin-ui-checkbox__box",
          "materin-ui-checkbox__label"
        ],
        "variants": [
          "--sm",
          "--md",
          "--lg"
        ],
        "states": [
          "is-checked",
          "is-disabled"
        ],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "value",
            "required": false,
            "type": "ChoiceValue"
          },
          {
            "name": "label",
            "required": false,
            "type": "string"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg'"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "checkbox-group",
        "zh": "多选组",
        "en": "Checkbox group",
        "exports": [
          "MiCheckboxGroup"
        ],
        "klass": "materin-ui-checkbox-group",
        "purpose": {
          "zh": "多选组：数组值、横竖排列，统一向子项下发禁用与尺寸",
          "en": "Checkbox group: array value, row or column layout, pushes disabled and size down to the items"
        },
        "parts": [],
        "variants": [
          "--horizontal",
          "--vertical"
        ],
        "states": [],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "ChoiceValue[]"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg'"
          },
          {
            "name": "direction",
            "required": false,
            "type": "'horizontal' | 'vertical'"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "switch",
        "zh": "开关",
        "en": "Switch",
        "exports": [
          "MiSwitch"
        ],
        "klass": "materin-ui-switch",
        "purpose": {
          "zh": "开关：布尔或自定义值、开关文案、加载态、三档尺寸",
          "en": "Switch: boolean or custom values, on/off text, loading state, three sizes"
        },
        "parts": [
          "materin-ui-switch__handle",
          "materin-ui-switch__label"
        ],
        "variants": [
          "--sm",
          "--md",
          "--lg"
        ],
        "states": [
          "is-checked",
          "is-disabled",
          "is-loading"
        ],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "boolean | string | number"
          },
          {
            "name": "activeValue",
            "required": false,
            "type": "boolean | string | number"
          },
          {
            "name": "inactiveValue",
            "required": false,
            "type": "boolean | string | number"
          },
          {
            "name": "activeText",
            "required": false,
            "type": "string"
          },
          {
            "name": "inactiveText",
            "required": false,
            "type": "string"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "loading",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg'"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "mention",
        "zh": "提及",
        "en": "Mention",
        "exports": [
          "MiMention"
        ],
        "klass": "materin-ui-mention",
        "purpose": {
          "zh": "",
          "en": ""
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "string"
          },
          {
            "name": "options",
            "required": false,
            "type": "string[]"
          },
          {
            "name": "prefix",
            "required": false,
            "type": "string"
          },
          {
            "name": "placeholder",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "input-number",
        "zh": "数字输入",
        "en": "Input number",
        "exports": [
          "MiInputNumber"
        ],
        "klass": "materin-ui-input-number",
        "purpose": {
          "zh": "数字输入：步进、上下限、精度、键盘上下键、加减按钮自动禁用",
          "en": "Number input: stepping, min and max, precision, arrow keys, buttons that disable themselves at the bounds"
        },
        "parts": [
          "materin-ui-input-number__inner",
          "materin-ui-input-number__input",
          "materin-ui-input-number__decrease",
          "materin-ui-input-number__increase"
        ],
        "variants": [
          "--sm",
          "--md",
          "--lg"
        ],
        "states": [
          "is-disabled",
          "is-error"
        ],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "number | null"
          },
          {
            "name": "min",
            "required": false,
            "type": "number"
          },
          {
            "name": "max",
            "required": false,
            "type": "number"
          },
          {
            "name": "step",
            "required": false,
            "type": "number"
          },
          {
            "name": "precision",
            "required": false,
            "type": "number"
          },
          {
            "name": "placeholder",
            "required": false,
            "type": "string"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg'"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "date-picker",
        "zh": "日期选择",
        "en": "Date picker",
        "exports": [
          "MiDatePicker"
        ],
        "klass": "materin-ui-date-picker",
        "purpose": {
          "zh": "日期选择：月历面板、受控、禁用过去日期",
          "en": "Date picker: month panel, controlled, optional past disabling"
        },
        "parts": [
          "materin-ui-date-picker__field",
          "materin-ui-date-picker__grid",
          "materin-ui-date-picker__head",
          "materin-ui-date-picker__month",
          "materin-ui-date-picker__nav",
          "materin-ui-date-picker__panel"
        ],
        "variants": [],
        "states": [
          "is-open"
        ],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "string"
          },
          {
            "name": "placeholder",
            "required": false,
            "type": "string"
          },
          {
            "name": "disablePast",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "time-select",
        "zh": "时间段选择",
        "en": "Time select",
        "exports": [
          "MiTimeSelect"
        ],
        "klass": "materin-ui-time-select",
        "purpose": {
          "zh": "",
          "en": ""
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "string"
          },
          {
            "name": "start",
            "required": false,
            "type": "string"
          },
          {
            "name": "end",
            "required": false,
            "type": "string"
          },
          {
            "name": "step",
            "required": false,
            "type": "number"
          },
          {
            "name": "placeholder",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "time-picker",
        "zh": "时间选择",
        "en": "Time picker",
        "exports": [
          "MiTimePicker"
        ],
        "klass": "materin-ui-time-picker",
        "purpose": {
          "zh": "时间选择：时分两列滚动或步进",
          "en": "Time picker: hour and minute columns"
        },
        "parts": [
          "materin-ui-time-picker__field"
        ],
        "variants": [],
        "states": [
          "is-open"
        ],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "string"
          },
          {
            "name": "placeholder",
            "required": false,
            "type": "string"
          },
          {
            "name": "minuteStep",
            "required": false,
            "type": "number"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "tree-select",
        "zh": "树选择",
        "en": "Tree select",
        "exports": [
          "MiTreeSelect"
        ],
        "klass": "materin-ui-tree-select",
        "purpose": {
          "zh": "",
          "en": ""
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "nodes",
            "required": false,
            "type": "TreeNode[]"
          },
          {
            "name": "modelValue",
            "required": false,
            "type": "string | number | (string | number)[]"
          },
          {
            "name": "multiple",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "placeholder",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "slider",
        "zh": "滑块",
        "en": "Slider",
        "exports": [
          "MiSlider"
        ],
        "klass": "materin-ui-slider",
        "purpose": {
          "zh": "滑块：拖动、点击轨道、键盘左右键；支持双滑块区间",
          "en": "Slider: drag, click the runway, arrow keys; supports a two-handle range"
        },
        "parts": [
          "materin-ui-slider__runway",
          "materin-ui-slider__bar",
          "materin-ui-slider__button",
          "materin-ui-slider__value"
        ],
        "variants": [],
        "states": [
          "is-disabled",
          "is-range",
          "is-dragging"
        ],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "number | [number, number]"
          },
          {
            "name": "min",
            "required": false,
            "type": "number"
          },
          {
            "name": "max",
            "required": false,
            "type": "number"
          },
          {
            "name": "step",
            "required": false,
            "type": "number"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "range",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "showValue",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "transfer",
        "zh": "穿梭框",
        "en": "Transfer",
        "exports": [
          "MiTransfer"
        ],
        "klass": "materin-ui-transfer",
        "purpose": {
          "zh": "穿梭框：左右两栏勾选移动，可搜索",
          "en": "Transfer: two panels with check-move, optional filter"
        },
        "parts": [
          "materin-ui-transfer__actions",
          "materin-ui-transfer__head",
          "materin-ui-transfer__list",
          "materin-ui-transfer__option",
          "materin-ui-transfer__panel"
        ],
        "variants": [],
        "states": [
          "is-checked"
        ],
        "props": [
          {
            "name": "items",
            "required": false,
            "type": "TransferItem[]"
          },
          {
            "name": "modelValue",
            "required": false,
            "type": "(string | number)[]"
          },
          {
            "name": "sourceTitle",
            "required": false,
            "type": "string"
          },
          {
            "name": "targetTitle",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "cascader",
        "zh": "级联选择",
        "en": "Cascader",
        "exports": [
          "MiCascader"
        ],
        "klass": "materin-ui-cascader",
        "purpose": {
          "zh": "级联选择：逐级展开列，受控",
          "en": "Cascader: expanding column picker, controlled"
        },
        "parts": [
          "materin-ui-cascader__arrow",
          "materin-ui-cascader__column",
          "materin-ui-cascader__columns",
          "materin-ui-cascader__field",
          "materin-ui-cascader__option"
        ],
        "variants": [],
        "states": [
          "is-open",
          "is-active"
        ],
        "props": [
          {
            "name": "options",
            "required": false,
            "type": "CascaderOption[]"
          },
          {
            "name": "modelValue",
            "required": false,
            "type": "(string | number)[]"
          },
          {
            "name": "placeholder",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "autocomplete",
        "zh": "自动补全",
        "en": "Autocomplete",
        "exports": [
          "MiAutocomplete"
        ],
        "klass": "materin-ui-autocomplete",
        "purpose": {
          "zh": "自动补全：输入过滤建议，键盘可选",
          "en": "Autocomplete: filtered suggestions with keyboard navigation"
        },
        "parts": [
          "materin-ui-autocomplete__field",
          "materin-ui-autocomplete__list",
          "materin-ui-autocomplete__option"
        ],
        "variants": [],
        "states": [
          "is-open",
          "is-active"
        ],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "string"
          },
          {
            "name": "suggestions",
            "required": false,
            "type": "string[]"
          },
          {
            "name": "placeholder",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "form",
        "zh": "表单",
        "en": "Form",
        "exports": [
          "MiForm"
        ],
        "klass": "materin-ui-form",
        "purpose": {
          "zh": "表单：统一校验（必填 / 类型 / 长度 / 区间 / 正则 / 自定义，支持 blur 与 change 触发）",
          "en": "Form: one validation pipeline (required, type, length, range, pattern, custom) with blur and change triggers"
        },
        "parts": [],
        "variants": [
          "--sm",
          "--md",
          "--lg",
          "--inline"
        ],
        "states": [],
        "props": [
          {
            "name": "model",
            "required": true,
            "type": "Record<string, unknown>"
          },
          {
            "name": "rules",
            "required": false,
            "type": "Record<string, FormRule[]>"
          },
          {
            "name": "labelWidth",
            "required": false,
            "type": "string | number"
          },
          {
            "name": "labelPosition",
            "required": false,
            "type": "'left' | 'right' | 'top'"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg'"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "inline",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "showMessage",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "hideRequiredAsterisk",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "form-item",
        "zh": "表单项",
        "en": "Form item",
        "exports": [
          "MiFormItem"
        ],
        "klass": "materin-ui-form-item",
        "purpose": {
          "zh": "表单项：标签、必填星号、校验错误、说明文字，向子控件下发尺寸与禁用",
          "en": "Form item: label, required asterisk, validation error, hint, and size or disabled state pushed down to the control"
        },
        "parts": [
          "materin-ui-form-item__label",
          "materin-ui-form-item__required",
          "materin-ui-form-item__content",
          "materin-ui-form-item__error",
          "materin-ui-form-item__hint"
        ],
        "variants": [
          "--left",
          "--right",
          "--top"
        ],
        "states": [
          "is-error"
        ],
        "props": [
          {
            "name": "prop",
            "required": false,
            "type": "string"
          },
          {
            "name": "label",
            "required": false,
            "type": "string"
          },
          {
            "name": "labelWidth",
            "required": false,
            "type": "string | number"
          },
          {
            "name": "required",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "rules",
            "required": false,
            "type": "FormRule[]"
          },
          {
            "name": "error",
            "required": false,
            "type": "string"
          },
          {
            "name": "hint",
            "required": false,
            "type": "string"
          },
          {
            "name": "showMessage",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "rate",
        "zh": "评分",
        "en": "Rate",
        "exports": [
          "MiRate"
        ],
        "klass": "materin-ui-rate",
        "purpose": {
          "zh": "评分：悬停预览、点击选中、可再点取消，可显示文字",
          "en": "Rate: hover preview, click to pick, click again to clear, optional text"
        },
        "parts": [
          "materin-ui-rate__item",
          "materin-ui-rate__text"
        ],
        "variants": [],
        "states": [
          "is-disabled",
          "is-active"
        ],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "number"
          },
          {
            "name": "max",
            "required": false,
            "type": "number"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "allowClear",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "showText",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "texts",
            "required": false,
            "type": "string[]"
          },
          {
            "name": "ariaLabel",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "input",
        "zh": "输入框",
        "en": "Input",
        "exports": [
          "MiInput"
        ],
        "klass": "materin-ui-field-wrapper",
        "purpose": {
          "zh": "输入框外层容器（承载聚焦描边，与 input 本体分离）",
          "en": "Input wrapper (carries the focus ring, separate from the input itself)"
        },
        "parts": [],
        "variants": [
          "--focused"
        ],
        "states": [],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "string | number"
          },
          {
            "name": "type",
            "required": false,
            "type": "InputType"
          },
          {
            "name": "size",
            "required": false,
            "type": "InputSize"
          },
          {
            "name": "placeholder",
            "required": false,
            "type": "string"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "readonly",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "required",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "clearable",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "maxlength",
            "required": false,
            "type": "number"
          },
          {
            "name": "label",
            "required": false,
            "type": "string"
          },
          {
            "name": "hint",
            "required": false,
            "type": "string"
          },
          {
            "name": "error",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "select",
        "zh": "选择器",
        "en": "Select",
        "exports": [
          "MiSelect"
        ],
        "klass": "materin-ui-select",
        "purpose": {
          "zh": "下拉选择：单选/多选（多选显示标签）、键盘上下与回车、点击外部关闭",
          "en": "Select: single or multiple (multiple shows tags), arrow-key and Enter navigation, closes on outside click"
        },
        "parts": [
          "materin-ui-select__trigger",
          "materin-ui-select__value",
          "materin-ui-select__tags",
          "materin-ui-select__arrow",
          "materin-ui-select__dropdown",
          "materin-ui-select__empty"
        ],
        "variants": [
          "--sm",
          "--md",
          "--lg"
        ],
        "states": [
          "is-open",
          "is-disabled",
          "is-error",
          "is-multiple"
        ],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "ChoiceValue | ChoiceValue[] | null"
          },
          {
            "name": "multiple",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "placeholder",
            "required": false,
            "type": "string"
          },
          {
            "name": "emptyText",
            "required": false,
            "type": "string"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg'"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "option",
        "zh": "选项",
        "en": "Option",
        "exports": [
          "MiOption"
        ],
        "klass": "materin-ui-select-option",
        "purpose": {
          "zh": "下拉选项：向父级 Select 登记自己的值与文案",
          "en": "Select option: registers its value and label with the parent select"
        },
        "parts": [
          "materin-ui-select-option__label",
          "materin-ui-select-option__check"
        ],
        "variants": [
          "--entry"
        ],
        "states": [
          "is-selected",
          "is-disabled",
          "is-active"
        ],
        "props": [
          {
            "name": "value",
            "required": true,
            "type": "ChoiceValue"
          },
          {
            "name": "label",
            "required": false,
            "type": "string"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "option-group",
        "zh": "选项分组",
        "en": "Option group",
        "exports": [
          "MiOptionGroup"
        ],
        "klass": "materin-ui-select-group",
        "purpose": {
          "zh": "下拉选项分组：给一组选项加标题",
          "en": "Option group: a titled block of options"
        },
        "parts": [
          "materin-ui-select-group__title"
        ],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "label",
            "required": true,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "color-picker",
        "zh": "颜色选择",
        "en": "Color picker",
        "exports": [
          "MiColorPicker"
        ],
        "klass": "materin-ui-color-picker",
        "purpose": {
          "zh": "颜色选择：预设色板 + 原生取色器，受控",
          "en": "Color picker: preset swatches plus native input, controlled"
        },
        "parts": [
          "materin-ui-color-picker__input",
          "materin-ui-color-picker__swatch",
          "materin-ui-color-picker__value"
        ],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "string"
          },
          {
            "name": "presets",
            "required": false,
            "type": "string[]"
          },
          {
            "name": "showValue",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      }
    ]
  },
  {
    "id": "feedback",
    "zh": "反馈",
    "en": "Feedback",
    "components": [
      {
        "kebab": "message",
        "zh": "全局消息",
        "en": "Message",
        "exports": [
          "MiMessage"
        ],
        "klass": "materin-ui-message",
        "purpose": {
          "zh": "全局消息：MiMessage.success(...) 一行调用，可多条堆叠、定时关闭",
          "en": "Message: one-line MiMessage.success(...) calls, stacking and auto-dismiss"
        },
        "parts": [
          "materin-ui-message__item",
          "materin-ui-message__icon",
          "materin-ui-message__text",
          "materin-ui-message__close"
        ],
        "variants": [],
        "states": [],
        "props": [],
        "hasDemo": false
      },
      {
        "kebab": "loading",
        "zh": "加载",
        "en": "Loading",
        "exports": [
          "MiLoading"
        ],
        "klass": "materin-ui-loading",
        "purpose": {
          "zh": "加载态：盖在内容上的遮罩，可全屏、可带文案、三档转圈大小",
          "en": "Loading: a mask over its content, optional fullscreen, optional text, three spinner sizes"
        },
        "parts": [
          "materin-ui-loading__mask",
          "materin-ui-loading__spinner",
          "materin-ui-loading__text"
        ],
        "variants": [
          "--sm",
          "--md",
          "--lg",
          "--fullscreen"
        ],
        "states": [],
        "props": [
          {
            "name": "loading",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "text",
            "required": false,
            "type": "string"
          },
          {
            "name": "fullscreen",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg'"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "message-box",
        "zh": "命令式弹窗",
        "en": "Message box",
        "exports": [
          "MiMessageBox"
        ],
        "klass": "materin-ui-dialog",
        "purpose": {
          "zh": "",
          "en": ""
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [],
        "hasDemo": false
      },
      {
        "kebab": "dialog",
        "zh": "对话框",
        "en": "Dialog",
        "exports": [
          "MiDialog"
        ],
        "klass": "materin-ui-dialog",
        "purpose": {
          "zh": "对话框：遮罩 + 面板，可居中/全屏/玻璃，点遮罩或 ESC 关闭，打开时锁滚动",
          "en": "Dialog: overlay plus panel, centred, fullscreen or glass, closes on overlay click or Escape, locks scrolling"
        },
        "parts": [
          "materin-ui-dialog__overlay",
          "materin-ui-dialog__panel",
          "materin-ui-dialog__header",
          "materin-ui-dialog__title",
          "materin-ui-dialog__close",
          "materin-ui-dialog__body",
          "materin-ui-dialog__footer"
        ],
        "variants": [
          "--center",
          "--fullscreen",
          "--glass"
        ],
        "states": [],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "title",
            "required": false,
            "type": "string"
          },
          {
            "name": "width",
            "required": false,
            "type": "number | string"
          },
          {
            "name": "top",
            "required": false,
            "type": "string"
          },
          {
            "name": "alignCenter",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "fullscreen",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "showClose",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "modal",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "closeOnClickModal",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "closeOnPressEscape",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "lockScroll",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "appendToBody",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "glass",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "drawer",
        "zh": "抽屉",
        "en": "Drawer",
        "exports": [
          "MiDrawer"
        ],
        "klass": "materin-ui-drawer",
        "purpose": {
          "zh": "抽屉：从四边滑出，可设宽高、可不要标题栏、可玻璃",
          "en": "Drawer: slides in from any of four sides, sizeable, header optional, glass optional"
        },
        "parts": [
          "materin-ui-drawer__overlay",
          "materin-ui-drawer__panel",
          "materin-ui-drawer__header",
          "materin-ui-drawer__title",
          "materin-ui-drawer__close",
          "materin-ui-drawer__body",
          "materin-ui-drawer__footer"
        ],
        "variants": [
          "--rtl",
          "--ltr",
          "--ttb",
          "--btt",
          "--glass"
        ],
        "states": [],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "title",
            "required": false,
            "type": "string"
          },
          {
            "name": "direction",
            "required": false,
            "type": "'rtl' | 'ltr' | 'ttb' | 'btt'"
          },
          {
            "name": "size",
            "required": false,
            "type": "number | string"
          },
          {
            "name": "showClose",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "withHeader",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "modal",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "closeOnClickModal",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "closeOnPressEscape",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "lockScroll",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "appendToBody",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "glass",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "alert",
        "zh": "提示条",
        "en": "Alert",
        "exports": [
          "MiAlert"
        ],
        "klass": "materin-ui-alert",
        "purpose": {
          "zh": "提示条：四种语义、标题与描述、可关闭、图标、居中、玻璃底",
          "en": "Alert: four semantic types, title and description, closable, icon, centred, glass background"
        },
        "parts": [
          "materin-ui-alert__icon",
          "materin-ui-alert__content",
          "materin-ui-alert__title",
          "materin-ui-alert__description",
          "materin-ui-alert__close"
        ],
        "variants": [
          "--info",
          "--success",
          "--warning",
          "--error",
          "--center",
          "--glass"
        ],
        "states": [],
        "props": [
          {
            "name": "type",
            "required": false,
            "type": "AlertType"
          },
          {
            "name": "title",
            "required": false,
            "type": "string"
          },
          {
            "name": "description",
            "required": false,
            "type": "string"
          },
          {
            "name": "closable",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "showIcon",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "center",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "glass",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "tooltip",
        "zh": "文字提示",
        "en": "Tooltip",
        "exports": [
          "MiTooltip"
        ],
        "klass": "materin-ui-tooltip",
        "purpose": {
          "zh": "文字提示：悬浮或聚焦出现，四个方向、可设出现与消失延迟",
          "en": "Tooltip: appears on hover or focus, four placements, configurable show and hide delays"
        },
        "parts": [
          "materin-ui-tooltip__popper"
        ],
        "variants": [
          "--top",
          "--bottom",
          "--left",
          "--right"
        ],
        "states": [
          "is-disabled"
        ],
        "props": [
          {
            "name": "content",
            "required": false,
            "type": "string"
          },
          {
            "name": "placement",
            "required": false,
            "type": "PopperPlacement"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "showAfter",
            "required": false,
            "type": "number"
          },
          {
            "name": "hideAfter",
            "required": false,
            "type": "number"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "popover",
        "zh": "气泡卡片",
        "en": "Popover",
        "exports": [
          "MiPopover"
        ],
        "klass": "materin-ui-popover",
        "purpose": {
          "zh": "气泡卡片：可放交互内容，点击/悬浮/聚焦触发，点外部关闭",
          "en": "Popover: holds interactive content, opened by click, hover or focus, closes on outside click"
        },
        "parts": [
          "materin-ui-popover__trigger",
          "materin-ui-popover__popper",
          "materin-ui-popover__title",
          "materin-ui-popover__content"
        ],
        "variants": [
          "--top",
          "--bottom",
          "--left",
          "--right"
        ],
        "states": [
          "is-open",
          "is-disabled"
        ],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "trigger",
            "required": false,
            "type": "'click' | 'hover' | 'focus'"
          },
          {
            "name": "title",
            "required": false,
            "type": "string"
          },
          {
            "name": "placement",
            "required": false,
            "type": "PopperPlacement"
          },
          {
            "name": "width",
            "required": false,
            "type": "number | string"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "popconfirm",
        "zh": "气泡确认",
        "en": "Popconfirm",
        "exports": [
          "MiPopconfirm"
        ],
        "klass": "materin-ui-popconfirm",
        "purpose": {
          "zh": "气泡确认：二次确认后再执行，确认按钮分常用与危险两种语气",
          "en": "Popconfirm: asks before acting, with a normal or a danger confirm button"
        },
        "parts": [
          "materin-ui-popconfirm__trigger",
          "materin-ui-popconfirm__popper",
          "materin-ui-popconfirm__head",
          "materin-ui-popconfirm__icon",
          "materin-ui-popconfirm__title",
          "materin-ui-popconfirm__actions",
          "materin-ui-popconfirm__cancel",
          "materin-ui-popconfirm__confirm"
        ],
        "variants": [
          "--top",
          "--bottom",
          "--left",
          "--right",
          "--danger"
        ],
        "states": [
          "is-open",
          "is-disabled"
        ],
        "props": [
          {
            "name": "title",
            "required": false,
            "type": "string"
          },
          {
            "name": "confirmText",
            "required": false,
            "type": "string"
          },
          {
            "name": "cancelText",
            "required": false,
            "type": "string"
          },
          {
            "name": "placement",
            "required": false,
            "type": "PopperPlacement"
          },
          {
            "name": "type",
            "required": false,
            "type": "'primary' | 'danger'"
          },
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "message-item",
        "zh": "消息条",
        "en": "Message item",
        "exports": [
          "MiMessageItem"
        ],
        "klass": "materin-ui-message__item",
        "purpose": {
          "zh": "单条提示卡（消息 / 通知共用样式），一般不用手动引用",
          "en": "A single toast card (shared by message and notification), rarely referenced directly"
        },
        "parts": [
          "materin-ui-message__icon",
          "materin-ui-message__text",
          "materin-ui-message__close"
        ],
        "variants": [
          "--info",
          "--success",
          "--warning",
          "--error"
        ],
        "states": [],
        "props": [],
        "hasDemo": false
      },
      {
        "kebab": "tour",
        "zh": "漫游引导",
        "en": "Tour",
        "exports": [
          "MiTour"
        ],
        "klass": "materin-ui-tour",
        "purpose": {
          "zh": "漫游引导：按步骤高亮页面元素并给说明，可上一步/下一步/完成",
          "en": "Tour: highlights page elements step by step with copy, prev, next and finish"
        },
        "parts": [
          "materin-ui-tour__highlight",
          "materin-ui-tour__popper",
          "materin-ui-tour__header",
          "materin-ui-tour__title",
          "materin-ui-tour__close",
          "materin-ui-tour__body",
          "materin-ui-tour__footer",
          "materin-ui-tour__indicator",
          "materin-ui-tour__actions",
          "materin-ui-tour__prev",
          "materin-ui-tour__next"
        ],
        "variants": [
          "--top",
          "--bottom",
          "--left",
          "--right"
        ],
        "states": [],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "number"
          },
          {
            "name": "steps",
            "required": false,
            "type": "TourStep[]"
          },
          {
            "name": "showClose",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "gap",
            "required": false,
            "type": "number"
          },
          {
            "name": "prevText",
            "required": false,
            "type": "string"
          },
          {
            "name": "nextText",
            "required": false,
            "type": "string"
          },
          {
            "name": "finishText",
            "required": false,
            "type": "string"
          },
          {
            "name": "scrollToTarget",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "result",
        "zh": "结果页",
        "en": "Result",
        "exports": [
          "MiResult"
        ],
        "klass": "materin-ui-result",
        "purpose": {
          "zh": "结果页：成功/失败/警告/提示四种图标 + 标题 + 说明 + 操作区",
          "en": "Result: success, error, warning or info icon with title, copy and actions"
        },
        "parts": [
          "materin-ui-result__icon",
          "materin-ui-result__title",
          "materin-ui-result__description",
          "materin-ui-result__extra"
        ],
        "variants": [
          "--success",
          "--error",
          "--warning",
          "--info"
        ],
        "states": [],
        "props": [
          {
            "name": "status",
            "required": false,
            "type": "'success' | 'error' | 'warning' | 'info'"
          },
          {
            "name": "title",
            "required": false,
            "type": "string"
          },
          {
            "name": "description",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "notification",
        "zh": "通知",
        "en": "Notification",
        "exports": [
          "MiNotification"
        ],
        "klass": "materin-ui-notification",
        "purpose": {
          "zh": "全局通知：右上角浮出的通知卡，带标题，可多条、定时关闭",
          "en": "Notification: titled cards floating in from a corner, stacking and auto-dismiss"
        },
        "parts": [
          "materin-ui-notification__item",
          "materin-ui-notification__header",
          "materin-ui-notification__title",
          "materin-ui-notification__close",
          "materin-ui-notification__content"
        ],
        "variants": [
          "--top-right",
          "--top-left",
          "--bottom-right",
          "--bottom-left"
        ],
        "states": [],
        "props": [],
        "hasDemo": false
      },
      {
        "kebab": "notification-item",
        "zh": "通知条",
        "en": "Notification item",
        "exports": [
          "MiNotificationItem"
        ],
        "klass": "materin-ui-notification__item",
        "purpose": {
          "zh": "单条通知卡（标题 + 正文），一般不用手动引用",
          "en": "A single notification card (title plus body), rarely referenced directly"
        },
        "parts": [
          "materin-ui-notification__header",
          "materin-ui-notification__title",
          "materin-ui-notification__close",
          "materin-ui-notification__content"
        ],
        "variants": [
          "--info",
          "--success",
          "--warning",
          "--error"
        ],
        "states": [],
        "props": [],
        "hasDemo": false
      }
    ]
  },
  {
    "id": "data",
    "zh": "数据展示",
    "en": "Data",
    "components": [
      {
        "kebab": "qrcode",
        "zh": "二维码",
        "en": "QR code",
        "exports": [
          "MiQRCode"
        ],
        "klass": "materin-ui-qrcode",
        "purpose": {
          "zh": "二维码：canvas 渲染、四档纠错、自动选版本",
          "en": "QR code: canvas render, four EC levels, automatic version"
        },
        "parts": [
          "materin-ui-qrcode__canvas",
          "materin-ui-qrcode__placeholder"
        ],
        "variants": [
          "--bordered"
        ],
        "states": [],
        "props": [
          {
            "name": "value",
            "required": true,
            "type": "string"
          },
          {
            "name": "typeNumber",
            "required": false,
            "type": "0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10"
          },
          {
            "name": "errorLevel",
            "required": false,
            "type": "'L' | 'M' | 'Q' | 'H'"
          },
          {
            "name": "size",
            "required": false,
            "type": "number"
          },
          {
            "name": "color",
            "required": false,
            "type": "string"
          },
          {
            "name": "bordered",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "segmented",
        "zh": "分段控制",
        "en": "Segmented",
        "exports": [
          "MiSegmented"
        ],
        "klass": "materin-ui-segmented",
        "purpose": {
          "zh": "分段控制：一组互斥选项，可撑满一行",
          "en": "Segmented: mutually exclusive options, optional full width"
        },
        "parts": [
          "materin-ui-segmented__option"
        ],
        "variants": [
          "--sm",
          "--block"
        ],
        "states": [
          "is-active"
        ],
        "props": [
          {
            "name": "options",
            "required": false,
            "type": "SegmentedOption[]"
          },
          {
            "name": "modelValue",
            "required": false,
            "type": "string | number"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md'"
          },
          {
            "name": "block",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "pagination",
        "zh": "分页",
        "en": "Pagination",
        "exports": [
          "MiPagination"
        ],
        "klass": "materin-ui-pagination",
        "purpose": {
          "zh": "分页：页码 + 省略号 + 上下页，受控可用",
          "en": "Pagination: pagers with ellipsis and prev and next, works controlled"
        },
        "parts": [
          "materin-ui-pagination__prev",
          "materin-ui-pagination__page",
          "materin-ui-pagination__next",
          "materin-ui-pagination__total"
        ],
        "variants": [
          "--sm"
        ],
        "states": [
          "is-active",
          "is-gap"
        ],
        "props": [
          {
            "name": "total",
            "required": true,
            "type": "number"
          },
          {
            "name": "pageSize",
            "required": false,
            "type": "number"
          },
          {
            "name": "currentPage",
            "required": false,
            "type": "number"
          },
          {
            "name": "pagerCount",
            "required": false,
            "type": "number"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md'"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "image",
        "zh": "图片",
        "en": "Image",
        "exports": [
          "MiImage"
        ],
        "klass": "materin-ui-image",
        "purpose": {
          "zh": "图片：加载占位扫光、失败回落、四种裁剪、可懒加载",
          "en": "Image: loading shimmer, error fallback, four fits, optional lazy loading"
        },
        "parts": [
          "materin-ui-image__img",
          "materin-ui-image__placeholder",
          "materin-ui-image__fallback"
        ],
        "variants": [
          "--cover",
          "--contain",
          "--fill",
          "--none",
          "--rounded"
        ],
        "states": [
          "is-loaded"
        ],
        "props": [
          {
            "name": "src",
            "required": true,
            "type": "string"
          },
          {
            "name": "alt",
            "required": false,
            "type": "string"
          },
          {
            "name": "width",
            "required": false,
            "type": "number | string"
          },
          {
            "name": "height",
            "required": false,
            "type": "number | string"
          },
          {
            "name": "fit",
            "required": false,
            "type": "'cover' | 'contain' | 'fill' | 'none'"
          },
          {
            "name": "rounded",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "lazy",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "fallbackText",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "avatar",
        "zh": "头像",
        "en": "Avatar",
        "exports": [
          "MiAvatar"
        ],
        "klass": "materin-ui-avatar",
        "purpose": {
          "zh": "头像：图片 / 文字 / 默认剪影，圆形或方形，三档尺寸",
          "en": "Avatar: image, text or default silhouette; circle or square; three sizes"
        },
        "parts": [
          "materin-ui-avatar__img",
          "materin-ui-avatar__text",
          "materin-ui-avatar__icon"
        ],
        "variants": [
          "--circle",
          "--square"
        ],
        "states": [],
        "props": [
          {
            "name": "src",
            "required": false,
            "type": "string"
          },
          {
            "name": "alt",
            "required": false,
            "type": "string"
          },
          {
            "name": "size",
            "required": false,
            "type": "AvatarSize"
          },
          {
            "name": "shape",
            "required": false,
            "type": "'circle' | 'square'"
          },
          {
            "name": "name",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "collapse",
        "zh": "折叠面板",
        "en": "Collapse",
        "exports": [
          "MiCollapse"
        ],
        "klass": "materin-ui-collapse",
        "purpose": {
          "zh": "折叠面板：多开或手风琴，受控可用",
          "en": "Collapse: multiple or accordion, works controlled or not"
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "(string | number)[]"
          },
          {
            "name": "accordion",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "title",
            "required": false,
            "type": "string"
          },
          {
            "name": "name",
            "required": false,
            "type": "string | number"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "collapse-item",
        "zh": "折叠项",
        "en": "Collapse item",
        "exports": [
          "MiCollapseItem"
        ],
        "klass": "materin-ui-collapse-item",
        "purpose": {
          "zh": "折叠面板的单项（标题行 + 内容区），一般放在 MiCollapse 里用",
          "en": "A single collapse pane (title row plus content), normally inside a MiCollapse"
        },
        "parts": [
          "materin-ui-collapse-item__head",
          "materin-ui-collapse-item__title",
          "materin-ui-collapse-item__arrow",
          "materin-ui-collapse-item__content"
        ],
        "variants": [],
        "states": [
          "is-open"
        ],
        "props": [],
        "hasDemo": false
      },
      {
        "kebab": "descriptions",
        "zh": "描述列表",
        "en": "Descriptions",
        "exports": [
          "MiDescriptions"
        ],
        "klass": "materin-ui-descriptions",
        "purpose": {
          "zh": "描述列表：标签-值成对展示，横竖两向、可带边框",
          "en": "Descriptions: label-value pairs, horizontal or vertical, optional borders"
        },
        "parts": [
          "materin-ui-descriptions__title",
          "materin-ui-descriptions__body",
          "materin-ui-descriptions__row",
          "materin-ui-descriptions__label",
          "materin-ui-descriptions__value"
        ],
        "variants": [
          "--vertical",
          "--bordered"
        ],
        "states": [],
        "props": [
          {
            "name": "title",
            "required": false,
            "type": "string"
          },
          {
            "name": "items",
            "required": false,
            "type": "DescriptionsItem[]"
          },
          {
            "name": "direction",
            "required": false,
            "type": "'horizontal' | 'vertical'"
          },
          {
            "name": "border",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "infinite-scroll",
        "zh": "无限滚动",
        "en": "Infinite scroll",
        "exports": [
          "MiInfiniteScroll"
        ],
        "klass": "materin-ui-infinite-scroll",
        "purpose": {
          "zh": "无限滚动：触底触发 loadMore，可停",
          "en": "Infinite scroll: fires loadMore near bottom, stoppable"
        },
        "parts": [
          "materin-ui-infinite-scroll__sentinel",
          "materin-ui-infinite-scroll__tip"
        ],
        "variants": [],
        "states": [
          "is-disabled"
        ],
        "props": [
          {
            "name": "disabled",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "loading",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "finished",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "threshold",
            "required": false,
            "type": "number"
          },
          {
            "name": "loadingText",
            "required": false,
            "type": "string"
          },
          {
            "name": "finishedText",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "calendar",
        "zh": "日历",
        "en": "Calendar",
        "exports": [
          "MiCalendar"
        ],
        "klass": "materin-ui-calendar",
        "purpose": {
          "zh": "日历：月视图网格，可选中日期，可禁用早于今天",
          "en": "Calendar: month grid, selectable dates, optional past disabling"
        },
        "parts": [
          "materin-ui-calendar__cell",
          "materin-ui-calendar__grid",
          "materin-ui-calendar__head",
          "materin-ui-calendar__month",
          "materin-ui-calendar__nav",
          "materin-ui-calendar__weekday"
        ],
        "variants": [],
        "states": [
          "is-selected",
          "is-today",
          "is-outside",
          "is-disabled"
        ],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "string"
          },
          {
            "name": "disablePast",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "timeline",
        "zh": "时间线",
        "en": "Timeline",
        "exports": [
          "MiTimeline"
        ],
        "klass": "materin-ui-timeline",
        "purpose": {
          "zh": "时间线：节点 + 时间戳 + 内容，节点可换色",
          "en": "Timeline: nodes with timestamps and content, colourable nodes"
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "items",
            "required": false,
            "type": "unknown[]"
          },
          {
            "name": "timestamp",
            "required": false,
            "type": "string"
          },
          {
            "name": "color",
            "required": false,
            "type": "'primary' | 'success' | 'warning' | 'error' | 'muted'"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "timeline-item",
        "zh": "时间线项",
        "en": "Timeline item",
        "exports": [
          "MiTimelineItem"
        ],
        "klass": "materin-ui-timeline-item",
        "purpose": {
          "zh": "时间线的单项（节点 + 时间戳 + 内容），一般放在 MiTimeline 里用",
          "en": "A single timeline entry (node, timestamp and content), normally inside a MiTimeline"
        },
        "parts": [
          "materin-ui-timeline-item__node",
          "materin-ui-timeline-item__body",
          "materin-ui-timeline-item__timestamp",
          "materin-ui-timeline-item__content"
        ],
        "variants": [
          "--success",
          "--warning",
          "--error",
          "--muted"
        ],
        "states": [],
        "props": [],
        "hasDemo": false
      },
      {
        "kebab": "tree",
        "zh": "树",
        "en": "Tree",
        "exports": [
          "MiTree"
        ],
        "klass": "materin-ui-tree",
        "purpose": {
          "zh": "树：层级勾选、展开收起、受控可用",
          "en": "Tree: hierarchical checks, expand and collapse, works controlled"
        },
        "parts": [
          "materin-ui-tree__row",
          "materin-ui-tree__indent",
          "materin-ui-tree__expand",
          "materin-ui-tree__checkbox",
          "materin-ui-tree__label",
          "materin-ui-tree__children"
        ],
        "variants": [],
        "states": [
          "is-expanded"
        ],
        "props": [
          {
            "name": "nodes",
            "required": false,
            "type": "TreeNode[]"
          },
          {
            "name": "checkable",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "modelValue",
            "required": false,
            "type": "(string | number)[]"
          },
          {
            "name": "defaultExpandedKeys",
            "required": false,
            "type": "(string | number)[]"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "watermark",
        "zh": "水印",
        "en": "Watermark",
        "exports": [
          "MiWatermark"
        ],
        "klass": "materin-ui-watermark",
        "purpose": {
          "zh": "水印：canvas 纹理平铺，被删改自动重画",
          "en": "Watermark: tiled canvas texture that redraws if tampered"
        },
        "parts": [
          "materin-ui-watermark__layer"
        ],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "content",
            "required": false,
            "type": "string"
          },
          {
            "name": "color",
            "required": false,
            "type": "string"
          },
          {
            "name": "fontSize",
            "required": false,
            "type": "number"
          },
          {
            "name": "rotate",
            "required": false,
            "type": "number"
          },
          {
            "name": "gap",
            "required": false,
            "type": "{ x: number; y: number"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "empty",
        "zh": "空状态",
        "en": "Empty",
        "exports": [
          "MiEmpty"
        ],
        "klass": "materin-ui-empty",
        "purpose": {
          "zh": "空状态：默认插画 + 说明 + 底部操作，可换图",
          "en": "Empty state: default illustration, description and bottom actions, image replaceable"
        },
        "parts": [
          "materin-ui-empty__image",
          "materin-ui-empty__description",
          "materin-ui-empty__bottom"
        ],
        "variants": [
          "--sm",
          "--md",
          "--lg"
        ],
        "states": [],
        "props": [
          {
            "name": "description",
            "required": false,
            "type": "string"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg'"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "statistic",
        "zh": "统计数值",
        "en": "Statistic",
        "exports": [
          "MiStatistic"
        ],
        "klass": "materin-ui-statistic",
        "purpose": {
          "zh": "统计数值：大数字 + 标题 + 前后缀，千分位与小数位可控",
          "en": "Statistic: a big number with title, prefix and suffix, grouping and precision"
        },
        "parts": [
          "materin-ui-statistic__title",
          "materin-ui-statistic__value",
          "materin-ui-statistic__prefix",
          "materin-ui-statistic__suffix",
          "materin-ui-statistic__number"
        ],
        "variants": [
          "--success",
          "--danger"
        ],
        "states": [],
        "props": [
          {
            "name": "title",
            "required": false,
            "type": "string"
          },
          {
            "name": "value",
            "required": false,
            "type": "number | string"
          },
          {
            "name": "grouped",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "precision",
            "required": false,
            "type": "number"
          },
          {
            "name": "prefix",
            "required": false,
            "type": "string"
          },
          {
            "name": "suffix",
            "required": false,
            "type": "string"
          },
          {
            "name": "status",
            "required": false,
            "type": "'default' | 'success' | 'error'"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "table",
        "zh": "表格",
        "en": "Table",
        "exports": [
          "MiTable"
        ],
        "klass": "materin-ui-table",
        "purpose": {
          "zh": "表格：列配置驱动，斑马纹、边框、空态",
          "en": "Table: column-driven, striped, bordered, empty state"
        },
        "parts": [
          "materin-ui-table__body",
          "materin-ui-table__empty",
          "materin-ui-table__head",
          "materin-ui-table__wrap"
        ],
        "variants": [
          "--striped",
          "--bordered"
        ],
        "states": [],
        "props": [
          {
            "name": "columns",
            "required": false,
            "type": "TableColumn[]"
          },
          {
            "name": "rows",
            "required": false,
            "type": "Record<string, unknown>[]"
          },
          {
            "name": "striped",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "bordered",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "emptyText",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "table-column",
        "zh": "表格列（配置型）",
        "en": "Table column",
        "exports": [
          "MiTableColumn"
        ],
        "klass": "materin-ui-table",
        "purpose": {
          "zh": "",
          "en": ""
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [],
        "hasDemo": false
      },
      {
        "kebab": "badge",
        "zh": "角标",
        "en": "Badge",
        "exports": [
          "MiBadge"
        ],
        "klass": "materin-ui-badge",
        "purpose": {
          "zh": "角标：数字（超上限显示 99+）、小红点、五种语义色",
          "en": "Badge: numbers (99+ over the max), status dot, five semantic colours"
        },
        "parts": [
          "materin-ui-badge__content",
          "materin-ui-badge__value"
        ],
        "variants": [
          "--primary",
          "--success",
          "--warning",
          "--danger",
          "--info",
          "--dot",
          "--standalone"
        ],
        "states": [],
        "props": [
          {
            "name": "value",
            "required": false,
            "type": "string | number"
          },
          {
            "name": "max",
            "required": false,
            "type": "number"
          },
          {
            "name": "isDot",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "hidden",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "type",
            "required": false,
            "type": "BadgeType"
          },
          {
            "name": "standalone",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "carousel",
        "zh": "轮播",
        "en": "Carousel",
        "exports": [
          "MiCarousel"
        ],
        "klass": "materin-ui-carousel",
        "purpose": {
          "zh": "轮播：自动播放、指示点、左右切换",
          "en": "Carousel: autoplay, indicators, prev and next"
        },
        "parts": [
          "materin-ui-carousel__indicator",
          "materin-ui-carousel__indicators",
          "materin-ui-carousel__nav",
          "materin-ui-carousel__nav--next",
          "materin-ui-carousel__nav--prev",
          "materin-ui-carousel__slide",
          "materin-ui-carousel__track"
        ],
        "variants": [],
        "states": [
          "is-active"
        ],
        "props": [
          {
            "name": "count",
            "required": false,
            "type": "number"
          },
          {
            "name": "interval",
            "required": false,
            "type": "number"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "progress",
        "zh": "进度条",
        "en": "Progress",
        "exports": [
          "MiProgress"
        ],
        "klass": "materin-ui-progress",
        "purpose": {
          "zh": "进度条：线性与环形两种，四种状态色，支持不确定进度",
          "en": "Progress: line or ring, four status colours, indeterminate mode"
        },
        "parts": [
          "materin-ui-progress__runway",
          "materin-ui-progress__bar",
          "materin-ui-progress__text",
          "materin-ui-progress__ring-runway",
          "materin-ui-progress__ring-bar",
          "materin-ui-progress__ring"
        ],
        "variants": [
          "--sm",
          "--lg",
          "--indeterminate"
        ],
        "states": [],
        "props": [
          {
            "name": "percent",
            "required": false,
            "type": "number"
          },
          {
            "name": "type",
            "required": false,
            "type": "'line' | 'ring'"
          },
          {
            "name": "status",
            "required": false,
            "type": "'primary' | 'success' | 'warning' | 'error'"
          },
          {
            "name": "size",
            "required": false,
            "type": "'sm' | 'md' | 'lg'"
          },
          {
            "name": "showText",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "indeterminate",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "ringSize",
            "required": false,
            "type": "number"
          }
        ],
        "hasDemo": true
      },
      {
        "kebab": "skeleton-item",
        "zh": "骨架块",
        "en": "Skeleton item",
        "exports": [
          "MiSkeletonItem"
        ],
        "klass": "materin-ui-skeleton-item",
        "purpose": {
          "zh": "骨架块：文本 / 标题 / 段落 / 按钮 / 图片 / 圆形 / 矩形",
          "en": "Skeleton block: text, heading, paragraph, button, image, circle or rectangle"
        },
        "parts": [],
        "variants": [
          "--text",
          "--caption",
          "--h1",
          "--h3",
          "--h5",
          "--paragraph",
          "--button",
          "--image",
          "--circle",
          "--rect"
        ],
        "states": [],
        "props": [
          {
            "name": "variant",
            "required": false,
            "type": "SkeletonVariant"
          },
          {
            "name": "width",
            "required": false,
            "type": "string | number"
          },
          {
            "name": "height",
            "required": false,
            "type": "string | number"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "skeleton",
        "zh": "骨架屏",
        "en": "Skeleton",
        "exports": [
          "MiSkeleton"
        ],
        "klass": "materin-ui-skeleton",
        "purpose": {
          "zh": "骨架屏：加载中占位，非加载态渲染真实内容",
          "en": "Skeleton: placeholder while loading, real content when not"
        },
        "parts": [
          "materin-ui-skeleton__items"
        ],
        "variants": [
          "--animated"
        ],
        "states": [],
        "props": [
          {
            "name": "rows",
            "required": false,
            "type": "number"
          },
          {
            "name": "loading",
            "required": false,
            "type": "boolean"
          },
          {
            "name": "animated",
            "required": false,
            "type": "boolean"
          }
        ],
        "hasDemo": false
      }
    ]
  },
  {
    "id": "nav",
    "zh": "导航",
    "en": "Navigation",
    "components": [
      {
        "kebab": "dropdown",
        "zh": "下拉菜单",
        "en": "Dropdown",
        "exports": [
          "MiDropdown"
        ],
        "klass": "materin-ui-dropdown",
        "purpose": {
          "zh": "下拉菜单：点击弹出命令列表，点外关闭",
          "en": "Dropdown: click-triggered command list, closes on outside click"
        },
        "parts": [
          "materin-ui-dropdown__button",
          "materin-ui-dropdown__menu",
          "materin-ui-dropdown__option",
          "materin-ui-dropdown__trigger"
        ],
        "variants": [
          "--top",
          "--bottom"
        ],
        "states": [
          "is-open"
        ],
        "props": [
          {
            "name": "title",
            "required": false,
            "type": "string"
          },
          {
            "name": "options",
            "required": false,
            "type": "DropdownOption[]"
          },
          {
            "name": "placement",
            "required": false,
            "type": "'top' | 'bottom'"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "backtop",
        "zh": "回到顶部",
        "en": "Back to top",
        "exports": [
          "MiBacktop"
        ],
        "klass": "materin-ui-backtop__button",
        "purpose": {
          "zh": "回到顶部：滚动过阈值浮现",
          "en": "Back to top: appears past a scroll threshold"
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "threshold",
            "required": false,
            "type": "number"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "affix",
        "zh": "固钉",
        "en": "Affix",
        "exports": [
          "MiAffix"
        ],
        "klass": "materin-ui-affix",
        "purpose": {
          "zh": "固钉：滚动越过阈值后固定在视口",
          "en": "Affix: pins to the viewport once scrolled past"
        },
        "parts": [
          "materin-ui-affix__inner"
        ],
        "variants": [],
        "states": [
          "is-fixed"
        ],
        "props": [
          {
            "name": "offset",
            "required": false,
            "type": "number"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "tabs",
        "zh": "标签页",
        "en": "Tabs",
        "exports": [
          "MiTabs"
        ],
        "klass": "materin-ui-tabs",
        "purpose": {
          "zh": "标签页：滑动切换，受控可用",
          "en": "Tabs: switching panes, works controlled"
        },
        "parts": [
          "materin-ui-tabs__list",
          "materin-ui-tabs__tab",
          "materin-ui-tabs__panels",
          "materin-ui-tabs__panel"
        ],
        "variants": [],
        "states": [
          "is-active"
        ],
        "props": [
          {
            "name": "modelValue",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "steps",
        "zh": "步骤条",
        "en": "Steps",
        "exports": [
          "MiSteps"
        ],
        "klass": "materin-ui-steps",
        "purpose": {
          "zh": "步骤条：横向流程，完成/进行/等待三态",
          "en": "Steps: horizontal flow with done, current and waiting states"
        },
        "parts": [
          "materin-ui-steps__item",
          "materin-ui-steps__index",
          "materin-ui-steps__title",
          "materin-ui-steps__connector"
        ],
        "variants": [],
        "states": [
          "is-done",
          "is-current"
        ],
        "props": [
          {
            "name": "steps",
            "required": false,
            "type": "StepDef[]"
          },
          {
            "name": "current",
            "required": false,
            "type": "number"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "menu",
        "zh": "菜单",
        "en": "Menu",
        "exports": [
          "MiMenu",
          "MiMenuItem",
          "MiMenuGroup",
          "MiMenuSub"
        ],
        "klass": "materin-ui-menu",
        "purpose": {
          "zh": "菜单：垂直/水平、分组与子级、受控选中",
          "en": "Menu: vertical or horizontal, groups and submenus, controlled selection"
        },
        "parts": [
          "materin-ui-menu__group",
          "materin-ui-menu__group-title",
          "materin-ui-menu__item",
          "materin-ui-menu__sub",
          "materin-ui-menu__sub-wrap"
        ],
        "variants": [
          "--horizontal"
        ],
        "states": [
          "is-active",
          "is-open"
        ],
        "props": [
          {
            "name": "direction",
            "required": false,
            "type": "'vertical' | 'horizontal'"
          },
          {
            "name": "modelValue",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "anchor",
        "zh": "锚点",
        "en": "Anchor",
        "exports": [
          "MiAnchor"
        ],
        "klass": "materin-ui-anchor",
        "purpose": {
          "zh": "锚点：滚动监听高亮当前区块",
          "en": "Anchor: scroll-spy highlighting of the current section"
        },
        "parts": [
          "materin-ui-anchor__link"
        ],
        "variants": [],
        "states": [
          "is-active"
        ],
        "props": [
          {
            "name": "links",
            "required": false,
            "type": "AnchorLink[]"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "breadcrumb",
        "zh": "面包屑",
        "en": "Breadcrumb",
        "exports": [
          "MiBreadcrumb"
        ],
        "klass": "materin-ui-breadcrumb",
        "purpose": {
          "zh": "面包屑：层级路径与分隔符",
          "en": "Breadcrumb: trail with separators"
        },
        "parts": [
          "materin-ui-breadcrumb__item",
          "materin-ui-breadcrumb__sep"
        ],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "crumbs",
            "required": false,
            "type": "Crumb[]"
          }
        ],
        "hasDemo": false
      }
    ]
  },
  {
    "id": "series",
    "zh": "本系列",
    "en": "Series",
    "components": [
      {
        "kebab": "method-tag",
        "zh": "HTTP 方法徽标",
        "en": "Method tag",
        "exports": [
          "MiMethodTag"
        ],
        "klass": "materin-ui-method-tag",
        "purpose": {
          "zh": "HTTP 方法徽标：GET/POST/PUT/PATCH/DELETE 各自配色",
          "en": "HTTP method badge: GET, POST, PUT, PATCH, DELETE colour-coded"
        },
        "parts": [],
        "variants": [
          "--get",
          "--post",
          "--put",
          "--patch",
          "--delete"
        ],
        "states": [],
        "props": [
          {
            "name": "method",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "copy",
        "zh": "复制按钮",
        "en": "Copy",
        "exports": [
          "MiCopy"
        ],
        "klass": "materin-ui-copy",
        "purpose": {
          "zh": "复制按钮：点一下复制文本并给反馈",
          "en": "Copy: copies text with feedback on click"
        },
        "parts": [
          "materin-ui-copy__button",
          "materin-ui-copy__feedback"
        ],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "text",
            "required": true,
            "type": "string"
          },
          {
            "name": "copiedText",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "glass-panel",
        "zh": "毛玻璃面板",
        "en": "Glass panel",
        "exports": [
          "MiGlassPanel"
        ],
        "klass": "materin-ui-glass-panel",
        "purpose": {
          "zh": "毛玻璃面板：透明令牌驱动，自动降级",
          "en": "Glass panel: token-driven translucency with automatic fallback"
        },
        "parts": [],
        "variants": [
          "--normal",
          "--strong",
          "--subtle"
        ],
        "states": [],
        "props": [
          {
            "name": "strength",
            "required": false,
            "type": "'strong' | 'normal' | 'subtle'"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "status-dot",
        "zh": "状态点",
        "en": "Status dot",
        "exports": [
          "MiStatusDot"
        ],
        "klass": "materin-ui-status-dot",
        "purpose": {
          "zh": "状态点：ok/warn/error/info 四色小圆点",
          "en": "Status dot: four-colour dot for ok, warn, error, info"
        },
        "parts": [
          "materin-ui-status-dot__pulse"
        ],
        "variants": [
          "--ok",
          "--warn",
          "--error",
          "--info"
        ],
        "states": [],
        "props": [
          {
            "name": "status",
            "required": false,
            "type": "'ok' | 'warn' | 'error' | 'info'"
          }
        ],
        "hasDemo": false
      }
    ]
  },
  {
    "id": "system",
    "zh": "系统",
    "en": "System",
    "components": [
      {
        "kebab": "scrollbar",
        "zh": "滚动条",
        "en": "Scrollbar",
        "exports": [
          "MiScrollbar"
        ],
        "klass": "materin-ui-scrollbar",
        "purpose": {
          "zh": "滚动条：统一样式的滚动容器",
          "en": "Scrollbar: a scroll container with the house style"
        },
        "parts": [
          "materin-ui-scrollbar__view"
        ],
        "variants": [
          "--thin"
        ],
        "states": [],
        "props": [
          {
            "name": "variant",
            "required": false,
            "type": "'default' | 'thin'"
          },
          {
            "name": "maxHeight",
            "required": false,
            "type": "string"
          }
        ],
        "hasDemo": false
      },
      {
        "kebab": "config-provider",
        "zh": "配置注入",
        "en": "Config provider",
        "exports": [
          "MiConfigProvider"
        ],
        "klass": "materin-ui-config-provider",
        "purpose": {
          "zh": "配置注入：向子树下发命名空间主题",
          "en": "Config provider: injects namespace theming down the tree"
        },
        "parts": [],
        "variants": [],
        "states": [],
        "props": [
          {
            "name": "theme",
            "required": false,
            "type": "'dark' | 'light' | 'auto'"
          }
        ],
        "hasDemo": false
      }
    ]
  }
]
