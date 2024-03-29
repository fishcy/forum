<template>
    <div class="switch-background-color">
        <div class="show-wrapper">
            <MenuItem
                :icon="bgColorIcon"
                :title="title"
                :action="switchHighlightAction"
                :is-active="isActive"
                class="toggle-highlight"
            ></MenuItem>
            <div class="show-background-color" :style="`background-color: ${bgColor}`"></div>
        </div>
        <span class="color-picker">
            <ElColorPicker
                v-model="bgColor"
                size="small"
                ref="bgColorPicker"
                :predefine="predefineColor"
            >
            </ElColorPicker>
            <MenuItem :icon="caretDownIcon" :title="title" :action="showColorPicker"></MenuItem>
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { predefineColor } from '@/config/predefine'
import { Editor } from '@tiptap/vue-3'
import MenuItem from '../MenuItem.vue'

const props = defineProps({
    editor: {
        type: Editor,
        required: true
    }
})

// 颜色选择器实例
const bgColorPicker = ref()

// 文本背景色
const bgColor = ref('#fff')

const bgColorIcon = ['fas', 'fill-drip']
const title = '背景颜色'

// 是否设置背景颜色
let isSetted = false
const switchHighlightAction = () => {
    if (isSetted) {
        isSetted = false
        props.editor.chain().focus().unsetHighlight().run()
    } else {
        isSetted = true
        props.editor.chain().focus().toggleHighlight({ color: bgColor.value }).run()
    }
}
const isActive = () => props.editor.isActive('highlight', { color: bgColor.value })

const caretDownIcon = ['fas', 'caret-down']
const showColorPicker = () => {
    bgColorPicker.value.show()
}
watch(bgColor, (newBgColor) => {
    props.editor.chain().focus().toggleHighlight({ color: newBgColor }).run()
})
</script>

<style lang="scss" scoped>
.switch-background-color {
    display: flex;
    margin-right: 4px;
    .show-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        .show-background-color {
            width: 10px;
            height: 2px;
            position: absolute;
            border-radius: 8px;
            top: 25px;
        }
    }
    .toggle-highlight {
        margin-right: 0;
    }

    .color-picker {
        position: relative;
        display: inline-flex;
        align-items: center;

        &:hover:deep(.menu-item) {
            background-color: #f3f3f6;
        }

        &:deep(.el-color-picker) {
            position: absolute;
            top: 5px;
            opacity: 0;
            width: 0;

            .el-color-picker__trigger {
                width: 0;
            }
        }
        &:deep(.menu-item) {
            width: 8px;
            margin-right: 0;
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
