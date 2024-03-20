<template>
    <div class="article-wrapper">
        <div class="article">
            <h1 class="article-title">{{ articleTitle }}</h1>
            <div class="author-info-block">
                <div class="author-info-box">
                    <div class="author-name">
                        <RouterLink :to="`/user/${articleInfo?.author_id}`" class="username">
                            <span class="name ellipsis"
                                >{{ articleInfo?.author_name }}
                            </span></RouterLink
                        >
                    </div>
                    <div class="meta-box">
                        <time datetime="">{{ formatDate(articleInfo?.create_time!) }}</time>
                    </div>
                </div>
            </div>
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
import CodeView from '@/components/articleDetailPage/CodeView.vue'
import type { ArticleInfo } from '@/types/global.d.ts'
import { handleSuccessResponse } from '@/utils/handlePromise'
import { formatDate } from '@/utils/date'

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
                return VueNodeViewRenderer(CodeView)
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

const articleInfo = ref<ArticleInfo>()
const articleTitle = ref('')
const articleContent = ref('')
getArticleDetail({
    params: {
        article_id: props.article_id
    }
})
    .then((res) => {
        handleSuccessResponse(res.data, () => {
            articleInfo.value = res.data.data.article_info
            articleTitle.value = articleInfo.value.title
            articleContent.value = articleInfo.value.html_content
            editor.value?.commands.setContent(articleContent.value)
        })
    })
    .catch((err) => {})
</script>

<style lang="scss" scoped>
.article-wrapper {
    border-radius: 4px;
    max-width: 820px;
    margin: 20px auto 0;
    padding: 24px;
    box-sizing: border-box;
    background-color: white;
    word-wrap: break-word;
    .article {
        user-select: auto;

        .article-title {
            margin-bottom: 15px;
        }

        .author-info-block {
            .author-info-box {
                display: flex;
                .author-name {
                    display: flex;
                    margin-right: 16px;
                    .username {
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 22px;
                        display: flex;

                        .name {
                            display: inline-block;
                            max-width: 150px;
                            color: #515167;
                            &:hover {
                                color: var(--theme-color);
                            }
                        }
                    }
                }

                .meta-box {
                    color: #8a919f;
                    font-size: 14px;
                    time {
                    }
                }
            }
        }
    }
}
</style>
