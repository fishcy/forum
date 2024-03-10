<template>
    <ArticleDetail :article_id="article_id"></ArticleDetail>
    <CommentBlock :article_id="article_id"></CommentBlock>
</template>

<script setup lang="ts">
defineProps({
    article_id: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped></style>
