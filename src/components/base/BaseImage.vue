<template>
    <div class="image-wrapper">
        <img :src="imgSrc" loading="lazy" @click="handleClick" />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCommunicationStore } from '@/stores'

const { imageViewerVisible, imageViewerSrc } = storeToRefs(useCommunicationStore())

const props = defineProps({
    imgSrc: {
        type: String,
        required: true
    }
})

const handleClick = () => {
    imageViewerVisible.value = true
    imageViewerSrc.value = props.imgSrc
}
</script>

<style lang="scss" scoped>
.image-wrapper {
    width: 120px;
    height: 120px;
    border-radius: 4px;
    border: 1px solid rgba(228, 230, 235, 0.5);
    cursor: zoom-in;
    display: inline-block;

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
}
</style>
