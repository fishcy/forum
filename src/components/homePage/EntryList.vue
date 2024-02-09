<template>
    <div class="entry-list-wrapper">
        <RouterLink
            :to="`/post/${item.article_id}`"
            v-for="item in articleList"
            :key="item.article_id"
        >
            <EntryListItem
                :title="item.title"
                :details="item.brief_content"
                :author="item.author_id"
            ></EntryListItem>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import EntryListItem from '@/components/homePage/EntryListItem.vue'
import { ref } from 'vue'

import { getRecommendArticle } from '@/api'

// article_id: item._id.toString(),
//       title: item.title,
//       brief_content: item.content.substring(0, 30),
//       author_id: item.authorId.toString(),
//       create_time: item.createTime,
type article = {
    article_id: string
    title: string
    brief_content: string
    author_id: string
    create_time: number
}

const articleList = ref<article[]>([])
getRecommendArticle().then((res) => {
    let response = res.data as { data: { [key: string]: any }; msg: string }
    console.log(response.data.articleList)
    articleList.value.push(...response.data.articleList)
})
</script>

<style lang="scss" scoped>
.entry-list-wrapper {
    width: 720px;
}
</style>
