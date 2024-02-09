<template>
    <div class="create-footer">
        <div class="footer-content">
            <ElButton>存草稿</ElButton>
            <ElButton @click="submit">发布</ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import { uploadArticle } from '@/api'

const props = defineProps({
    editor: {
        type: Editor,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const submit = () => {
    uploadArticle({
        title: props.title,
        content: props.editor.getHTML()
    })
}
</script>

<style lang="scss" scoped>
.create-footer {
    height: 60px;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.04);
    .footer-content {
        width: 930px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}
</style>
