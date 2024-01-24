<template>
    <div class="switch-font-color">
        <ElColorPicker
            v-model="fontColor"
            size="small"
            ref="colorPicker"
            :predefine="predefineColor"
        ></ElColorPicker>
        <MenuItem
            :icon="icon"
            :title="title"
            :action="action"
            :style="`color: ${fontColor}`"
        ></MenuItem>
    </div>
</template>

<script setup lang="ts">
import MenuItem from '../MenuItem.vue'
import { Editor } from '@tiptap/vue-3'
import { ref, watch } from 'vue'
import { predefineColor } from '@/config/predefine'

const props = defineProps({
    editor: {
        type: Editor,
        required: true
    }
})

// 颜色选择器实例
const colorPicker = ref()

const fontColor = ref('#000')

const icon = ['fas', 'a']
const title = '字体颜色'
const action = () => colorPicker.value.show()

// 颜色变化时，设置字体的颜色
watch(fontColor, (newFontColor) => {
    props.editor.chain().focus().setColor(newFontColor).run()
    console.log(1)
})
</script>

<style lang="scss" scoped>
.switch-font-color {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    &:deep(.el-color-picker) {
        position: absolute;
        opacity: 0;
    }

    &:hover:deep(.menu-item) {
        background-color: #f3f3f6;
    }
}
</style>
