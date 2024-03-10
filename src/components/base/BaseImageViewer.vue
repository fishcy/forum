<template>
    <ElDialog
        v-model="imageViewerVisible"
        :show-close="false"
        :z-index="99999"
        align-center
        append-to-body
        destroy-on-close
        class="image-viewer"
    >
        <template #default>
            <img
                class="image"
                :src="imageViewerSrc"
                loading="lazy"
                @click="imageViewerVisible = false"
            />
        </template>
    </ElDialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCommunicationStore } from '@/stores'

const { imageViewerVisible, imageViewerSrc } = storeToRefs(useCommunicationStore())
</script>

<style lang="scss" scoped>
.image {
    max-width: 100%;
    max-height: 100%;
    cursor: zoom-out;
}
</style>

<style lang="scss">
.image-viewer {
    border-radius: unset;
    width: auto;
    box-shadow: unset;
    background: unset;
    .el-dialog__header {
        padding: 0;
        margin: 0;
    }

    .el-dialog__body {
        padding: 0;
        height: auto;
    }
}
</style>
