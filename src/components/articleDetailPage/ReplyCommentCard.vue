<template>
    <div class="reply-comment-card" v-if="!isDelete">
        <div class="reply-avatar">
            <RouterLink :to="userLink" target="_blank">
                <img
                    class="avatar"
                    :src="user_info.avatar"
                    :alt="user_info.user_name"
                    loading="lazy"
                />
            </RouterLink>
        </div>
        <div class="reply-wrapper">
            <div class="reply-header">
                <div class="reply-user-info">
                    <RouterLink :to="userLink" target="_blank" class="username">
                        <span class="name">{{ user_info.user_name }}</span>
                    </RouterLink>
                </div>
                <span style="padding: 0 10px">回复</span>
                <div class="reply-user-info">
                    <RouterLink :to="replyUserLink" target="_blank" class="username">
                        <span class="name">{{ reply_user.user_name }}</span>
                    </RouterLink>
                </div>
            </div>
            <div class="reply-content">
                <div class="content" v-html="reply_info.reply_comment"></div>
                <div class="reply-img-box" v-if="reply_info.reply_image">
                    <BaseImage :img-src="reply_info.reply_image"></BaseImage>
                </div>
            </div>
            <div class="reply-action">
                <div class="action-time">
                    {{ timeDistanceFromNow(reply_info.create_time) }}
                </div>
                <ThumbsUp
                    :like-num="reply_info.like_num"
                    :is-like="reply_info.is_like"
                    :item-id="reply_id"
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
            <div class="reply-editor">
                <CommentForm
                    v-show="isShowCommentForm"
                    :type="2"
                    :item-id="reply_id"
                    publish-type="reply"
                    :reply-to-user-id="user_info.user_id"
                    @publish-success="publishSuccess"
                ></CommentForm>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Reply } from '@/types/global.d.ts'
import { timeDistanceFromNow } from '@/utils/date'
import { useUserInfoStore } from '@/stores'
import { handleSuccessResponse } from '@/utils/handlePromise'
import { deleteReply } from '@/api'
const props = defineProps<Reply>()

const emit = defineEmits(['publishReplySuccess'])

const { getUserId } = useUserInfoStore()

const userLink = `/user/${props.user_info.user_id}`
const replyUserLink = `/user/${props.reply_user.user_id}`

const isShowCommentForm = ref(false)

const publishSuccess = (data: Reply) => {
    isShowCommentForm.value = false
    emit('publishReplySuccess', data)
}

const isDelete = ref(false)
const moreList: { [key: string]: () => any } = {
    删除: () => {
        deleteReply({
            reply_id: props.reply_id
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
.reply-comment-card {
    margin-top: 8px;
    padding: 8px;
    // background-color: #f2f3f5;
    // border-radius: 4px;
    display: flex;

    .reply-avatar {
        margin-right: 12px;
        .avatar {
            width: 28px;
            height: 28px;
            border-radius: 50%;
        }
    }

    .reply-wrapper {
        width: 100%;

        .reply-header {
            display: flex;
            .reply-user-info {
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
        }

        .reply-content {
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

            .reply-img-box {
                margin-top: 4px;
            }
        }

        .reply-action {
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

        .reply-editor {
            margin-top: 8px;
        }
    }
}
</style>

<style></style>
