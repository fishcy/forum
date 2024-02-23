<template>
    <ElForm :model="registerData" ref="formRef" :rules="rules" class="register-form">
        <ElFormItem prop="email">
            <ElInput class="email-input" placeholder="请输入邮箱" v-model="registerData.email" />
        </ElFormItem>
        <ElFormItem prop="phone">
            <ElInput class="phone-input" placeholder="请输入手机号" v-model="registerData.phone" />
        </ElFormItem>
        <ElFormItem prop="passowrd">
            <ElInput
                class="password-input"
                type="password"
                placeholder="请输入密码"
                v-model="registerData.password"
                show-password
            />
        </ElFormItem>
        <ElFormItem prop="confirmPassword">
            <ElInput
                class="confirm-password-input"
                type="password"
                placeholder="请再输入一次密码"
                v-model="registerData.confirmPassword"
                show-password
            />
        </ElFormItem>
        <ElFormItem prop="captcha" class="captcha-wrapper">
            <ElInput
                class="captcha-input"
                placeholder="请输入验证码"
                v-model="registerData.captcha"
            />
            <div class="svg-captcha" @click="getNewCaptcha">
                <div v-if="svgCaptcha" v-html="svgCaptcha"></div>
                <div v-else>点击获取验证码</div>
            </div>
        </ElFormItem>
        <ElFormItem>
            <ElButton class="register-button" @click="submitForm(formRef)">注 册</ElButton>
        </ElFormItem>
    </ElForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { checkEmail, checkPhone, checkPassword, confirmPasswordAgain } from '@/utils/check'
import { getCaptcha, register } from '@/api'

import type { FormInstance, FormRules } from 'element-plus'
import { onBeforeMount } from 'vue'

const formRef = ref<FormInstance>()

// 注册数据
const registerData = ref({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    captcha: ''
})

// 验证邮箱
const validateEmail = (rule: any, value: any, callback: any) => {
    if (!checkEmail(value)) {
        return callback(new Error('邮箱不正确'))
    }
    callback()
}

// 验证手机号
const validatePhone = (rule: any, value: any, callback: any) => {
    if (!checkPhone(value)) {
        return callback(new Error('手机号不正确'))
    }
    callback()
}

const validatePassword = (rule: any, value: any, callback: any) => {
    if (!checkPassword(value)) {
        return callback(new Error('密码长度不能少于8位'))
    }
    callback()
}

const validatePasswordAgain = (rule: any, value: any, callback: any) => {
    if (!confirmPasswordAgain(registerData.value.password, value)) {
        return callback(new Error('密码不一致'))
    }
    callback()
}

const validateCaptcha = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('验证码不能为空'))
    }
    callback()
}

// 验证规则
const rules = ref<FormRules<typeof registerData>>({
    email: [{ validator: validateEmail, trigger: 'blur' }],
    phone: [{ validator: validatePhone, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
    confirmPassword: [{ validator: validatePasswordAgain, trigger: 'blur' }],
    captcha: [{ validator: validateCaptcha, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            register({
                email: registerData.value.email,
                phone: registerData.value.phone,
                password: registerData.value.password,
                captcha: registerData.value.captcha
            }).then((res) => {
                if (res.data.msg !== '成功') {
                    ElMessage({
                        type: 'warning',
                        message: res.data.msg,
                        grouping: true
                    })
                }
            })
        } else {
            return false
        }
    })
}

const svgCaptcha = ref('')

const getNewCaptcha = () => {
    getCaptcha().then((res) => {
        svgCaptcha.value = res.data.data['svg-captcha']
    })
}

onBeforeMount(getNewCaptcha)
</script>

<style lang="scss" scoped>
.register-form {
    &:deep(.el-form-item) {
        margin-bottom: 25px;
    }
    &:deep(.el-form-item:last-child) {
        margin-bottom: 0;
    }

    .captcha-wrapper {
        .captcha-input {
            flex: 1;
        }

        .svg-captcha {
            display: flex;
            align-items: center;
            width: 100px;
            height: 40px;
            margin-left: 20px;
            cursor: pointer;
        }
    }

    .register-button {
        width: 100%;
    }
}
</style>
