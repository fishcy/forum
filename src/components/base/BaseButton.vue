<template>
    <ElButton type="primary" plain class="base-button">
        <slot></slot>
    </ElButton>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.base-button {
    background-image: var(--theme-bg-color-1);
    border: none;
    color: #fff !important;
    border-radius: 8px;
    height: 40px;
}

.base-button:hover {
    opacity: 0.7;
}
</style>
