<template>
    <div>
        <article></article>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    article_id: {
        type: String,
        required: true
    }
})
console.log(props.article_id)
</script>

<style lang="scss" scoped></style>
