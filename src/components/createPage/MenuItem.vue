<template>
    <button
        class="menu-item"
        :class="{ 'is-active': isActive ? isActive() : null }"
        @click="(action as (()=>void))"
        :title="title"
    >
        <font-awesome-icon :icon="icon" />
    </button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
    icon: {
        type: Array<string>,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    action: {
        type: Function,
        required: true
    },
    isActive: {
        type: Function,
        default: null
    },
    type: {
        type: String
    }
})

const { icon, title, action, isActive } = toRefs(props)
</script>

<style lang="scss" scoped>
.menu-item {
    background-color: transparent;
    border: none;
    border-radius: 4px;
    color: #000;
    width: 32px;
    height: 32px;
    margin-right: 4px;

    &.is-active,
    &:hover {
        background-color: #f3f3f6;
    }
}
</style>
