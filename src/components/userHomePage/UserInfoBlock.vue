<template>
    <div class="user-info-block">
        <div class="avatar-box">
            <img class="avatar" :src="avatar" />
        </div>
        <div class="info-box">
            <div class="top">
                {{ username }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserInfoStore } from '@/stores'
import { ref, onBeforeMount } from 'vue'
import { getUserInfo } from '@/api'
import { handleSuccessResponse } from '@/utils/handlePromise'

const props = defineProps({
    user_id: {
        type: String,
        required: true
    }
})

const username = ref('')
const avatar = ref('')

onBeforeMount(() => {
    if (props.user_id === getUserId()) {
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
        .top {
            font-size: 17px;
        }
    }
}
</style>
