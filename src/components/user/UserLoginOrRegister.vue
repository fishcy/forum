<template>
    <ElDialog v-model="loginOrRegisterVisible">
        <div class="login-register-card">
            <ul>
                <li>登录</li>
                <li>注册</li>
            </ul>
            <component :is="UserLogin"></component>
        </div>
    </ElDialog>
</template>

<script setup lang="ts">
import UserLogin from './UserLogin.vue'
import { useCommunicationStore } from '@/stores'
import { storeToRefs } from 'pinia'

const { loginOrRegisterVisible } = storeToRefs(useCommunicationStore())
</script>

<style lang="scss" scoped></style>
