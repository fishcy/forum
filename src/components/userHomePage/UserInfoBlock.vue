<template>
    <div class="user-info-block">
        <div class="avatar-box">
            <img class="avatar" :src="avatar" />
        </div>
        <div class="info-box">
            <div class="top">
                {{ username }}
            </div>
            <div style="flex: 1"></div>
            <div class="action-list">
                <ElButton class="chat-button" v-if="!isLoginUser" @click="handleClick"
                    >私信</ElButton
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserInfoStore } from '@/stores'
import { ref, onBeforeMount, computed } from 'vue'
import { chatWithUser, getUserInfo } from '@/api'
import { handleSuccessResponse } from '@/utils/handlePromise'
import { useRouter } from 'vue-router'

const props = defineProps({
    user_id: {
        type: String,
        required: true
    }
})

const username = ref('')
const avatar = ref('')

const isLoginUser = computed(() => {
    return props.user_id === getUserId()
})

onBeforeMount(() => {
    if (isLoginUser.value) {
        username.value = getUserName()
        avatar.value = getAvatar()
    } else {
        getUserInfo({
            params: {
                user_id: props.user_id
            }
        })
            .then((res) => {
                handleSuccessResponse(res.data, () => {
                    const userInfo = res.data.data
                    username.value = userInfo.username
                    avatar.value = userInfo.avatar
                })
            })
            .catch((err) => {})
    }
})

const { getAvatar, getUserName, getUserId } = useUserInfoStore()

const router = useRouter()
const handleClick = () => {
    chatWithUser({
        params: {
            senderUserId: getUserId(),
            receiverUserId: props.user_id
        }
    }).then((res) => {
        handleSuccessResponse(res.data, () => {
            router.push('/privateChat')
        })
    })
}
</script>

<style lang="scss" scoped>
.user-info-block {
    background-color: #fff;
    padding: 30px;
    border-radius: 4px;
    display: flex;

    .avatar-box {
        margin-right: 25px;
        .avatar {
            width: 90px;
            height: 90px;
            border-radius: 50%;
        }
    }

    .info-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        .top {
            font-size: 17px;
        }

        .action-list {
            display: flex;
            justify-content: flex-end;
            .chat-button {
                width: 100px;
                height: 36px;
            }
        }
    }
}
</style>
