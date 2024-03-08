<template>
    <CommonNav v-if="!pathOfHiddingNav.includes(route.path)" />
    <CommonMain />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const pathOfHiddingNav = ['/create']

const route = useRoute()
</script>

<style lang="scss" scoped></style>
