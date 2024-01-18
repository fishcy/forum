<template>
    <ElInput class="search-input" placeholder="请输入" v-model="searchContent">
        <template #append>
            <ElButton :icon="Search"></ElButton>
        </template>
    </ElInput>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const searchContent = ref('')
</script>

<style lang="scss" scoped>
.search-input {
    width: 300px;
}

@media screen and (max-width: $phone-max-width) {
    .search-bar {
        width: 234px;
        input {
            width: 170px;
        }
        button {
            width: 60px;
        }
    }
}
</style>
