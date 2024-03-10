<template>
    <div class="publish-comment" @click="handleClick" :class="{ active: isShow }">
        <font-awesome-icon :icon="['far', 'comment-dots']" />
        <span>评论</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isShow = ref(false)

const handleClick = () => {
    isShow.value = !isShow.value
}
</script>

<style lang="scss" scoped>
.publish-comment {
    display: flex;
    align-items: center;
    color: var(--font-3);
    font-size: 14px;
    cursor: pointer;
    padding: 0 10px;

    span {
        margin-left: 4px;
    }

    &:hover {
        color: var(--theme-color);
    }
}

.active {
    color: var(--theme-color);
}
</style>
