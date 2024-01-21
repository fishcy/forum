<template>
    <div class="switch-font-color">
        <ElColorPicker
            v-model="fontColor"
            size="small"
            ref="colorPicker"
            :predefine="predefineFontColors"
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
import { toRef, defineProps, ref, watchEffect } from 'vue'

const props = defineProps({
    editor: {
        type: Editor,
        required: true
    }
})
const editor = toRef(props, 'editor')

const colorPicker = ref()

const fontColor = ref('#000')
const predefineFontColors = ref([
    'rgb(0, 0, 0)',
    'rgb(38, 38, 38)',
    'rgb(89, 89, 89)',
    'rgb(140, 140, 140)',
    'rgb(191, 191, 191)',
    'rgb(217, 217, 217)',
    'rgb(245, 245, 245)',
    'rgb(250, 250, 250)',
    'rgb(245, 34, 45)',
    'rgb(250, 84, 27)',
    'rgb(249, 139, 22)',
    'rgb(250, 219, 20)',
    'rgb(83, 195, 27)',
    'rgb(20, 194, 193)',
    'rgb(27, 144, 255)',
    'rgb(115, 46, 209)',
    'rgb(254, 232, 229)',
    'rgb(254, 237, 223)',
    'rgb(255, 239, 209)',
    'rgb(252, 251, 202)',
    'rgb(227, 247, 210)',
    'rgb(212, 245, 240)',
    'rgb(211, 238, 252)',
    'rgb(240, 224, 250)',
    'rgb(255, 163, 158)',
    'rgb(255, 188, 150)',
    'rgb(254, 213, 145)',
    'rgb(255, 251, 143)',
    'rgb(184, 234, 143)',
    'rgb(135, 231, 222)',
    'rgb(173, 197, 255)',
    'rgb(211, 173, 247)',
    'rgb(207, 20, 33)',
    'rgb(211, 56, 13)',
    'rgb(211, 107, 8)',
    'rgb(211, 176, 7)',
    'rgb(57, 158, 14)',
    'rgb(7, 151, 156)',
    'rgb(8, 109, 217)',
    'rgb(83, 29, 171)',
    'rgb(131, 1, 20)',
    'rgb(136, 19, 1)',
    'rgb(135, 57, 0)',
    'rgb(97, 71, 0)',
    'rgb(19, 83, 0)',
    'rgb(0, 71, 79)',
    'rgb(0, 58, 140)',
    'rgb(34, 7, 94)'
])

const icon = ['fas', 'a']
const title = '字体颜色'
const action = () => colorPicker.value.show()

// 颜色变化时，设置字体的颜色
watchEffect(() => {
    editor.value.chain().setColor(fontColor.value).run()
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
