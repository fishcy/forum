<template>
    <div class="comment-card" v-if="!isDelete">
        <div class="comment-avatar">
            <RouterLink :to="userLink" target="_blank">
                <img
                    class="avatar"
                    :src="user_info.avatar"
                    :alt="user_info.user_name"
                    loading="lazy"
                />
            </RouterLink>
        </div>
        <div class="comment-wrapper">
            <div class="comment-header">
                <RouterLink :to="userLink" target="_blank" class="username">
                    <span class="name">{{ user_info.user_name }}</span>
                </RouterLink>
            </div>
            <div class="comment-content">
                <div class="content" v-html="comment_info.comment_content"></div>
                <div class="comment-img-box" v-if="comment_info.comment_image">
                    <BaseImage :img-src="comment_info.comment_image"></BaseImage>
                </div>
            </div>
            <div class="comment-action">
                <div class="action-time">
                    {{ timeDistanceFromNow(comment_info.create_time) }}
                </div>
                <ThumbsUp
                    :like-num="comment_info.like_num"
                    :is-like="comment_info.is_like"
                    :item-id="comment_id"
                    :type="2"
                ></ThumbsUp>
                <PublishComment @click="isShowCommentForm = !isShowCommentForm"></PublishComment>
                <div style="flex: 1"></div>
                <span class="ellipsis" v-if="user_info.user_id === getUserId()">
                    <EllipsisPopover trigger="click">
                        <ul class="more-list" @click="moreClick">
                            <li class="item delete">
                                <font-awesome-icon :icon="['fas', 'trash']" />
                                删除
                            </li>
                        </ul>
                    </EllipsisPopover>
                </span>
            </div>
            <div class="comment-reply-editor">
                <CommentForm
                    v-show="isShowCommentForm"
                    :type="2"
                    :itemId="comment_id"
                    publish-type="reply"
                    :reply-to-user-id="user_info.user_id"
                    @publish-success="publishSuccess"
                ></CommentForm>
            </div>
            <div class="comment-reply-wrapper">
                <ReplyCommentCard
                    v-for="reply in replyList"
                    :key="reply.reply_id"
                    v-bind="reply"
                    @publish-reply-success="publishSuccess"
                ></ReplyCommentCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Comment, Reply } from '@/types/global.d.ts'
import { timeDistanceFromNow } from '@/utils/date'
import { useUserInfoStore } from '@/stores'
import { deleteComment } from '@/api'
import { handleSuccessResponse } from '@/utils/handlePromise'
const props = defineProps<Comment>()

const { getUserId } = useUserInfoStore()

const userLink = `/user/${props.user_info.user_id}`

const isShowCommentForm = ref(false)

const replyList = ref(props.reply_infos)

const publishSuccess = (data: Reply) => {
    isShowCommentForm.value = false
    replyList.value.unshift(data)
}

const isDelete = ref(false)
const moreList: { [key: string]: () => any } = {
    删除: () => {
        deleteComment({
            comment_id: props.comment_id
        }).then((res) => {
            handleSuccessResponse(
                res.data,
                () => {
                    isDelete.value = true
                    ElMessage({
                        type: 'success',
                        message: res.data.msg,
                        offset: 100
                    })
                },
                '删除成功'
            )
        })
    }
}
const moreClick = (event: Event) => {
    let target = event.target as HTMLElement | null
    const currentTarget = event.currentTarget as HTMLUListElement
    while (target !== currentTarget) {
        const key = target?.innerText || ''
        if (moreList[key]) {
            console.log(1)
            moreList[key]()
            break
        }
    }
}
</script>

<style lang="scss" scoped>
.comment-card {
    margin-top: 4px;
    padding: 24px;
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    .comment-avatar {
        margin-right: 16px;
        .avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
        }
    }

    .comment-wrapper {
        width: 100%;
        .comment-header {
            .username {
                color: #515767;
                font-size: 16px;
                font-weight: 400;
                line-height: 24px;
                &:hover {
                    color: var(--theme-color);
                }
                .name {
                    max-width: 300px;
                    display: inline-block;
                    vertical-align: top;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }

        .comment-content {
            margin-top: 4px;
            .content {
                color: #252933;
                font-size: 16px;
                font-weight: 400;
                line-height: 28px;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 6;
            }

            .comment-img-box {
                margin-top: 4px;
            }
        }

        .comment-action {
            display: flex;
            margin-top: 8px;
            .action-time {
                color: #8a919f;
                font-size: 14px;
                margin-right: 10px;
                display: flex;
                align-items: center;
            }

            .ellipsis {
                color: var(--font-3);
                font-size: 14px;
                cursor: pointer;
                padding: 0 10px;
                &:hover {
                    color: var(--theme-color);
                }

                .more-list {
                    .item {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 7px 0;
                        border-radius: 4px;
                        svg {
                            margin-right: 16px;
                        }

                        &:hover {
                            background-color: #f2f3f5;
                        }
                    }

                    .delete {
                        color: #f64242;
                    }
                }
            }
        }

        .comment-reply-editor {
            margin-top: 8px;
        }
    }
}
</style>

<style lang="scss">
.content {
    .emoji {
        vertical-align: sub;
        width: auto;
        position: relative;
        top: 1px;
        height: 20px;
        margin: 0 2px;
    }
}
</style>
