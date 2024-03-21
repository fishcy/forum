<template>
    <div class="chat-user-card">
        <div class="user-avatar">
            <img :src="avatar" loading="lazy" />
        </div>
        <div class="content-wrapper">
            <div class="username">
                <span class="name ellipsis">{{ username }}</span>
            </div>
            <div class="content-box">
                <div class="content ellipsis">
                    <span class="ellipsis" v-html="content"></span>
                </div>
                <div class="action-list">
                    <div class="time">{{ formatDate(createTime) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/date'
import { ref } from 'vue'

const props = defineProps<{
    avatar: string
    username: string
    content: string
    createTime: number
}>()

const lastChatTime = ref(props.createTime)
</script>

<style lang="scss" scoped>
.chat-user-card {
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: rgb(248, 248, 248);
    }

    .user-avatar {
        display: flex;
        align-items: center;
        img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
        }
    }

    .content-wrapper {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        .username {
            display: flex;
            .name {
                max-width: 150px;
                font-size: 16px;
                line-height: 16px;
            }
        }
        .content-box {
            display: flex;
            margin-top: 10px;
            font-size: 12px;
            line-height: 12px;
            width: 150px;
            .content {
                display: flex;
                flex: 1 1 auto;
                span {
                    color: rgba(195, 195, 198);
                }
            }

            .action-list {
                flex: none;
                margin-left: 4px;
                .time {
                    color: rgb(153, 153, 153);
                }
            }
        }
    }
}
</style>

<style lang="scss">
.content {
    span {
        .emoji {
            height: 12px;
        }
    }
}
</style>
