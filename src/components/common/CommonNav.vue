<template>
    <div class="nav">
        <div class="nav-wrapper">
            <!-- 设置主题颜色 -->
            <div class="nav-setting">
                <span class="skin">
                    <font-awesome-icon :icon="['fas', 'shirt']" />
                    <ElColorPicker
                        v-model="themeColor"
                        show-alpha
                        :predefine="predefineColors"
                        size="small"
                    ></ElColorPicker>
                </span>
            </div>
            <BaseSearchBar />
            <div class="nav-button-wrapper" v-show="!isLogin">
                <ElButton class="button" @click="loginOrRegisterVisible = true"
                    >登录 / 注册</ElButton
                >
            </div>
            <div class="nav-user-wrapper" v-show="isLogin">
                <UserInfo :avatar="getAvatar()" :username="String(getUserName())"></UserInfo>
            </div>
            <div class="publish-button">
                <RouterLink to="/create">
                    <ElButton class="button">发布</ElButton>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseSearchBar from '../base/BaseSearchBar.vue'
import UserInfo from '../user/UserInfo.vue'
import { useUserInfoStore, useCommunicationStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { postThemeColor } from '@/api/index'

const { getAvatar, getUserName } = useUserInfoStore()
const { isLogin, themeColor } = storeToRefs(useUserInfoStore())

// 颜色选择器
const predefineColors = ref([
    'rgb(50, 202, 153)',
    'rgb(0, 0, 0)',
    'rgb(38, 38, 38)',
    'rgb(89, 89, 89)',
    'rgb(140, 140, 140)',
    'rgb(191, 191, 191)',
    'rgb(217, 217, 217)',
    'rgb(245, 245, 245)',
    'rgb(250, 250, 250)'
])

// 深化颜色
const darkedColor = (rgb: string, percentage: number = 20) => {
    const rgbaArr = rgb
        .replace(/[rgba(|)]/g, '')
        .split(', ')
        .map((val) => parseFloat(val))
    for (let i = 0; i < 3; ++i) {
        rgbaArr[i] = Math.round(rgbaArr[i] * (1 - percentage / 100))
    }
    if (!rgbaArr[3]) rgbaArr[3] = 1
    return `rgba(${rgbaArr.join(', ')})`
}

// 浅化颜色
const lightenColor = (rgb: string, percentage: number = 80) => {
    const rgbaArr = rgb
        .replace(/[rgba(|)]/g, '')
        .split(', ')
        .map((val) => parseFloat(val))
    for (let i = 0; i < 3; ++i) {
        rgbaArr[i] = Math.round(rgbaArr[i] + (255 - rgbaArr[i]) * (percentage / 100))
    }
    if (!rgbaArr[3]) rgbaArr[3] = 1
    return `rgba(${rgbaArr.join(', ')})`
}

// 监听主题颜色的变化，变化时更新后端数据
watch(
    themeColor,
    (newThemeColor) => {
        postThemeColor({
            themeColor: newThemeColor
        })
        // 修改:root上的css变量
        document.documentElement.style.setProperty('--theme-color', newThemeColor)
        document.documentElement.style.setProperty(
            '--theme-color-hover',
            darkedColor(newThemeColor)
        )
        document.documentElement.style.setProperty(
            '--theme-color-active',
            lightenColor(newThemeColor, 90)
        )
        document.documentElement.style.setProperty(
            '--theme-bg-color-1',
            `linear-gradient(53deg, ${newThemeColor}, 90%, #fff)`
        )
        document.documentElement.style.setProperty(
            '--theme-bg-color-2',
            `linear-gradient(180deg, ${lightenColor(newThemeColor)}, 5%, #f8f8f8)`
        )
    },
    {
        immediate: true
    }
)

// 登录 / 注册 弹窗是否可见
const { loginOrRegisterVisible } = storeToRefs(useCommunicationStore())
</script>

<style lang="scss" scoped>
.nav {
    width: 100%;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 0 0 0 transparent, 0 0 0 0 transparent, 0 1px 4px 0 rgba(0, 0, 0, 0.02),
        0 2px 12px 0 rgba(0, 0, 0, 0.04), 0 2px 6px 0 rgba(0, 0, 0, 0.02);
    position: sticky;
    position: -webkit-sticky; /* Safari */
    top: 0;
    z-index: 1000;

    .nav-wrapper {
        height: 100%;
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .nav-setting {
            flex: 0.5;
            display: flex;
            align-items: center;
            position: relative;
            .skin {
                font-size: 20px;
                margin: 0 20px;
                cursor: pointer;
                position: relative;
                color: var(--theme-color);
                &:hover {
                    color: var(--theme-color-hover);
                }
            }
            &:deep(.el-color-picker) {
                position: absolute;
                left: 0;
                top: 5px;
                opacity: 0;
            }
        }
        .nav-button-wrapper {
            flex: 0.5;
            display: flex;
            justify-content: center;
            & .button {
                width: px2rem(90);
                height: 36px;
                margin: 0 10px;
            }
        }
        .nav-user-wrapper {
            flex: 0.5;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .publish-button {
            .button {
                width: 80px;
                height: 36px;
                margin: 0 10px;
            }
        }
    }
}

@media screen and (max-width: $phone-max-width) {
}
</style>
