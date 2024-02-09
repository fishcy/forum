<template>
    <CommonNav v-if="!pathOfHiddingNav.includes(route.path)" />
    <CommonMain />
    <UserLoginOrRegister></UserLoginOrRegister>
</template>

<script setup lang="ts">
import CommonNav from '@/components/common/CommonNav.vue'
import CommonMain from '@/components/common/CommonMain.vue'
import UserLoginOrRegister from './components/user/UserLoginOrRegister.vue'
import { useRoute } from 'vue-router'

const pathOfHiddingNav = ['/create']

const route = useRoute()
</script>

<style lang="scss" scoped></style>
