<template>
    <div class="posts-list" @click="getArticleIndex">
        <RouterLink
            :to="`/post/${item.article_id}`"
            v-for="(item, index) in ownArticles"
            :key="item.article_id"
            class="item"
            :data-article-index="index"
        >
            <EntryListItem v-bind="item">
                <template #action-list-first>
                    <span class="time">
                        {{ timeDistanceFromNow(item.create_time) }}
                    </span>
                </template>
                <template #action-list-end>
                    <li class="action-item comment">
                        <font-awesome-icon :icon="['far', 'comment-dots']" />
                        <span>评论</span>
                    </li>
                    <li
                        class="action-item more"
                        @click="(event: Event)=>{
                        event.preventDefault()
                    }"
                    >
                        <EllipsisPopover trigger="click">
                            <ul class="more-list" @click="moreClick">
                                <li class="item">
                                    <font-awesome-icon :icon="['fas', 'pen']" />
                                    编辑
                                </li>
                                <li class="item delete">
                                    <font-awesome-icon :icon="['fas', 'trash']" />
                                    删除
                                </li>
                            </ul>
                        </EllipsisPopover>
                    </li>
                </template>
            </EntryListItem>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { deleteArticle, getOwnArticles } from '@/api'
import type { ArticleEntry } from '@/types/global.d.ts'
import { handleSuccessResponse } from '@/utils/handlePromise'
import { timeDistanceFromNow } from '@/utils/date'
const props = defineProps({
    user_id: {
        type: String,
        required: true
    }
})

let articleIndex = 0
const ownArticles = ref<ArticleEntry[]>([])

getOwnArticles({
    params: {
        user_id: props.user_id
    }
})
    .then((res) => {
        handleSuccessResponse(res.data, () => {
            ownArticles.value = res.data.data.own_articles
        })
    })
    .catch((err) => {})

const moreList: { [key: string]: (articleIndex: number) => any } = {
    编辑: () => {},
    删除: (articleIndex: number) => {
        deleteArticle({
            article_id: ownArticles.value[articleIndex].article_id
        }).then((res) => {
            handleSuccessResponse(
                res.data,
                () => {
                    ownArticles.value.splice(articleIndex, 1)
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
            moreList[key](articleIndex)
            break
        }
    }
}

const getArticleIndex = (event: Event) => {
    let target = event.target as HTMLElement | null
    const currentTarget = event.currentTarget as HTMLDivElement
    while (target !== currentTarget) {
        const index = target?.dataset.articleIndex
        target = target?.parentElement!
        if (index) {
            articleIndex = Number(index)
            console.log(articleIndex)
            break
        }
    }
}
</script>

<style lang="scss" scoped>
.posts-list {
    .item {
        display: block;
        margin-bottom: 2px;
    }

    .action-item {
        display: flex;
        align-items: center;
        color: var(--font-3);
        font-size: 14px;
        margin-right: 22px;

        span {
            margin-left: 4px;
        }
    }

    .comment:hover,
    .more:hover {
        color: var(--theme-color);
    }

    .more {
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
</style>
