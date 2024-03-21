<template>
    <div class="chat-main">
        <div class="chat-content">
            <div class="chat-header">{{ receiverUserName }}</div>
            <div class="divide"></div>
            <div class="chat-message-box" ref="chatMessageBox" v-infinite-scroll-up="load">
                <MessageBox
                    v-for="item in messageList"
                    :key="item.time"
                    :is-sender="item.isSender"
                    :avatar="item.avatar"
                    :message="item.content"
                    :time="item.time"
                    :user-id="item.userId"
                    :is-show-time="item.isShowTime"
                ></MessageBox>
            </div>
            <div class="divide"></div>
            <div class="chat-input">
                <div class="action-list">
                    <EmojiPicker
                        class="item"
                        @pick-emoji="pickEmoji"
                        @show-emoji-panel="setFocus"
                        placement="top-start"
                    ></EmojiPicker>
                    <UploadImage class="item" @get-image="getImage" @click="setFocus"></UploadImage>
                </div>
                <div class="input-content-wrapper">
                    <InputEditor
                        placeholder="请输入聊天内容"
                        class="input-content"
                        ref="input"
                    ></InputEditor>
                </div>
                <div class="button-box">
                    <ElButton class="submit-button" @click="submit">发送</ElButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type InputEditor from '../InputEditor.vue'
import type { Response, UploadImageResponse } from '@/types/global.d.ts'
import { sendMessage, receiveMessage } from '@/websocket/chat'
import { useUserInfoStore } from '@/stores'
import { getChatRecords } from '@/api'
import { handleSuccessResponse } from '@/utils/handlePromise'

const { getUserId, getAvatar } = useUserInfoStore()

const props = defineProps<{
    receiverUserName: string
    receiverUserId: string
    receiverAvatar: string
}>()

const input = ref<InstanceType<typeof InputEditor>>()

const insertNode = (el: HTMLElement) => {
    input.value!.isShowPlaceholder = false
    input.value!.focus()
    const selection = window.getSelection()
    if (!selection?.rangeCount) return
    const range = selection.getRangeAt(0)
    range.setStart(input.value!.startContainer!, input.value!.startOffset!)
    range.insertNode(el)
    selection.collapseToEnd()
}

const pickEmoji = (emoji: HTMLImageElement) => {
    insertNode(emoji)
}

const setFocus = () => {
    input.value!.focus()
}

const getImage = (res: Response<UploadImageResponse>) => {
    const img = document.createElement('img')
    img.loading = 'lazy'
    img.src = res.data.url
    img.height = 60
    insertNode(img)
}

const messageList = ref<
    {
        time: number
        avatar: string
        userId: string
        isSender: boolean
        content: string
        isShowTime: boolean
    }[]
>([])

const submit = () => {
    const content = input.value?.getContent()
    if (!content?.trim()) return
    input.value?.setContent('')
    sendMessage.value = {
        type: 'private',
        from: getUserId(),
        to: props.receiverUserId,
        content
    }
    const time = Date.now()
    messageList.value.push({
        time,
        avatar: getAvatar(),
        userId: getUserId(),
        isSender: true,
        content,
        isShowTime: isShowMessageTime(time)
    })
    scrollToBottom()
}

watch(receiveMessage, (newMessage) => {
    messageList.value.push({
        time: Number(newMessage?.creat_time!),
        avatar: props.receiverAvatar,
        userId: props.receiverUserId,
        isSender: false,
        content: newMessage?.content!,
        isShowTime: isShowMessageTime(newMessage?.creat_time!)
    })
    scrollToBottom()
})

let first = true,
    page = 1,
    totalPage = 1
const MESSAGE_TIME_GAP = 1000 * 60 * 3
const pageSize = 15
const chatMessageBox = ref<HTMLDivElement | null>(null)
const scrollToBottom = () => {
    nextTick(() => {
        const height = chatMessageBox.value?.scrollHeight!
        chatMessageBox.value?.scrollTo(0, height)
    })
}

const isShowMessageTime = (timestamp: number, isNow: boolean = true) => {
    if (!messageList.value.length) return true
    const lastMessageTime = isNow
        ? messageList.value[messageList.value.length - 1].time
        : messageList.value[0].time

    if (isNow) {
        if (timestamp - lastMessageTime > MESSAGE_TIME_GAP) return true
        return false
    } else {
        if (lastMessageTime - timestamp > MESSAGE_TIME_GAP) {
            messageList.value[0].isShowTime = true
        } else {
            messageList.value[0].isShowTime = false
        }
        return true
    }
}

watch(
    () => props.receiverUserId,
    () => {
        first = true
        page = 1
        totalPage = 1
    }
)

const load = () => {
    if (!props.receiverUserId) return
    if (totalPage < page) return
    getChatRecords({
        params: {
            senderUserId: getUserId(),
            receiverUserId: props.receiverUserId,
            page,
            pageSize
        }
    }).then((res) => {
        handleSuccessResponse(res.data, () => {
            ++page
            totalPage = res.data.data.totalPage
            res.data.data.messages.forEach((item) => {
                const isSender = item.sender_user_id === getUserId(),
                    avatar = isSender ? getAvatar() : props.receiverAvatar,
                    userId = isSender ? getUserId() : props.receiverUserId
                messageList.value.unshift({
                    time: item.create_time,
                    avatar,
                    userId,
                    isSender,
                    content: item.content,
                    isShowTime: isShowMessageTime(item.create_time, false)
                })
                if (first) {
                    scrollToBottom()
                    first = false
                } else {
                    const lastScrollHeight = chatMessageBox.value?.scrollHeight
                    nextTick(() => {
                        chatMessageBox.value!.scrollTop! =
                            chatMessageBox.value?.scrollHeight! - lastScrollHeight!
                    })
                }
            })
        })
    })
}
</script>

<style lang="scss" scoped>
.chat-main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    .chat-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border-radius: 4px;

        .chat-header {
            width: 100%;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: none;
        }

        .chat-message-box {
            width: 100%;
            height: 600px;
            overflow: auto;
        }

        .chat-input {
            flex: 1;
            padding: 10px 20px;
            display: flex;
            flex-direction: column;

            .action-list {
                display: flex;
                align-items: center;
                flex: none;
                .item {
                    margin-right: 10px;
                }
            }

            .input-content-wrapper {
                max-height: 137px;
                overflow: auto;
                margin-top: 8px;
                flex: 1;
                .input-content {
                    width: 100%;
                    line-height: 21px;
                    min-height: 21px;
                    font-size: 14px;
                }
                &:deep(.empty::before) {
                    color: rgb(204, 204, 204);
                    font-size: 14px;
                }
            }

            .button-box {
                flex: none;
                display: flex;
                justify-content: flex-end;
                margin-top: 8px;
                .submit-button {
                    height: 32px;
                }
            }
        }

        .divide {
            background-color: rgb(240, 240, 240);
            flex: none;
            height: 1px;
            margin: 0 20px;
        }
    }
}
</style>
