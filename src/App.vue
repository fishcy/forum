<template>
    <CommonNav />
    <CommonMain />
    <UserLoginOrRegister></UserLoginOrRegister>
</template>

<script setup lang="ts">
import CommonNav from '@/components/common/CommonNav.vue'
import CommonMain from '@/components/common/CommonMain.vue'
import UserLoginOrRegister from './components/user/UserLoginOrRegister.vue';
</script>

<style lang="scss" scoped></style>
