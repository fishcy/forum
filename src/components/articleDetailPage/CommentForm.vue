<template>
    <div class="comment-form">
        <div
            ref="richInput"
            class="rich-input"
            :class="{ empty: isShowPlaceholder }"
            contenteditable
            placeholder="来评论吧！"
            @blur="handleBlur"
            @paste="handlePaste"
            @input="handleInput"
            v-html="commentContent"
        ></div>
        <div class="image-preview-box">
            <div
                v-if="image"
                class="image-preview"
                :style="`background-image: url(${image});`"
            ></div>
        </div>
        <div class="action-box">
            <EmojiPicker class="item" @pick-emoji="pickEmoji"></EmojiPicker>
            <UploadImage class="item" @get-image="getImage"></UploadImage>
            <div style="flex: 1 1 0"></div>
            <ElButton @click="handleClick">发送</ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Response, UploadImageResponse } from '@/types/global.d.ts'
import { publishComment, publishReply } from '@/api'
import { handleSuccessResponse } from '@/utils/handlePromise'

const emit = defineEmits(['publishSuccess'])

type PublishType = 'comment' | 'reply'
type Type = 1 | 2

const props = defineProps<{
    itemId: string
    type: Type
    publishType: PublishType
    replyToUserId?: string
}>()

const image = ref('')
const getImage = (res: Response<UploadImageResponse>) => {
    image.value = res.data.url
}

const isShowPlaceholder = ref(true)
const handleInput = (event: Event) => {
    const target = event.target as Element
    if (target.innerHTML) {
        isShowPlaceholder.value = false
    } else {
        isShowPlaceholder.value = true
    }
}

const richInput = ref<HTMLElement>()

// 选择emoji
const pickEmoji = (emoji: HTMLImageElement) => {
    isShowPlaceholder.value = false
    richInput.value?.appendChild(emoji)
}

const commentContent = ref('')

const handleBlur = (event: Event) => {
    const target = event.target as Element
    commentContent.value = target.innerHTML
}

// 处理粘贴事件，并去除粘贴的默认样式
const handlePaste = (event: ClipboardEvent) => {
    event.stopPropagation()
    event.preventDefault()
    // @ts-ignore
    let paste = (event.clipboardData || window.clipboardData).getData('text')
    const selection = window.getSelection()
    if (!selection?.rangeCount) return
    selection.deleteFromDocument()
    selection.getRangeAt(0).insertNode(document.createTextNode(paste))
    selection.collapseToEnd()
}

// 根据publishType的值确定使用哪个接口
const publish = async () => {
    let result
    if (props.publishType === 'comment') {
        result = await publishComment({
            type: props.type,
            itemId: props.itemId,
            commentContent: commentContent.value,
            commentImage: image.value
        })
    } else if (props.publishType === 'reply') {
        result = await publishReply({
            itemId: props.itemId,
            replyContent: commentContent.value,
            replyImage: image.value,
            replyToUserId: props.replyToUserId
        })
    }
    return result
}

const handleClick = () => {
    commentContent.value = richInput.value?.innerHTML!
    if (commentContent.value.trim()) {
        publish()
            .then((res) => {
                handleSuccessResponse(res?.data!, () => {
                    emit('publishSuccess', res?.data.data)
                    isShowPlaceholder.value = true
                    commentContent.value = ''
                    image.value = ''
                    ElMessage({
                        type: 'success',
                        message: '评论成功',
                        offset: 100
                    })
                })
            })
            .catch((err) => {})
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

    .empty::before {
        content: attr(placeholder);
        position: absolute;
        user-select: none;
        color: #8a919f;
        pointer-events: none;
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
