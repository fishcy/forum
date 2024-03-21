<template>
    <div class="emoji-picker">
        <ElPopover
            trigger="click"
            width="429px"
            :placement="placement"
            popper-class="emoji-popper"
            :popper-options="popperOptions"
            :teleported="false"
        >
            <template #reference>
                <font-awesome-icon
                    :icon="['far', 'face-smile']"
                    class="emoji-button"
                    @click="handleClick"
                />
            </template>
            <template #default>
                <div class="picker-item">
                    <div class="recent-using" v-show="recentUsingEmoji.length">
                        <p class="title">最近使用</p>
                        <div class="list" @click="pickEmoji">
                            <div
                                class="item"
                                v-for="item in recentUsingEmoji"
                                :key="item"
                                v-html="twemoji.parse(item, parseOption)"
                            ></div>
                        </div>
                    </div>
                    <div class="all-emoji">
                        <p class="title" v-show="recentUsingEmoji.length">全部</p>
                        <div class="list" @click="pickEmoji">
                            <div
                                class="item"
                                v-for="item in faceEmoji"
                                :key="item"
                                v-html="twemoji.parse(item, parseOption)"
                            ></div>
                        </div>
                    </div>
                </div>
            </template>
        </ElPopover>
    </div>
</template>

<script setup lang="ts">
import twemoji from 'twemoji'
import { ref } from 'vue'
import { faceEmoji } from '@/config/emoji'
import type { Placement } from 'element-plus'

withDefaults(
    defineProps<{
        placement?: Placement
    }>(),
    {
        placement: 'bottom-start'
    }
)

const popperOptions = {
    modifiers: [
        {
            name: 'computeStyles',
            options: {
                gpuAcceleration: false
            }
        },
        {
            name: 'flip',
            options: {
                fallbackPlacements: ['bottom']
            }
        }
    ]
}

const parseOption: TwemojiOptions = {
    folder: '/',
    ext: '.svg',
    base: import.meta.env.VITE_EMOJI_URL,
    attributes: function () {
        return {
            loading: 'lazy'
        }
    }
}

const maxCache = 9
const recentUsingEmoji = ref<string[]>([])
const updateCache = (emoji: string) => {
    const index = recentUsingEmoji.value.findIndex((val) => {
        return val === emoji
    })
    if (index !== -1) {
        recentUsingEmoji.value.splice(index, 1)
    }
    recentUsingEmoji.value.unshift(emoji)
    if (recentUsingEmoji.value.length > maxCache) recentUsingEmoji.value.length = maxCache
}

const emit = defineEmits(['pick-emoji', 'show-emoji-panel'])

const pickEmoji = (event: MouseEvent) => {
    const target = event.target as HTMLImageElement
    if (target.classList.contains('emoji')) {
        // 复制一份，不复制的话，就是同一个img元素
        emit('pick-emoji', target.cloneNode(true))
        updateCache(target.alt)
    }
}

const handleClick = () => {
    emit('show-emoji-panel')
}
</script>

<style lang="scss" scoped>
.emoji-picker {
    .emoji-button {
        font-size: 20px;
        cursor: pointer;
        transition: color 0.3s;
        &:hover,
        &:focus {
            color: var(--theme-color);
        }
    }
}
</style>

<style lang="scss">
.emoji-popper {
    .picker-item {
        height: 342px;
        overflow: auto;
        .recent-using {
        }

        .all-emoji {
        }

        .recent-using,
        .all-emoji {
            margin-top: 5px;
            .title {
                margin: 10px 0;
            }
            .list {
                display: flex;
                flex-wrap: wrap;
                .item {
                    width: 28px;
                    height: 28px;
                    margin: 0 8px 8px;
                    .emoji {
                        width: 28px;
                        height: 28px;
                        cursor: pointer;
                        transition: transform 0.3s;
                        &:hover {
                            transform: scale(1.2);
                        }
                    }
                }
            }
        }
    }
}
</style>
