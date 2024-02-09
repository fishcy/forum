<template>
    <template v-if="editor">
        <MenuBar :editor="editor"></MenuBar>
        <div class="editor-wrapper">
            <ElInput class="editor-title" placeholder="请输入标题" v-model="inputTitle"></ElInput>
            <EditorContent :editor="editor" class="editor-content"></EditorContent>
        </div>
        <CreateFooter :title="inputTitle" :editor="editor"></CreateFooter>
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
import { TextStyle } from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { onBeforeUnmount, ref } from 'vue'
import CreateFooter from '@/components/createPage/CreateFooter.vue'

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
    onUpdate(props) {
        console.log(props.editor.getHTML())
    }
})

const inputTitle = ref('')

onBeforeUnmount(() => {
    editor.value?.destroy()
})
</script>

<style lang="scss" scoped>
.editor-wrapper {
    padding: 0 30px;
    padding-top: 60px;
    min-height: 100%;
    width: 930px;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: var(--layer-1);

    .editor-title {
        margin-top: 20px;
        &:deep(.el-input__wrapper) {
            box-shadow: none;
            padding: 0;
            border-bottom: 1px solid rgb(248, 248, 248);
            border-radius: 0;
            .el-input__inner {
                font-size: 24px;
                font-weight: 700;
                height: 40px;
            }
        }
    }
    .editor-content {
        box-sizing: border-box;
        height: 100%;

        &:deep(.tiptap:focus-visible) {
            outline: none !important;
        }

        &:deep(.tiptap) {
            overflow: auto;
            min-height: 100%;
            background-color: var(--layer-1);
            padding: 20px 0;
            font-size: 16px;
            box-sizing: border-box;

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
            p.is-editor-empty:first-child::before {
                content: attr(data-placeholder);
                float: left;
                color: #adb5bd;
                pointer-events: none;
                height: 0;
            }

            a {
                text-decoration: underline;
                cursor: pointer;
                color: var(--theme-color);
            }
        }
    }
}
</style>
