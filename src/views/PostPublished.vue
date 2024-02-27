<template>
    <div class="published-view">
        <div class="common-empty">
            <div class="img-empty-wrapper">
                <img :src="imageEmpty" class="img-empty" alt="publish-success" />
            </div>
            <div class="content-slot-wrap">
                <RouterLink :to="`/post/${route.query.article_id}`" class="post-link">{{
                    `《${route.query.title}》`
                }}</RouterLink>
                <div class="thanks">发布成功！</div>
            </div>
            <div class="back-home">
                <RouterLink to="/">
                    <ElButton plain> 返回首页</ElButton>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 重定向
const router = useRouter()
const route = router.currentRoute
if (!route.value.query.title || !route.value.query.article_id) {
    router.push('/')
}

const imageEmpty = ref(`${import.meta.env.VITE_ASSETS_URL}/image-empty.webp`)
</script>

<style lang="scss" scoped>
.published-view {
    max-width: 760px;
    padding: 40px 20px;
    margin: 20px auto 0;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    .common-empty {
        display: flex;
        flex-direction: column;
        .img-empty-wrapper {
            .img-empty {
                width: 180px;
                height: 180px;
            }
        }
    }

    .content-slot-wrap {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .post-link {
            &:hover {
                color: var(--theme-color);
            }
        }
        .thanks {
            text-align: center;
            font-size: 14px;
            line-height: 22px;
            margin-top: 8px;
            color: #4e5969;
        }
    }

    .back-home {
        margin-top: 30px;
        display: flex;
        justify-content: center;
    }
}
</style>
