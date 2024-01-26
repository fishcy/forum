<template>
    <div class="insert-link">
        <MenuItem :icon="icon" :title="title" :action="action" :is-active="isActive"></MenuItem>
        <ElDialog v-model="dialogVisible" width="300px" append-to-body :show-close="false">
            <ElInput v-model="inputLink" placeholder="请输入链接"></ElInput>
            <template #footer>
                <ElButton @click="setLink">确认</ElButton>
                <ElButton @click="hideDialog">取消</ElButton>
            </template>
        </ElDialog>
    </div>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import MenuItem from '../MenuItem.vue'
import { ref } from 'vue'

const props = defineProps({
    editor: {
        type: Editor,
        required: true
    }
})

const icon = ['fas', 'link']
const title = '插入链接'
const isActive = () => {
    props.editor.isActive('link')
}

// 展示的link
const inputLink = ref('')
const action = () => {
    inputLink.value = props.editor.getAttributes('link').href
    dialogVisible.value = true
}

const dialogVisible = ref(false)
const hideDialog = () => {
    dialogVisible.value = false
}

const setLink = () => {
    hideDialog()
    if (inputLink.value === '') {
        props.editor.chain().focus().extendMarkRange('link').unsetLink().run()
        return
    }

    const cloneLink = inputLink.value
    inputLink.value = ''
    props.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: cloneLink, target: '_blank' })
        .run()
}
</script>

<style lang="scss" scoped>
.insert-link {
    &:deep(.el-dialog__headerbtn:hover .el-dialog__close) {
        color: var(--theme-color);
    }
}
</style>

<style lang="scss">
.el-dialog__body {
    padding: 0 20px 10px;
}
</style>
