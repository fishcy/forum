<template>
    <div class="entry-list-item">
        <div class="content-main">
            <div class="title-row">{{ title }}</div>
            <div class="main-row">
                <div class="main-box">
                    <div class="abstract">{{ details }}</div>
                    <img v-if="imgSrc" :src="imgSrc" loading="lazy" :alt="title" />
                </div>
                <ul class="action-list">
                    <li class="item author">
                        <a href="#">{{ author }}</a>
                    </li>
                    <li class="item view">
                        <font-awesome-icon :icon="['far', 'eye']" />
                        <span>{{ viewNum }}</span>
                    </li>
                    <li class="item like">
                        <font-awesome-icon :icon="['far', 'thumbs-up']" />
                        <span>{{ likeNum }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
    title: String,
    details: String,
    imgSrc: String,
    author: String,
    viewNum: String,
    likeNum: String
})

const { title, details, imgSrc } = toRefs(props)
</script>

<style lang="scss" scoped>
.entry-list-item {
    width: 100%;
    background-color: var(--layer-1);
    margin-bottom: 10px;
    border-radius: 4px;
    display: flex;
    padding: 12px 20px;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        background-color: var(--layer-2);
    }

    .content-main {
        flex: 1;
        .title-row {
            font-size: 16px;
            margin: 14px 0 12px;
            font-weight: 600;
            word-break: break-all;
        }
        .main-row {
            .main-box {
                display: flex;
                justify-content: space-between;
                .abstract {
                    font-size: 13px;
                    color: var(--font-3);
                    margin-bottom: 6px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: break-all;
                    line-height: 22px;
                    height: 44px;
                    flex: 1;
                }
                img {
                    width: 110px;
                    height: 74px;
                    margin-left: 16px;
                    border-radius: 4px;
                    border: 1px solid var(--gray-1);
                }
            }

            .action-list {
                display: flex;
                .item {
                    color: var(--font-3);
                    font-size: 14px;
                    margin-right: 22px;

                    span {
                        margin-left: 4px;
                    }
                }
            }
        }
    }
}
</style>
