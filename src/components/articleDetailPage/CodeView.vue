<template>
    <NodeViewWrapper class="code-view">
        <div class="code-view-nav">
            <div class="language">{{ props.node.attrs.language }}</div>
        </div>
        <pre><code><NodeViewContent></NodeViewContent></code></pre>
    </NodeViewWrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(nodeViewProps)

</script>

<style lang="scss" scoped></style>
