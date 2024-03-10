<template>
    <div class="posts-list">
        <RouterLink
            :to="`/post/${item.article_id}`"
            v-for="item in ownArticles"
            :key="item.article_id"
            class="item"
        >
            <EntryListItem v-bind="item">
                <template #action-list-first>
                    <span class="time">
                        {{ new Date(item.create_time).toLocaleString() }}
                    </span>
                </template>
                <template #action-list-end>
                    <li class="action-item comment">
                        <font-awesome-icon :icon="['far', 'comment-dots']" />
                        <span>评论</span>
                    </li>
                    <li class="action-item more">
                        <font-awesome-icon :icon="['fas', 'ellipsis']" />
                    </li>
                </template>
            </EntryListItem>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getOwnArticles } from '@/api'
import type { ArticleEntry } from '@/types/global.d.ts'
import { handleSuccessResponse } from '@/utils/handlePromise'
const props = defineProps({
    user_id: {
        type: String,
        required: true
    }
})

const ownArticles = ref<ArticleEntry[]>()

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
}
</style>
