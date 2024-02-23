<template>
    <div class="article-wrapper">
        <div class="article">
            <h1 class="article-title">{{ articleTitle }}</h1>
            <div class="author-info-block"></div>
            <template v-if="editor">
                <EditorContent :editor="editor" class="article-content"></EditorContent>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getArticleDetail } from '@/api'

import { useEditor, EditorContent, VueNodeViewRenderer } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

import { common, createLowlight } from 'lowlight'
import CodeBlock from '@/components/articleDetailPage/CodeView.vue'

const props = defineProps({
    article_id: {
        type: String,
        required: true
    }
})

const lowlight = createLowlight(common)

const editor = useEditor({
    content: '',
    extensions: [
        StarterKit.configure({
            codeBlock: false
        }),
        Highlight.configure({
            multicolor: true
        }),
        TaskList,
        TaskItem,
        CodeBlockLowlight.extend({
            addNodeView() {
                return VueNodeViewRenderer(CodeBlock)
            }
        }).configure({
            lowlight
        }),
        Color.configure({
            types: ['textStyle']
        }),
        TextStyle,
        Placeholder.configure({
            placeholder: '请输入正文'
        }),
        Image.configure({
            inline: true,
            HTMLAttributes: {
                class: 'tiptap-img'
            }
        }),
        Link
    ],
    editable: false
})

const articleTitle = ref('')
const articleContent = ref('')
getArticleDetail({
    params: {
        article_id: props.article_id
    }
}).then((res) => {
    const articleInfo = res.data.data.article_info
    articleTitle.value = articleInfo.title
    articleContent.value = articleInfo.content
    editor.value?.commands.setContent(articleContent.value)
})
</script>

<style lang="scss" scoped>
.article-wrapper {
    width: 820px;
    margin: 20px auto 0;
    padding: 32px;
    box-sizing: border-box;
    background-color: white;

    .article {
        user-select: auto;
    }
}
</style>
