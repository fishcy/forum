<template>
    <NodeViewWrapper class="code-block">
        <div class="code-block-nav">
            <ElSelect
                v-model="selectedLanguage"
                size="small"
                class="selector"
                popper-class="option-wrapper"
                filterable
            >
                <ElOption
                    v-for="language in languages"
                    :key="language"
                    :label="language"
                    :value="language"
                ></ElOption>
            </ElSelect>
        </div>
        <pre><code><NodeViewContent/></code></pre>
    </NodeViewWrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed } from 'vue'
const props = defineProps(nodeViewProps)

// 获取lowlight模块中的语言列表
const languages = props.extension.options.lowlight.listLanguages()

// 被选中的语言
const selectedLanguage = computed({
    get() {
        return props.node.attrs.language
    },
    set(language) {
        props.updateAttributes({ language })
    }
})
</script>

<style lang="scss" scoped>
.code-block-nav {
    &:deep(.el-select__wrapper.is-focused) {
        box-shadow: 0 0 0 1px var(--theme-color) inset;
    }
}
</style>

<style lang="scss">
.option-wrapper {
    padding: 10px;
    li {
        padding: 0 10px;
    }
    .el-select-dropdown__item {
        border-radius: 4px;
    }
    .is-selected {
        color: var(--theme-color);
    }
}
</style>
