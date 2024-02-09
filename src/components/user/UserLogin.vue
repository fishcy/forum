<template>
    <ElForm :model="loginData" ref="formRef" :rules="rules" class="login-form">
        <ElFormItem prop="account">
            <ElInput v-model="loginData.account" placeholder="请输入手机号或邮箱"></ElInput>
        </ElFormItem>
        <ElFormItem prop="password">
            <ElInput
                v-model="loginData.password"
                type="password"
                show-password
                placeholder="请输入密码"
            ></ElInput>
        </ElFormItem>
        <ElFormItem>
            <ElButton @click="submitForm(formRef)" class="submit">登录</ElButton>
        </ElFormItem>
    </ElForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/api'
import { checkEmail, checkPhone } from '@/utils/check'

import { useCommunicationStore } from '@/stores'
import { storeToRefs } from 'pinia'

// 控制 登录 / 注册 的展示
const { loginOrRegisterVisible } = storeToRefs(useCommunicationStore())

const email = ref('')
const phone = ref('')

const userLogin = () => {
    return new Promise((resolve, reject) => {
        if (email.value)
            login({ email: email.value, password: loginData.value.password }).then(resolve, reject)
        if (phone.value)
            login({ phone: phone.value, password: loginData.value.password }).then(resolve, reject)
    })
}

// 表单数据接口
interface RuleForm {
    account: string
    password: string
}

// 登录表单的数据
const loginData = ref<RuleForm>({
    account: '',
    password: ''
})

const validateAccount = (rule: any, value: any, callback: any) => {
    if (value === '') callback('请输入手机号或邮箱')
    else {
        email.value = checkEmail(loginData.value.account) ? loginData.value.account : ''
        phone.value = checkPhone(loginData.value.account) ? loginData.value.account : ''
        if (!email.value && !phone.value) {
            callback('请输入正确的手机号或邮箱')
        }
        callback()
    }
}

// 检验规则
const rules = ref<FormRules<RuleForm>>({
    account: [{ validator: validateAccount, trigger: 'change' }],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }]
})

// 表单实例
const formRef = ref<FormInstance>()

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            userLogin().then(() => {
                // 登录成功后，隐藏 登录 / 注册 组件
                loginOrRegisterVisible.value = false
            })
        } else {
            return false
        }
    })
}
</script>

<style lang="scss" scoped>
.login-form {
    margin-top: 50px;
    .submit {
        width: 100%;
    }
}
</style>
