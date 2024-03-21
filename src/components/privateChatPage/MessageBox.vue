<template>
    <div class="message-box">
        <div class="time-line" v-if="isShowTime">{{ formatMessageDate(time) }}</div>
        <div
            class="message-wrapper"
            :class="{ 'sender-message-wrapper': isSender, 'receiver-message-wrapper': !isSender }"
        >
            <div
                class="message"
                :class="{ 'sender-message': isSender, 'receiver-message': !isSender }"
                v-html="message"
            ></div>
            <RouterLink :to="`/user/${userId}`" target="_blank" class="avatar-box">
                <img :src="avatar" loading="lazy" class="avatar" />
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatMessageDate } from '@/utils/date'

defineProps<{
    time: number
    avatar: string
    userId: string
    message: string
    isSender: boolean
    isShowTime: boolean
}>()
</script>

<style lang="scss" scoped>
.message-box {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    .time-line {
        margin: 0 0 16px;
        text-align: center;
    }

    .sender-message-wrapper {
        justify-content: flex-end;
    }

    .receiver-message-wrapper {
        flex-direction: row-reverse;
        justify-content: flex-end;
    }

    .message-wrapper {
        display: flex;
        .message {
            padding: 7.5px 16px;
            background-color: var(--theme-message-bg-color);
            border-radius: 5px;
            color: #fff;
            position: relative;
            max-width: 500px;
            word-break: break-all;
        }

        .sender-message {
            margin-right: 10px;
            &::before {
                content: '';
                width: 0;
                border: 6px solid transparent;
                position: absolute;
                border-left-color: var(--theme-message-bg-color);
                top: 20px;
                right: 0;
                transform: translateX(100%) translateY(-50%);
            }
        }

        .receiver-message {
            background-color: #f8f8f8;
            margin-left: 10px;
            color: #555;
            &::before {
                content: '';
                width: 0;
                border: 6px solid transparent;
                position: absolute;
                border-right-color: #f8f8f8;
                top: 20px;
                left: 0;
                transform: translateX(-100%) translateY(-50%);
            }
        }

        .avatar-box {
            display: flex;
            flex: none;
            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
            }
        }
    }
}
</style>

<style lang="scss">
.message {
    .emoji {
        width: 20px;
        margin: 0 2px;
        display: inline-block;
        vertical-align: sub;
    }
}
</style>
