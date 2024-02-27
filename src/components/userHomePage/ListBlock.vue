<template>
    <div class="list-head">
        <RouterLink
            v-for="item in headList"
            :to="item.to"
            :key="item.text"
            class="nav-item"
            active-class="active"
        >
            <span class="item-title">{{ item.text }} </span>
        </RouterLink>
    </div>
    <div class="list-body">
        <RouterView></RouterView>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    user_id: {
        type: String,
        required: true
    }
})

const headList = ref([
    {
        text: '动态',
        to: `/user/${props.user_id}/dynamic`
    },
    {
        text: '文章',
        to: `/user/${props.user_id}/posts`
    },
    {
        text: '收藏',
        to: `/user/${props.user_id}/collections`
    },
    {
        text: '关注',
        to: `/user/${props.user_id}/tags`
    }
])
</script>

<style lang="scss" scoped>
.list-head {
    display: flex;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 4px;
    .nav-item {
        position: relative;
        display: flex;
        margin-right: 4px;
        padding: 16px;

        .item-title {
            font-size: 16px;
            font-weight: 400;
            color: #909090;

            &:hover {
                color: var(--theme-color);
            }
        }
    }

    .active {
        .item-title {
            color: var(--theme-color);
        }
    }

    .active::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 3px;
        border-radius: 50px;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        z-index: 10;
        background-color: var(--theme-color);
    }
}

.list-body {
    margin-top: 3px;
    border-radius: 4px;
}
</style>
