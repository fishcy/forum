<template>
    <div class="user-info">
        <img class="avatar" :src="avatar" :alt="username" id="avatar" />
        <div id="menu" v-show="isShowMenu" class="user-menu">
            <div class="user-card">
                <img class="menu-avatar" :src="avatar" :alt="username" />
                <span class="user-name">{{ username }}</span>
            </div>
            <ul class="action-count-list">
                <li v-for="item in actionCountList" :key="item" class="item">
                    <a href="#">
                        <div class="item-count">{{ 0 }}</div>
                        <div class="item-name">{{ item }}</div>
                    </a>
                </li>
            </ul>
            <ul class="dropdown-list" v-if="user.isLogin">
                <li class="dropdown-item" v-for="item in dropdownList" :key="item.text">
                    <RouterLink :to="`/user/${userId}`" class="open-menu-page">
                        <font-awesome-icon :icon="item.icon" class="menu-icon" />
                        <span class="menu-name">{{ item.text }}</span>
                    </RouterLink>
                </li>
            </ul>
            <div class="group">
                <a class="logout" @click="logout">退出登录</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useElementShow } from '@/hooks'
import { useUserInfoStore } from '@/stores'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
const props = defineProps({
    avatar: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

// 退出登录
const user = useUserInfoStore()
const router = useRouter()
const logout = () => {
    user.logout()
    router.push('/')
}

const isShowMenu = useElementShow('menu', 'avatar')

const actionCountList = ['关注', '赞过', '收藏']

const dropdownList = computed(() => {
    return [
        {
            to: `/user/${props.userId}`,
            text: '我的主页',
            icon: ['far', 'user']
        }
    ]
})
</script>

<style lang="scss" scoped>
.user-info {
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 px2rem(20);
    .avatar {
        --r: 36px;
        height: var(--r);
        width: var(--r);
        border-radius: 50%;
        cursor: pointer;
    }
    .user-menu {
        width: 226px;
        position: absolute;
        box-shadow: var(--box-shadow);
        top: 55px;
        border-radius: 5px;
        padding: 20px;
        background-color: var(--layer-1);

        .user-card {
            display: flex;
            margin-bottom: 14px;
            .menu-avatar {
                --r: 48px;
                height: var(--r);
                width: var(--r);
                border-radius: 50%;
                margin-right: 10px;
            }

            .user-name {
                font-size: 16px;
                height: 50px;
                line-height: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .action-count-list {
            display: flex;
            justify-content: space-around;
            font-size: 14px;
            padding-bottom: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid var(--gray-1);

            .item {
                a {
                    text-align: center;
                    .item-name {
                        color: var(--font-3);
                    }
                }
            }
        }

        .dropdown-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding-bottom: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid var(--gray-1);
            .dropdown-item {
                &:hover {
                    border-radius: 4px;
                    background-color: var(--layer-2);
                }

                width: 104px;
                height: 40px;
                .open-menu-page {
                    display: flex;
                    align-items: center;
                    height: 40px;

                    .menu-icon {
                        width: 20px;
                        height: 20px;
                        margin: 0 8px;
                        color: var(--font-3);
                    }

                    .menu-name {
                        font-size: 14px;
                    }
                }
            }
        }

        .group {
            display: flex;
            justify-content: end;
            font-size: 12px;

            .logout {
                color: var(--font-3);
                cursor: pointer;
                &:hover {
                    color: var(--font-hover-1);
                }
            }
        }
    }
}
</style>
