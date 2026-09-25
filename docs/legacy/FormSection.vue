<template>
  <section id="form" class="materin-docs-section">
    <div class="materin-docs-wrap">
      <div class="materin-docs-section__head">
        <h2>{{ t('表单与输入控件', 'Form and input controls') }}</h2>
        <p>
          {{
            t(
              '下面这张表是真的在校验：名称必填且至少 2 个字、邮箱格式、方案必选、至少勾选一项功能、数值 1–10。点「提交」看错误定位，点「重置」回到初始值，「清空校验」只清错误。',
              'This form really validates: name required and at least two characters, email format, a plan must be chosen, at least one feature, and a number between 1 and 10. Press "Submit" to see the errors, "Reset" to restore the initial values, "Clear validation" to drop the messages only.'
            )
          }}
        </p>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">
          MiForm / MiFormItem / MiInputNumber / MiSelect / MiCheckbox / MiRadio / MiSwitch / MiSlider / MiRate
        </p>

        <MiForm
          ref="formRef"
          :model="model"
          :rules="rules"
          label-width="92px"
          style="max-width: 620px; width: 100%"
        >
          <MiFormItem :label="t('名称', 'Name')" prop="name" :hint="t('必填，至少 2 个字', 'Required, at least two characters')">
            <MiInput v-model="model.name" :placeholder="t('例如 Materin', 'for example Materin')" />
          </MiFormItem>

          <MiFormItem :label="t('邮箱', 'Email')" prop="email">
            <MiInput v-model="model.email" placeholder="name@example.com" clearable />
          </MiFormItem>

          <MiFormItem :label="t('方案', 'Plan')" prop="plan">
            <MiSelect v-model="model.plan" :placeholder="t('请选择方案', 'Pick a plan')">
              <MiOptionGroup :label="t('常规', 'Standard')">
                <MiOption value="free" :label="t('免费', 'Free')" />
                <MiOption value="pro" :label="t('专业', 'Pro')" />
              </MiOptionGroup>
              <MiOptionGroup :label="t('团队', 'Team')">
                <MiOption value="team" :label="t('团队版', 'Team')" />
                <MiOption value="enterprise" :label="t('企业版（联系销售）', 'Enterprise')" disabled />
              </MiOptionGroup>
            </MiSelect>
          </MiFormItem>

          <MiFormItem :label="t('多选', 'Multiple')" prop="features">
            <MiCheckboxGroup v-model="model.features">
              <MiCheckbox value="tags">{{ t('标签', 'Tags') }}</MiCheckbox>
              <MiCheckbox value="dark">{{ t('暗色主题', 'Dark theme') }}</MiCheckbox>
              <MiCheckbox value="export">{{ t('导出', 'Export') }}</MiCheckbox>
              <MiCheckbox value="api" disabled>{{ t('API（未开通）', 'API (locked)') }}</MiCheckbox>
            </MiCheckboxGroup>
          </MiFormItem>

          <MiFormItem :label="t('优先联系', 'Contact')" prop="contact">
            <MiRadioGroup v-model="model.contact">
              <MiRadio value="email" :label="t('邮件', 'Email')" />
              <MiRadio value="wechat" :label="t('微信', 'WeChat')" />
              <MiRadio value="phone" :label="t('电话', 'Phone')" />
            </MiRadioGroup>
          </MiFormItem>

          <MiFormItem :label="t('数量', 'Amount')" prop="amount">
            <MiSpace :size="16" wrap>
              <MiInputNumber v-model="model.amount" :min="1" :max="10" />
              <MiText size="sm" type="secondary">1 – 10，步进 1</MiText>
            </MiSpace>
          </MiFormItem>

          <MiFormItem :label="t('音量', 'Volume')" prop="volume">
            <MiSlider v-model="model.volume" :min="0" :max="100" :step="5" />
          </MiFormItem>

          <MiFormItem :label="t('评分', 'Rating')" prop="score">
            <MiRate v-model="model.score" :max="5" show-text />
          </MiFormItem>

          <MiFormItem :label="t('通知', 'Notify')" prop="notify">
            <MiSpace :size="12">
              <MiSwitch v-model="model.notify" :active-text="t('开', 'on')" :inactive-text="t('关', 'off')" />
              <MiText size="sm" type="secondary">{{ model.notify ? t('会发送邮件', 'will email you') : t('不打扰', 'stays quiet') }}</MiText>
            </MiSpace>
          </MiFormItem>

          <MiFormItem :label="''">
            <MiSpace :size="10" wrap>
              <MiButton type="primary" @click="submit">{{ t('提交', 'Submit') }}</MiButton>
              <MiButton type="secondary" @click="reset">{{ t('重置', 'Reset') }}</MiButton>
              <MiButton type="ghost" @click="clear">{{ t('清空校验', 'Clear validation') }}</MiButton>
            </MiSpace>
          </MiFormItem>
        </MiForm>

        <p v-if="status" class="materin-docs-demo__label" style="width: auto">{{ status }}</p>
      </div>

      <pre class="materin-docs-code"><code>{{ snippet }}</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  MiButton,
  MiCheckbox,
  MiCheckboxGroup,
  MiForm,
  MiFormItem,
  MiInput,
  MiInputNumber,
  MiOption,
  MiOptionGroup,
  MiRadio,
  MiRadioGroup,
  MiRate,
  MiSelect,
  MiSlider,
  MiSpace,
  MiSwitch,
  MiText,
  type FormRule
} from '@/materin-ui/index'

const props = defineProps<{ lang: 'zh' | 'en' }>()
const t = (zh: string, en: string) => (props.lang === 'zh' ? zh : en)

const formRef = ref<InstanceType<typeof MiForm>>()
const status = ref('')

const initial = {
  name: '',
  email: '',
  plan: null as string | null,
  features: ['tags'],
  contact: 'email',
  amount: 3,
  volume: 40,
  score: 4,
  notify: true
}

const model = ref({ ...initial })

const rules: Record<string, FormRule[]> = {
  name: [
    { required: true, message: '请填写名称' },
    { min: 2, message: '至少 2 个字' }
  ],
  email: [
    { required: true, message: '请填写邮箱' },
    { type: 'email', message: '邮箱格式不正确' }
  ],
  plan: [{ required: true, message: '请选择方案' }],
  features: [{ type: 'array', min: 1, message: '至少勾选一项' }],
  amount: [{ type: 'number', min: 1, max: 10, message: '数值需在 1–10 之间' }]
}

const submit = async () => {
  const ok = await formRef.value?.validate()
  status.value = ok ? t('✓ 校验通过，可以提交', '✓ Valid, ready to submit') : t('✗ 表单有错误，见字段下方红字', '✗ The form has errors — see the red text under the fields')
}

const reset = () => {
  formRef.value?.resetFields()
  status.value = t('已重置为初始值', 'Reset to the initial values')
}

const clear = () => {
  formRef.value?.clearValidate()
  status.value = t('只清空了错误提示', 'Messages cleared, values untouched')
}

const snippet = `const rules = {
  name:   [{ required: true, message: '请填写名称' },
           { min: 2, message: '至少 2 个字' }],
  email:  [{ required: true }, { type: 'email', message: '邮箱格式不正确' }],
  plan:   [{ required: true, message: '请选择方案' }],
  features: [{ type: 'array', min: 1, message: '至少勾选一项' }]
}

const ok = await formRef.value.validate()   // 全量校验
await formRef.value.validateField('email')  // 单字段
formRef.value.resetFields()                 // 重置
formRef.value.clearValidate()               // 只清提示`
</script>
