<template>
    <ElInput class="base-input"></ElInput>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.base-input {
    height: 40px;
    &:deep(.is-focus){
        box-shadow: 0 0 0 1px var(--theme-color) inset;
    }
}
</style>
