<template>
    <ElUpload
        class="cover-image-uploader"
        :action="action"
        :headers="headers"
        name="img"
        :on-success="handleSuccess"
        :limit="1"
    >
        <img v-if="imageUrl" :src="imageUrl" alt="cover-image" class="cover-image" />
        <ElIcon v-else class="cover-image-uploader-icon"><Plus /></ElIcon>
    </ElUpload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { useUserInfoStore } from '@/stores'

const { getAuth } = useUserInfoStore()

const action = ref(`${import.meta.env.VITE_API_URL}/upload-image`)

// 自定义组件的v-model
defineProps({
    imageUrl: {
        type: String,
        required: true
    }
})
const emit = defineEmits(['update:imageUrl'])

const handleSuccess: UploadProps['onSuccess'] = (res) => {
    emit('update:imageUrl', res.data.url)
}

// 额外的请求头
const headers = ref({
    Authorization: getAuth()
})
</script>

<style lang="scss" scoped>
.cover-image-uploader {
    &:deep(.el-upload) {
        border: 1px dashed var(--theme-color);
        border-radius: 6px;
        cursor: pointer;
    }
    .cover-image {
        width: 192px;
        height: 128px;
        display: block;
    }

    .cover-image-uploader-icon {
        width: 192px;
        height: 128px;
        font-size: 28px;
        color: #8c939d;
        text-align: center;
    }
}
</style>
