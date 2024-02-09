<template>
    <ElInput class="search-input" placeholder="请输入" v-model="searchContent">
        <template #append>
            <div class="vertical"></div>
            <ElButton :icon="Search">搜索</ElButton>
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
    height: 36px;

    .vertical {
        height: 20px;
        width: 1px;
        background: #ddd;
        margin-right: 12px;
    }

    &:deep(.el-input__wrapper) {
        background-color: #f8f8f8;
        box-shadow: none;
        border-color: #f8f8f8;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }

    &:deep(.el-input-group__append) {
        box-shadow: none;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    &:deep(.el-input-group__append .el-button) {
        display: flex;
        color: var(--theme-color);
    }

    &:deep(.el-input-group__append .el-button:hover) {
        color: var(--theme-color-hover);
    }
}
</style>
