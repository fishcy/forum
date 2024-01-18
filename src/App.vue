<template>
    <CommonNav />
    <CommonMain />
    <!-- <UserRegister />
    <UserLogin /> -->
    <UserLoginOrRegister></UserLoginOrRegister>
</template>

<script setup lang="ts">
import CommonNav from '@/components/common/CommonNav.vue'
import CommonMain from '@/components/common/CommonMain.vue'
import UserLoginOrRegister from './components/user/UserLoginOrRegister.vue';

// 需要手动引入一次，执行watch监听
import '@/hooks/themeColor'
</script>

<style lang="scss" scoped></style>
