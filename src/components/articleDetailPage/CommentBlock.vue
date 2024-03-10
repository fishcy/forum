<template>
    <div class="comment-form-wrapper">
        <div class="title">{{ `评论` }}</div>
        <CommentForm
            :itemId="article_id"
            :type="1"
            publish-type="comment"
            @publish-success="publishSuccess"
        ></CommentForm>
    </div>
    <div class="comment-list-wrapper">
        <div class="comment-list-header"></div>
        <div class="comment-list">
            <CommentCard
                v-for="comment in comments"
                :key="comment.comment_id"
                v-bind="comment"
            ></CommentCard>
        </div>
        <div class="fetch-more-comment"></div>
    </div>
    <div class="image-viewer-box">
        <BaseImageViewer></BaseImageViewer>
    </div>
</template>

<script setup lang="ts">
import { getComments } from '@/api'
import type { Comment } from '@/types/global'
import { handleSuccessResponse } from '@/utils/handlePromise'
import { ref } from 'vue'

const props = defineProps({
    article_id: {
        type: String,
        required: true
    }
})

const comments = ref<Comment[]>([])

getComments({
    params: {
        type: 1,
        itemId: props.article_id
    }
})
    .then((res) => {
        handleSuccessResponse(res.data, () => {
            comments.value = res.data.data
        })
    })
    .catch((err) => {})

const publishSuccess = (data: Comment) => {
    comments.value.unshift(data)
}
</script>

<style lang="scss" scoped>
.comment-form-wrapper {
    max-width: 820px;
    box-sizing: border-box;
    background-color: #fff;
    margin: 4px auto 0;
    border-radius: 4px;
    padding: 24px;

    .title {
        color: #252933;
        font-size: 18px;
        font-weight: 600;
        line-height: 30px;
        margin-bottom: 32px;
    }
}

.comment-list-wrapper {
    max-width: 820px;
    margin: 0 auto;
}
</style>
