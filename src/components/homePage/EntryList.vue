<template>
    <div class="entry-list-wrapper">
        <EntryListItem
            v-for="i in 20"
            :key="i"
            title="titlefdfdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
            details="dlkfja;fjkasd;fjaslfk;jasdfkldsjflkdsjfskldfjrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
            imgSrc="http://localhost:1005/img/avatar.png"
            author="author"
            viewNum="12k"
            likeNum="76"
        ></EntryListItem>
    </div>
</template>

<script setup lang="ts">
import EntryListItem from '@/components/homePage/EntryListItem.vue'
</script>

<style lang="scss" scoped>
.entry-list-wrapper {
    width: 720px;
}
</style>
