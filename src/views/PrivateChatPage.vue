<template>
    <div class="private-chat">
        <div class="chat-side-bar">
            <div class="chat-user-list" @click="handleClick">
                <template v-if="userList.length">
                    <ChatUserCard
                        v-for="(item, index) in userList"
                        :key="item.user_id"
                        :avatar="item.avatar"
                        :content="item.content"
                        :create-time="item.create_time"
                        :username="item.user_name"
                        :data-chat-user-index="index"
                        class="item"
                    ></ChatUserCard
                ></template>
                <template v-else> </template>
            </div>
        </div>
        <ChatMain
            :receiver-user-name="receiverUserName"
            :receiver-user-id="receiverUserId"
            :receiver-avatar="receiverAvatar"
        ></ChatMain>
    </div>
</template>

<script setup lang="ts">
import { getChatList } from '@/api'
import { useUserInfoStore } from '@/stores'
import type { ChatEntry } from '@/types/global'
import { handleSuccessResponse } from '@/utils/handlePromise'
import { ref } from 'vue'

const { getUserId } = useUserInfoStore()

const userList = ref<ChatEntry[]>([])

getChatList({
    params: {
        senderUserId: getUserId()
    }
}).then((res) => {
    handleSuccessResponse(res.data, () => {
        userList.value = res.data.data
    })
})

const receiverUserName = ref('')
const receiverUserId = ref('')
const receiverAvatar = ref('')

const className = 'chat-user-card'
const handleClick = (event: Event) => {
    let target = event.target as HTMLElement | null
    if (target === event.currentTarget) return
    while (!target?.classList.contains(className)) {
        target = target?.parentElement!
    }
    const index = Number(target.dataset.chatUserIndex)
    receiverUserId.value = userList.value[index].user_id
    receiverUserName.value = userList.value[index].user_name
    receiverAvatar.value = userList.value[index].avatar
}
</script>

<style lang="scss" scoped>
.private-chat {
    display: flex;
    max-width: 932px;
    height: 100%;
    margin: 0 auto;

    ::-webkit-scrollbar-track-piece {
        background-color: transparent;
        padding: 10px 0;
    }

    .chat-side-bar {
        flex: none;
        padding: 10px 0;
        box-sizing: border-box;
        height: 100%;

        .chat-user-list {
            height: 100%;
            overflow-y: auto;
            padding-right: 5px;
            .item {
                margin-top: 10px;
                flex: none;

                &:first-child {
                    margin-top: 0;
                }
            }
        }
    }
}
</style>
