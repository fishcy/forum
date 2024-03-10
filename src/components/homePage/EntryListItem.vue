<template>
    <div class="entry-list-item">
        <div class="content-main">
            <div class="title-row">{{ title }}</div>
            <div class="main-row">
                <div class="main-box">
                    <div class="abstract">{{ brief_content }}</div>
                </div>
                <ul class="action-list">
                    <li class="item" v-if="$slots['action-list-first']">
                        <slot name="action-list-first"></slot>
                        <div class="footer-divider"></div>
                    </li>
                    <li class="item view">
                        <font-awesome-icon :icon="['far', 'eye']" />
                        <span>{{ view_num }}</span>
                    </li>
                    <li class="item like">
                        <ThumbsUp
                            :likeNum="like_num"
                            :isLike="is_like"
                            :itemId="article_id"
                            :type="1"
                        ></ThumbsUp>
                    </li>
                    <slot name="action-list-end"></slot>
                </ul>
            </div>
        </div>
        <img v-if="cover_image" :src="cover_image" loading="lazy" :alt="title" />
    </div>
</template>

<script setup lang="ts">
import type { ArticleEntry } from '@/types/global.d.ts'

defineProps<ArticleEntry>()
</script>

<style lang="scss" scoped>
.entry-list-item {
    width: 100%;
    background-color: var(--layer-1);
    border-radius: 4px;
    display: flex;
    padding: 12px 20px;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        background-color: var(--layer-2);
    }

    .content-main {
        flex: 1;
        .title-row {
            font-size: 16px;
            font-weight: 600;
            word-break: break-all;
        }
        .main-row {
            .main-box {
                display: flex;
                justify-content: space-between;
                .abstract {
                    font-size: 13px;
                    color: var(--font-3);
                    margin-bottom: 6px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: break-all;
                    line-height: 22px;
                    flex: 1;
                }
            }

            .action-list {
                display: flex;
                .item {
                    display: flex;
                    align-items: center;
                    color: var(--font-3);
                    font-size: 14px;
                    margin-right: 22px;

                    span {
                        margin-left: 4px;
                    }
                }

                .like:hover {
                    color: var(--theme-color);
                }
            }
        }
    }

    img {
        width: 110px;
        height: 74px;
        margin-left: 16px;
        border-radius: 4px;
        border: 1px solid var(--gray-1);
    }
}

.footer-divider {
    width: 1px;
    height: 12px;
    background-color: #e4e6eb;
    margin: 0 -13px 0 12px;
}
</style>
