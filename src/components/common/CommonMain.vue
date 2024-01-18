<template>
    <main class="main">
        <RouterView></RouterView>
    </main>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: calc(100% - 60px);
    background-color: var(--background);
    overflow: auto;
    // position: relative;
}
</style>
