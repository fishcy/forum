<template>
    <div class="menu-bar">
        <template v-for="(item, index) in items">
            <div class="divider" v-if="item.type === 'divider'" :key="`divider_#${index}`"></div>
            <MenuItem
                v-else-if="item.type !== 'component'"
                :key="item.title"
                :icon="item.icon!"
                :title="item.title!"
                :action="item.action!"
                :is-active="item.isActive"
            ></MenuItem>
            <component
                v-else
                :is="item.component"
                :key="`component_#${index}`"
                :editor="editor"
            ></component>
        </template>
    </div>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import MenuItem from './MenuItem.vue'
import type { Component } from 'vue'
import { toRef, defineProps } from 'vue'
import SwitchFontColor from './menuItem/SwitchFontColor.vue'

const props = defineProps({
    editor: {
        type: Editor,
        required: true
    }
})

const editor = toRef(props, 'editor')

const items: Array<{
    icon?: Array<string>
    title?: string
    action?: () => void
    isActive?: Function
    type?: string
    component?: Component
}> = [
    {
        component: SwitchFontColor,
        type: 'component'
    },
    {
        icon: ['fas', 'bold'],
        title: '粗体',
        action: () => editor.value.chain().focus().toggleBold().run(),
        isActive: () => editor.value.isActive('bold')
    },
    {
        icon: ['fas', 'italic'],
        title: '斜体',
        action: () => editor.value.chain().focus().toggleItalic().run(),
        isActive: () => editor.value.isActive('italic')
    },
    {
        icon: ['fas', 'strikethrough'],
        title: 'Strike',
        action: () => editor.value.chain().focus().toggleStrike().run(),
        isActive: () => editor.value.isActive('strike')
    },
    {
        icon: ['fas', 'fill-drip'],
        title: '背景颜色',
        action: () => editor.value.chain().focus().toggleHighlight().run(),
        isActive: () => editor.value.isActive('highlight')
    },
    {
        type: 'divider'
    },
    {
        icon: ['fas', 'list-ul'],
        title: '无序列表',
        action: () => editor.value.chain().focus().toggleBulletList().run(),
        isActive: () => editor.value.isActive('bulletList')
    },
    {
        icon: ['fas', 'list-ol'],
        title: '有序列表',
        action: () => editor.value.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.value.isActive('orderedList')
    },
    {
        icon: ['fas', 'list-check'],
        title: '任务列表',
        action: () => editor.value.chain().focus().toggleTaskList().run(),
        isActive: () => editor.value.isActive('taskList')
    },
    {
        icon: ['fas', 'code'],
        title: '代码块',
        action: () => editor.value.chain().focus().toggleCodeBlock().run(),
        isActive: () => editor.value.isActive('codeBlock')
    },
    {
        type: 'divider'
    },
    {
        icon: ['fas', 'quote-left'],
        title: '引用',
        action: () => editor.value.chain().focus().toggleBlockquote().run(),
        isActive: () => editor.value.isActive('blockquote')
    },
    {
        type: 'divider'
    },
    {
        icon: ['fas', 'rotate-left'],
        title: '撤销',
        action: () => editor.value.chain().focus().undo().run()
    },
    {
        icon: ['fas', 'rotate-right'],
        title: '重做',
        action: () => editor.value.chain().focus().redo().run()
    }
]
</script>

<style lang="scss" scoped>
.menu-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 54px;
    background-color: white;
    border-bottom: 1px solid #f3f3f6;
    position: fixed;
    z-index: 1;
    width: 100%;
    .divider {
        background-color: #e3e3e6;
        height: 20px;
        width: 1px;
        margin-right: 4px;
    }
}
</style>
