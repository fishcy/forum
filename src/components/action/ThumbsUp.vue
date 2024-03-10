<template>
    <div class="thumbs-up-wrapper" @click="handleClick" :class="{ active: computedIsLike }">
        <font-awesome-icon :icon="['far', 'thumbs-up']" />
        <span v-if="showLikeNum">{{ showLikeNum }}</span>
        <span v-else>点赞</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { thumbsUp, cancelThumbsUp } from '@/api'
type choice = 1 | 2

const props = defineProps<{
    likeNum: number
    isLike: number
    itemId: string
    type: choice
}>()

const body = {
    itemId: props.itemId,
    type: props.type
}

const showLikeNum = ref(props.likeNum)
const computedIsLike = ref(props.isLike)

const handleClick = (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    // 已经点赞了
    if (computedIsLike.value) {
        computedIsLike.value = 0
        showLikeNum.value -= 1
        cancelThumbsUp(body).catch((err) => {})
    } else {
        computedIsLike.value = 1
        showLikeNum.value += 1
        thumbsUp(body).catch((err) => {})
    }
}
</script>

<style lang="scss" scoped>
.thumbs-up-wrapper {
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
