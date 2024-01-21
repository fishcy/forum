<template>
    <div class="dialog-wrapper">
        <ElDialog v-model="loginOrRegisterVisible" width="350px" class="base-dialog">
            <div class="login-register-card">
                <ul class="card-nav" @click="switchComponent">
                    <li class="item" :class="{ isActive: showComponent === UserLogin }">登录</li>
                    <li class="item" :class="{ isActive: showComponent === UserRegister }">注册</li>
                </ul>
                <component :is="showComponent"></component>
            </div>
        </ElDialog>
    </div>
</template>

<script setup lang="ts">
import UserLogin from './UserLogin.vue'
import UserRegister from './UserRegister.vue'
import { useCommunicationStore } from '@/stores'
import { storeToRefs } from 'pinia'
import type { Component } from 'vue'
import { shallowRef } from 'vue'

// 是否展示 登录 / 注册 组件
const { loginOrRegisterVisible } = storeToRefs(useCommunicationStore())

// 展示哪个组件
const showComponent = shallowRef<Component>(UserLogin)

// 点击事件，切换组件
const switchComponent = (event: MouseEvent) => {
    const innerText = (event.target as HTMLElement).innerText
    if (innerText === '登录') {
        showComponent.value = UserLogin
    } else if (innerText === '注册') {
        showComponent.value = UserRegister
    }
}
</script>

<style lang="scss" scoped>
.dialog-wrapper {
    .base-dialog {
        .login-register-card {
            width: 100%;
            height: 350px;
            .card-nav {
                display: flex;
                padding: 20px 5px;
                .item {
                    cursor: pointer;
                    margin-right: 20px;
                    font-size: 18px;
                    font-weight: 500;
                    color: #999;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    &::after {
                        content: '';
                        border-radius: 2px;
                        height: 4px;
                        width: 100%;
                    }
                }

                .isActive {
                    color: #333;

                    &::after {
                        background-image: var(--theme-bg-color-1);
                    }
                }
            }
        }
    }
    &:deep(.el-dialog__headerbtn:hover .el-dialog__close) {
        color: var(--theme-color);
    }

    &:deep(.el-dialog) {
        border-radius: 12px;
    }

    &:deep(.el-dialog__body){
        padding-left: 40px;
        padding-right: 40px;
        padding-top: 0;
    }
}
</style>
