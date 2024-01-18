<template>
    <div class="home-container">
        <EntryList></EntryList>
    </div>
</template>

<script setup lang="ts">
import EntryList from '@/components/homePage/EntryList.vue'
</script>

<style lang="scss" scoped>
.home-container {
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
</style>
