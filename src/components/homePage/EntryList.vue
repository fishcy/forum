<template>
    <div class="entry-list-wrapper">
        <RouterLink
            :to="`/post/${item.article_id}`"
            v-for="item in articleList"
            :key="item.article_id"
            target="_blank"
            class="item"
        >
            <EntryListItem v-bind="item">
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

import { useUserInfoStore } from '@/stores'

const { getUserId } = useUserInfoStore()

const articleList = ref<ArticleEntry[]>([])
getRecommendArticle({
    params: {
        userId: getUserId()
    }
}).then((res) => {
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
