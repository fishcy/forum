<template>
    <div class="entry-list-wrapper">
        <RouterLink
            :to="`/post/${item.article_id}`"
            v-for="item in articleList"
            :key="item.article_id"
            class="item"
        >
            <EntryListItem
                :title="item.title"
                :brief-content="item.brief_content"
                :like-num="item.like_num"
                :view-num="item.view_num"
                :cover-image="item.cover_image"
            >
                <template #action-list-first>
                    <span class="author">
                        {{ item.author_name }}
                    </span>
                </template>
            </EntryListItem>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { getRecommendArticle } from '@/api'
import type { ArticleEntry } from '@/types/global.d.ts'

const articleList = ref<ArticleEntry[]>([])
getRecommendArticle().then((res) => {
    let response = res.data as { data: { [key: string]: any }; msg: string }
    articleList.value.push(...response.data.articleList)
})
</script>

<style lang="scss" scoped>
.entry-list-wrapper {
    width: 720px;

    .item {
        display: block;
        margin-bottom: 5px;
    }
}
</style>
