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
.code-block {
    background-color: #f6f6f6;
    padding: 10px;
    border-radius: 10px;
    .code-block-nav {
        display: flex;
        justify-content: end;
        padding-bottom: 8px;
        .selector {
            width: 100px;
            // background-color: #282c34;
            &:deep(.is-focused) {
                box-shadow: none;
            }
        }
    }

    pre {
        background: #f6f6f6;
        color: #2f3337;
        margin: 0;

        code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 16px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,
                Courier New, monospace;
        }
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
