<template>
    <div
        ref="inputEditor"
        class="input-editor"
        contenteditable
        :placeholder="placeholder"
        :class="{ empty: isShowPlaceholder }"
        @blur="handleBlur"
        @paste="handlePaste"
        @input="handleInput"
    ></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
    placeholder: string
}>()

const isShowPlaceholder = ref(true)
const inputEditor = ref<HTMLElement>()

// 记录光标的位置
const startContainer = ref<Node | undefined>(),
    startOffset = ref<number>()

const focus = () => {
    inputEditor.value?.focus()
}

const getContent = () => {
    return inputEditor.value?.innerHTML
}

const setContent = (content: string) => {
    inputEditor.value!.innerHTML = content
}

defineExpose({
    startContainer,
    startOffset,
    focus,
    getContent,
    setContent,
    isShowPlaceholder
})

const cacheRange = () => {
    const selection = window.getSelection()
    const range = selection?.getRangeAt(0)
    startOffset.value = range?.startOffset || 0
    startContainer.value = range?.startContainer
}

const handleBlur = () => {
    cacheRange()
}

const handleInput = (event: Event) => {
    const target = event.target as Element
    if (target.innerHTML) {
        isShowPlaceholder.value = false
    } else {
        isShowPlaceholder.value = true
    }
}

// 处理粘贴事件，并去除粘贴的默认样式
const handlePaste = (event: ClipboardEvent) => {
    event.stopPropagation()
    event.preventDefault()

    // @ts-ignore
    const paste = (event.clipboardData || window.ClipboardData).getData('text')
    const selection = window.getSelection()
    if (!selection?.rangeCount) return
    selection.deleteFromDocument()
    selection.getRangeAt(0).insertNode(document.createTextNode(paste))
    selection.collapseToEnd()
}
</script>

<style lang="scss" scoped>
.input-editor {
    position: relative;
    background-color: #fff;
    line-height: 28px;
    font-size: 16px;
    min-height: 28px;
}

.empty::before {
    content: attr(placeholder);
    position: absolute;
    user-select: none;
    color: #8a919f;
    pointer-events: none;
}
</style>

<style lang="scss">
.input-editor {
    .emoji {
        height: 21px;
        margin: 0 2px;
        vertical-align: sub;
    }
}
</style>
