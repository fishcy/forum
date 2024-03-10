<template>
    <ElUpload ref="upload" :limit="1" :http-request="handleUpload" :show-file-list="false">
        <template #trigger>
            <div class="upload-image">
                <font-awesome-icon :icon="['far', 'image']" class="image-button" />
            </div>
        </template>
    </ElUpload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadInstance, UploadRequestOptions } from 'element-plus'
import { uploadImage } from '@/api'

const emit = defineEmits(['get-image'])

const upload = ref<UploadInstance>()

const handleUpload = async (option: UploadRequestOptions) => {
    const formData = new FormData()
    formData.append('img', option.file, option.file.name)
    uploadImage(formData)
        .then((res) => {
            emit('get-image', res.data)
        })
        .catch((err) => {})
}
</script>

<style lang="scss" scoped>
.upload-image {
    .image-button {
        font-size: 20px;
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
            color: var(--theme-color);
        }
    }
}
</style>
