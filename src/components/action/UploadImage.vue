<template>
    <ElUpload
        ref="upload"
        :limit="1"
        :http-request="handleUpload"
        :show-file-list="false"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :auto-upload="false"
    >
        <template #trigger>
            <div class="upload-image">
                <font-awesome-icon :icon="['far', 'image']" class="image-button" />
            </div>
        </template>
    </ElUpload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
    genFileId,
    type UploadInstance,
    type UploadProps,
    type UploadRawFile,
    type UploadRequestOptions
} from 'element-plus'
import { uploadImage } from '@/api'

const emit = defineEmits(['get-image'])

const upload = ref<UploadInstance>()

const isUpload = new Set()
const handleChange: UploadProps['onChange'] = (uploadFile) => {
    const uid = uploadFile.uid
    if (!isUpload.has(uid)) {
        upload.value?.submit()
    }
}

const handleUpload = async (option: UploadRequestOptions) => {
    const formData = new FormData()
    formData.append('img', option.file, option.file.name)
    uploadImage(formData)
        .then((res) => {
            isUpload.add(option.file.uid)
            emit('get-image', res.data)
        })
        .catch((err) => {})
}

const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
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
