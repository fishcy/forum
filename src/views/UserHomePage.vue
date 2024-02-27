<template>
    <div class="user-view">
        <UserInfoBlock :user_id="user_id"></UserInfoBlock>
        <ListBlock :user_id="user_id"></ListBlock>
    </div>
</template>

<script setup lang="ts">
defineProps({
    user_id: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.user-view {
    max-width: 720px;
    margin: 20px auto 0;
}
</style>
