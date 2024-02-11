<template>
    <main class="main">
        <RouterView v-slot="{ Component }">
            <KeepAlive exclude="ArticleDetailPage,CreatePage">
                <component :is="Component"></component>
            </KeepAlive>
        </RouterView>
    </main>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: calc(100% - 60px);
    background-color: var(--background);
    background-image: var(--theme-bg-color-2);
    overflow: auto;
    // position: relative;
}
</style>
