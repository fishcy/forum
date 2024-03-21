<template>
    <div class="comment-form">
        <InputEditor placeholder="来评论吧！" ref="input" class="rich-input"></InputEditor>
        <div class="image-preview-box">
            <div
                v-if="image"
                class="image-preview"
                :style="`background-image: url(${image});`"
            ></div>
        </div>
        <div class="action-box">
            <EmojiPicker
                class="item"
                @pick-emoji="pickEmoji"
                @show-emoji-panel="setFocus"
            ></EmojiPicker>
            <UploadImage class="item" @get-image="getImage"></UploadImage>
            <div style="flex: 1 1 0"></div>
            <ElButton @click="submit">发送</ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Response, UploadImageResponse } from '@/types/global.d.ts'
import { publishComment, publishReply } from '@/api'
import { handleSuccessResponse } from '@/utils/handlePromise'
import type InputEditor from '../InputEditor.vue'

const emit = defineEmits(['publishSuccess'])

type PublishType = 'comment' | 'reply'
type Type = 1 | 2

const props = defineProps<{
    itemId: string
    type: Type
    publishType: PublishType
    replyToUserId?: string
}>()

const input = ref<InstanceType<typeof InputEditor>>()

// 选择emoji
const pickEmoji = (emoji: HTMLImageElement) => {
    input.value!.isShowPlaceholder = false
    input.value!.focus()
    const selection = window.getSelection()
    if (!selection?.rangeCount) return
    const range = selection.getRangeAt(0)
    range.setStart(input.value!.startContainer!, input.value!.startOffset!)
    range.insertNode(emoji)
    selection.collapseToEnd()
}

const setFocus = () => {
    input.value!.focus()
    const selection = window.getSelection()!
    if (!input.value!.startContainer) return
    const range = selection.getRangeAt(0)
    range.setStart(input.value!.startContainer!, input.value!.startOffset!)
}

// 根据publishType的值确定使用哪个接口
const publish = async () => {
    let result
    if (props.publishType === 'comment') {
        result = await publishComment({
            type: props.type,
            itemId: props.itemId,
            commentContent: input.value!.getContent(),
            commentImage: image.value
        })
    } else if (props.publishType === 'reply') {
        result = await publishReply({
            itemId: props.itemId,
            replyContent: input.value!.getContent(),
            replyImage: image.value,
            replyToUserId: props.replyToUserId
        })
    }
    return result
}

const image = ref('')
const getImage = (res: Response<UploadImageResponse>) => {
    image.value = res.data.url
}

const submit = () => {
    if (input.value!.getContent()!.trim()) {
        publish()
            .then((res) => {
                console.log(1)
                handleSuccessResponse(res?.data!, () => {
                    emit('publishSuccess', res?.data.data)
                    input.value!.isShowPlaceholder = true
                    input.value!.setContent('')
                    image.value = ''
                    ElMessage({
                        type: 'success',
                        message: '评论成功',
                        offset: 100
                    })
                })
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        ElMessage({
            type: 'warning',
            message: '评论不能为空',
            grouping: true,
            offset: 100
        })
    }
}
</script>

<style lang="scss" scoped>
.comment-form {
    width: 100%;
    padding: 16px 20px;
    background-color: rgb(248, 248, 248);
    box-sizing: border-box;
    border-radius: 8px;
    .rich-input {
        position: relative;
        border-radius: 8px;
        padding: 8px 12px;
        background-color: #fff;
        margin-bottom: 8px;
        border: 1px solid transparent;
        transition: border-color 0.2s;
        line-height: 28px;
        font-size: 16px;
        &:focus {
            border: 1px solid var(--theme-color);
        }
    }

    .image-preview-box {
        .image-preview {
            width: 64px;
            height: 64px;
            background-position: 50%;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 4px;
            border: 1px solid rgba(228, 230, 235, 0.5);
        }
    }

    .action-box {
        display: flex;
        align-items: center;

        .item {
            margin-right: 10px;
        }
    }
}
</style>

<style lang="scss">
.rich-input .emoji {
    height: 21px;
    margin: 0 2px;
    vertical-align: sub;
}
</style>
