<template>
    <div class="insert-image">
        <MenuItem :icon="icon" :title="title" :action="action"></MenuItem>
        <input type="file" ref="selectImage" accept="image/*" style="display: none" />
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Editor } from '@tiptap/vue-3'
import MenuItem from '../MenuItem.vue'
import { uploadImage } from '@/api'

const props = defineProps({
    editor: {
        type: Editor,
        required: true
    }
})

const selectImage = ref<HTMLInputElement>()

const icon = ['far', 'image']
const title = '插入图片'
const action = () => {
    selectImage.value?.click()
}

const handleChange = (e: Event) => {
    const el: HTMLInputElement = e.target as HTMLInputElement
    if (el.files?.length) {
        const img = el.files[0]
        const formData = new FormData()
        formData.append('img', img, img.name)
        uploadImage(formData).then((res) => {
            props.editor
                .chain()
                .focus()
                .setImage({ src: res.data.data.url, alt: res.data.data.originalname })
                .run()
        })
    }
}

onMounted(() => {
    selectImage.value?.addEventListener('change', handleChange)
})

onBeforeUnmount(() => {
    selectImage.value?.removeEventListener('change', handleChange)
})
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.tiptap-img {
    max-width: 100%;
}
</style>
