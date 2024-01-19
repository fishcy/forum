<template>
    <template v-if="editor">
        <MenuBar :editor="editor"></MenuBar>
        <EditorContent :editor="editor" class="editor-content"></EditorContent>
    </template>
</template>

<script setup lang="ts">
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { common, createLowlight } from 'lowlight'
import { useEditor, EditorContent, VueNodeViewRenderer } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import MenuBar from './MenuBar.vue'
import CodeBlock from './CodeBlock.vue'
import { Color } from '@tiptap/extension-color'

const lowlight = createLowlight(common)

const editor = useEditor({
    content: '<p>请输入</p>',
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
        Color
    ]
})
</script>

<style lang="scss" scoped>
.editor-content {
    padding-top: 54px;
    box-sizing: border-box;
    width: 930px;
    height: 100%;
    margin: 0 auto;

    &:deep(.tiptap:focus-visible) {
        outline: none !important;
    }

    &:deep(.tiptap) {
        overflow: auto;
        min-height: 100%;
        background-color: var(--layer-1);
        padding: 20px 30px;
        font-size: 16px;

        ul[data-type='taskList'] {
            list-style: none;
            padding: 0;
            li {
                display: flex;
                align-items: center;
                & > label {
                    flex: 0 0 auto;
                    margin-right: 10px;
                    user-select: none;
                }

                & > div {
                    flex: 1 1 auto;
                }
            }
        }
        ul {
            list-style: disc;
        }
        ul,
        ol {
            padding-left: 30px;
        }
        blockquote {
            border-left: 2px solid rgba(#0d0d0d, 0.1);
            padding-left: 10px;
        }
        p {
            margin-block-start: 10px;
            margin-block-end: 10px;
        }
    }
}
</style>