<template>
    <ElButton type="primary" plain class="base-button">
        <slot></slot>
    </ElButton>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.base-button {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
    color: #fff;
    border-radius: 8px;
    height: 40px;
}

.base-button:hover {
    opacity: 0.7;
}
</style>
