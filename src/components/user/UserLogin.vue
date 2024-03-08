<template>
    <ElForm :model="loginData" ref="formRef" :rules="rules" class="login-form">
        <ElFormItem prop="account">
            <ElInput v-model="loginData.account" placeholder="请输入手机号或邮箱" />
        </ElFormItem>
        <ElFormItem prop="password">
            <ElInput
                v-model="loginData.password"
                type="password"
                show-password
                placeholder="请输入密码"
            />
        </ElFormItem>
        <ElFormItem prop="captcha" class="captcha-wrapper">
            <ElInput class="captcha-input" v-model="loginData.captcha" placeholder="请输入验证码" />
            <div class="svg-captcha" @click="getNewCaptcha">
                <div v-if="svgCaptcha" v-html="svgCaptcha"></div>
                <div v-else>点击获取验证码</div>
            </div>
        </ElFormItem>
        <ElFormItem>
            <ElButton @click="submitForm(formRef)" class="submit">登录</ElButton>
        </ElFormItem>
    </ElForm>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { login, getCaptcha } from '@/api'
import { checkEmail, checkPhone } from '@/utils/check'
import type { AxiosResponse } from 'axios'
import { handleLoginSuccess } from '@/utils/user'
import { useRouter } from 'vue-router'

const emit = defineEmits(['loginSuccess'])

const router = useRouter()

const email = ref('')
const phone = ref('')

// 登录表单的数据
const loginData = ref({
    account: '',
    password: '',
    captcha: ''
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

const validateCaptcha = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('验证码不能为空'))
    }
    callback()
}

// 检验规则
const rules = ref<FormRules<typeof loginData>>({
    account: [{ validator: validateAccount, trigger: 'change' }],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }],
    captcha: [{ validator: validateCaptcha, trigger: 'blur' }]
})

// 表单实例
const formRef = ref<FormInstance>()

const userLogin = () => {
    let _resolve: any, _reject: any
    const handleMsg = (res: AxiosResponse) => {
        if (res.data.msg === '成功') {
            _resolve(res)
        } else {
            ElMessage({
                type: 'warning',
                message: res.data.msg,
                grouping: true
            })
            _reject()
        }
    }

    return new Promise((resolve, reject) => {
        _resolve = resolve
        _reject = reject
        if (email.value)
            login({
                email: email.value,
                password: loginData.value.password,
                captcha: loginData.value.captcha
            }).then(handleMsg, reject)
        if (phone.value)
            login({
                phone: phone.value,
                password: loginData.value.password,
                captcha: loginData.value.captcha
            }).then(handleMsg, reject)
    })
}

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            userLogin()
                .then(() => {
                    // 登录成功后，隐藏 登录 / 注册 组件
                    emit('loginSuccess')
                    handleLoginSuccess(router)
                })
                .catch((err) => {})
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
.login-form {
    // margin-top: 50px;

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

    .submit {
        width: 100%;
    }
}
</style>
