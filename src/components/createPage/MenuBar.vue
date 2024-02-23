<template>
    <div class="menu-bar">
        <!-- <div class="item-wrapper"> -->
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
        <!-- </div> -->
    </div>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import type { Component } from 'vue'
import SwitchFontColor from './menuItem/SwitchFontColor.vue'
import SwitchBackgroundColor from './menuItem/SwitchBackgroundColor.vue'
import InsertImage from './menuItem/InsertImage.vue'
import InsertLink from './menuItem/InsertLink.vue'

const props = defineProps({
    editor: {
        type: Editor,
        required: true
    }
})

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
        action: () => props.editor.chain().focus().toggleBold().run(),
        isActive: () => props.editor.isActive('bold')
    },
    {
        icon: ['fas', 'italic'],
        title: '斜体',
        action: () => props.editor.chain().focus().toggleItalic().run(),
        isActive: () => props.editor.isActive('italic')
    },
    {
        icon: ['fas', 'strikethrough'],
        title: 'Strike',
        action: () => props.editor.chain().focus().toggleStrike().run(),
        isActive: () => props.editor.isActive('strike')
    },
    {
        component: SwitchBackgroundColor,
        type: 'component'
    },
    {
        type: 'divider'
    },
    {
        icon: ['fas', 'list-ul'],
        title: '无序列表',
        action: () => props.editor.chain().focus().toggleBulletList().run(),
        isActive: () => props.editor.isActive('bulletList')
    },
    {
        icon: ['fas', 'list-ol'],
        title: '有序列表',
        action: () => props.editor.chain().focus().toggleOrderedList().run(),
        isActive: () => props.editor.isActive('orderedList')
    },
    {
        icon: ['fas', 'list-check'],
        title: '任务列表',
        action: () => props.editor.chain().focus().toggleTaskList().run(),
        isActive: () => props.editor.isActive('taskList')
    },
    {
        icon: ['fas', 'code'],
        title: '代码块',
        action: () => props.editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => props.editor.isActive('codeBlock')
    },
    {
        type: 'divider'
    },
    {
        icon: ['fas', 'quote-left'],
        title: '引用',
        action: () => props.editor.chain().focus().toggleBlockquote().run(),
        isActive: () => props.editor.isActive('blockquote')
    },
    {
        component: InsertImage,
        type: 'component'
    },
    {
        type: 'divider'
    },
    {
        icon: ['fas', 'rotate-left'],
        title: '撤销',
        action: () => props.editor.chain().focus().undo().run()
    },
    {
        icon: ['fas', 'rotate-right'],
        title: '重做',
        action: () => props.editor.chain().focus().redo().run()
    },
    {
        component: InsertLink,
        type: 'component'
    }
]
</script>

<style lang="scss" scoped>
.menu-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    background-color: white;
    border-bottom: 1px solid #f3f3f6;
    position: fixed;
    z-index: 1;
    width: 100%;
    box-sizing: border-box;
    // .item-wrapper {
    .divider {
        background-color: #e3e3e6;
        height: 20px;
        width: 1px;
        margin-right: 4px;
    }
    // }
}
</style>
