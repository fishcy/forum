<template>
    <ElForm :model="registerData" ref="formRef">
        <ElFormItem>
            <BaseInput class="email-input" placeholder="请输入邮箱" v-model="registerData.email" />
        </ElFormItem>
        <ElFormItem>
            <BaseInput
                class="phone-input"
                placeholder="请输入手机号"
                v-model="registerData.phone"
            />
        </ElFormItem>
        <ElFormItem>
            <BaseInput
                class="password-input"
                type="password"
                placeholder="请输入密码"
                v-model="registerData.password"
                show-password
            />
        </ElFormItem>
        <ElFormItem>
            <BaseInput
                class="confirm-password-input"
                type="password"
                placeholder="请再输入一次密码"
                v-model="registerData.confirmPassword"
                show-password
            />
        </ElFormItem>
        <ElFormItem>
            <BaseButton class="register-button" @click="submitForm">注 册</BaseButton>
        </ElFormItem>
    </ElForm>
</template>

<script setup lang="ts">
import BaseInput from '../base/BaseInput.vue'
import BaseButton from '../base/BaseButton.vue'
import { ref, watchEffect } from 'vue'
import { checkEmail, checkPhone, checkPassword, confirmPasswordAgain } from '@/utils/check'
import { register } from '@/api'

const registerData = ref({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
})

const submitForm = () => {
    register({
        email: registerData.value.email,
        phone: registerData.value.phone,
        password: registerData.value.password
    })
}
</script>

<style lang="scss" scoped>
.register-button {
    width: 100%;
}
</style>
