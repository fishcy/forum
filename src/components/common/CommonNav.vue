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
                <RouterLink to="/privateChat" class="chat">
                    <font-awesome-icon :icon="['far', 'envelope']" />
                </RouterLink>
            </div>
            <BaseSearchBar />
            <div class="nav-button-wrapper" v-show="!isLogin">
                <UserLoginOrRegister></UserLoginOrRegister>
            </div>
            <div class="nav-user-wrapper" v-show="isLogin">
                <UserInfo
                    :avatar="getAvatar()"
                    :username="String(getUserName())"
                    :user-id="getUserId()"
                ></UserInfo>
            </div>
            <div class="publish-button" v-if="isLogin">
                <RouterLink to="/create" target="_blank">
                    <ElButton class="button">发布</ElButton>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref, watch, onMounted } from 'vue'
import { patchThemeColor } from '@/api'
import { updateThemeColor } from '@/utils/updateThemeColor'

const { getAvatar, getUserName, getUserId } = useUserInfoStore()
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

// 监听主题颜色的变化，变化时更新后端数据
watch(themeColor, (newThemeColor) => {
    patchThemeColor({
        themeColor: newThemeColor
    }).catch((err) => {})
    // 修改:root上的css变量
    updateThemeColor(newThemeColor)
})

onMounted(() => {
    updateThemeColor(themeColor.value)
})
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
            padding: 0 20px;
            .skin {
                font-size: 20px;
                margin: 0 10px;
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

            .chat {
                font-size: 20px;
                margin: 0 10px;
                cursor: pointer;
                position: relative;
                color: var(--theme-color);
                &:hover {
                    color: var(--theme-color-hover);
                }
            }
        }
        .nav-button-wrapper {
            flex: 0.5;
            display: flex;
            justify-content: center;
            & .button {
                width: 90px;
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
